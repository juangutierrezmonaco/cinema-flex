import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useUser } from "./UserContext";

const PurchaseContext = React.createContext([]);

const usePurchase = () => {
    return useContext(PurchaseContext);
}

const PurchaseProvider = ({ children }) => {

    const [isActive, setIsActive] = useState(false);

    const defaultValue = {
        screening: {},
        movie: {},
        cantidad: 0,
        precio: 0,
        seatsNumbers: [],
        paymentId: '',
        userId: ''
    }

    const [order, setOrder] = useStateWithCallbackLazy(defaultValue);

    const setScreeningData = (screening, movie, cantidad, precio, callback) => {
        setOrder(prevState => ({ ...prevState, screening, movie, cantidad, precio }), callback)
    }

    const setSeats = (seatsNumbers, callback) => {
        setOrder(prevState => ({ ...prevState, seatsNumbers }), callback)
    }

    const setPaymentId = (paymentId, callback) => {
        setOrder(prevState => ({ ...prevState, paymentId: paymentId }), callback)
    }

    const setUserId = (userId) => {
        setOrder(prevState => ({ ...prevState, userId: userId }))
    }

    const setOrderId = (orderId) => {
        setOrder(prevState => ({ ...prevState, orderId: orderId }));
    }

    const updateScreening = (screeningId, seatsNumbers) => {
        const db = getFirestore();
        const screeningDoc = doc(db, 'screenings', screeningId);

        getDoc(screeningDoc)
            .then((res) => {
                // En este punto recupero los asientos que hay en ese instante para estar seguro que hay lugar
                const { asientosDisponibles, asientosOcupados } = res.data();
                const nuevosDisponibles = asientosDisponibles - seatsNumbers.length;

                const nuevosOcupados = asientosOcupados ? asientosOcupados.concat(seatsNumbers) : seatsNumbers;

                updateDoc(screeningDoc, {
                    asientosDisponibles: nuevosDisponibles,
                    asientosOcupados: nuevosOcupados
                });
            })
            .catch(error => console.log(error));

    }

    const { addOrder } = useUser()

    const uploadOrder = (newOrder) => {
        const db = getFirestore();
        const orderCollection = collection(db, 'orders');
        addDoc(orderCollection, newOrder)
            .then(({ id }) => {
                // Settteo el orderId y la agrego al usuario
                setOrderId(id);
                addOrder(id);
            })
            .catch(error => console.log(error));
    }

    const submitOrder = (currentOrder) => {
        const { movie, screening, seatsNumbers, precio, paymentId, userId } = currentOrder;
        const { sala, tipo, lenguaje, horario, id: funcionId } = screening;
        const { title, id: movieId, poster_path, backdrop_path } = movie;

        // Código que se genera para retirar las entradas
        /**
         * FORMATO: 
         *          - 2 primeros dígitos del ID de la película
         *          - 2 últimos dígitos del ID de la función
         *          - 2 últimos dígitos del ID del pago
         *          - 2 primeros dígitos del ID del usuario   
         */
        let codigoParaRetirar = String(movieId).slice(0, 2) + funcionId.slice(-2) + paymentId.slice(-2) + userId.slice(0, 2);
        codigoParaRetirar = codigoParaRetirar.toUpperCase();

        const orderToSend = {
            funcion: { sala, tipo, lenguaje, horario, seatsNumbers, funcionId },
            movie: { title, movieId, poster_path, backdrop_path },
            precio: precio,
            paymentId: paymentId,
            userId: userId,
            codigoParaRetirar,
            fechaDeEmision: new Date()
        }

        // mandar order a db
        uploadOrder(orderToSend);

        // Modifico la función de cine en la DB
        updateScreening(funcionId, seatsNumbers);

        // Una vez que ya hice todo lo necesario con la order la vuelvo a su estado original
        setOrder(defaultValue);
    }

    const context = {
        order,
        setScreeningData,
        setSeats,
        setPaymentId,
        setUserId,
        isActive,
        setIsActive,
        submitOrder
    };



    return (
        <PurchaseContext.Provider value={context}>
            {children}
        </PurchaseContext.Provider>
    );
}

export { usePurchase, PurchaseProvider };