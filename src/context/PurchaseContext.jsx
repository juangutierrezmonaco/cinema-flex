import React, { useContext, useState } from "react";
import { useStateWithCallbackLazy } from 'use-state-with-callback';

const PurchaseContext = React.createContext([]);

const usePurchase = () => {
    return useContext(PurchaseContext);
}

const PurchaseProvider = ({ children }) => {

    const [isActive, setIsActive] = useState(false);

    // estado de compra - respuesta hacer promesa credit card
    const [order, setOrder] = useStateWithCallbackLazy({
        screening: {},
        movie: {},
        cantidad: 0,
        precio: 0,
        seatsNumbers: [],
        paymentId: '',
        orderId: ''
    });

    const setScreeningData = (screening, movie, cantidad, precio, callback) => {
        setOrder(prevState => ({ ...prevState, screening, movie, cantidad, precio }), callback)
    }

    const setSeats = (seatsNumbers, callback) => {
        setOrder(prevState => ({ ...prevState, seatsNumbers }), callback)
    }

    const setPaymentId = (paymentId, callback) => {
        setOrder(prevState => ({ ...prevState, paymentId: paymentId }), callback)
    }

    const submitOrderToDB = ( currentOrder ) => {
        // Mandar a la db+
        // Modificar funciones en la db
        const { movie, screening, seatsNumbers } = currentOrder;
        const horario = screening.horario.toLocaleString()
        const { sala, tipo, lenguaje } = screening;
        
        // MAnejar data acá en vez de mostrarla
        console.log(currentOrder);

        // Completar en la DB
        /* console.log(
            `Película:   ${movie.title}
            Función:    ${sala} - ${tipo} (${lenguaje})
                        ${horario}
            Asientos: ${seats}`
        ); */

        // Luego agregarla al userContext --> [] de ordenes del usuario
        // Por último se resetea
        /* setOrder({
            screening: {},
            movie: {},
            cantidad: 0,
            precio: 0,
            seatsNumbers: [],
            paymentId: '',
            orderId: ''
        }); */
    }

    const context = {
        order,
        setScreeningData,
        setSeats,
        setPaymentId,
        isActive,
        setIsActive,
        submitOrderToDB
    };



    return (
        <PurchaseContext.Provider value={context}>
            {children}
        </PurchaseContext.Provider>
    );
}

export { usePurchase, PurchaseProvider };