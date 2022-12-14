import React, { useContext, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, query, updateDoc, where } from 'firebase/firestore';
import Swal from "sweetalert2";
import { useRef } from "react";

const UserContext = React.createContext([]);

const useUser = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const defaultValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        orders: [],
        id: ''
    };

    const localStorageUser = localStorage.getItem('activeUser') != 'undefined' ? localStorage.getItem('activeUser') : null;
    const [user, setUser] = useState(JSON.parse(localStorageUser) || defaultValue);

    const updateLocalStorage = (newState) => {
        localStorage.removeItem('activeUser');
        localStorage.setItem('activeUser', JSON.stringify(newState));
    }

    const isLogged = ((JSON.stringify(user) != JSON.stringify(defaultValue))) ? true : false;

    const setUserId = (id) => {
        setUser(prevState => ({ ...prevState, id }));
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const findUser = (email) => {
        return new Promise((resolve, reject) => {
            const db = getFirestore();
            const q = query(
                collection(db, 'users'),
                where('email', '==', email),
                limit(1)
            );

            getDocs(q)
                .then(res => {
                    if (res.size == 0) {
                        console.log('Ese usuario no existe');
                        resolve(undefined);
                    } else {
                        const resp = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        resolve(resp[0]);
                    }
                })
                .catch(error => reject(error));
        });
    }

    const createUser = (newUser, callback) => {
        const { email } = newUser;
        findUser(email)
            .then(res => {
                if (res) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Ese mail ya est?? registrado.'
                    })
                } else {
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];    // No uso el context de cart porque estoy afuera del provider
                    const userPlusCart = { ...newUser, cart };

                    setUser(userPlusCart);
                    const db = getFirestore();
                    const userCollection = collection(db, 'users');

                    addDoc(userCollection, userPlusCart)
                        .then(({ id }) => {
                            setUserId(id);
                            updateLocalStorage({ ...userPlusCart, id });
                        })
                        .catch(error => console.log(error));

                    callback();
                    Toast.fire({
                        icon: 'success',
                        title: `Gracias por registrarte ${newUser.firstName}!`
                    })
                }
            })
            .catch(err => console.log(err));
    }

    const login = (inUser, callback) => {
        const { email, password } = inUser;
        let errorMessage = '';

        findUser(email)
            .then(res => {
                if (!res) {
                    errorMessage = 'No hay ning??n usuario registrado con ese mail.';
                } else {
                    if (res.password != password) {
                        errorMessage = 'La contrase??a es incorrecta.';
                    } else {
                        setUser(res);
                        updateLocalStorage(res)
                    }
                }

                if (errorMessage) {
                    Toast.fire({
                        icon: 'error',
                        title: errorMessage
                    })
                } else {
                    callback();
                    Toast.fire({
                        icon: 'success',
                        title: `Bienvenid@ de vuelta ${res.firstName}!`
                    })
                }
            })
            .catch(err => console.log(err));
    }

    const logout = () => {
        Toast.fire({
            icon: 'success',
            title: `Hasta luego ${user.firstName}!`
        })

        // Cuando sale borro el cart del localStorage porque ya lo tiene guardado el usuario        
        localStorage.removeItem('cart');

        // Vuelvo el activeUser a los par??metros por default
        setUser(defaultValue);
        updateLocalStorage(defaultValue);
        window.location.reload();   // Esto es para que no pueda terminar una compra si se desloggea en medio del proceso
    }

    const addOrder = (newOrderId) => {
        const db = getFirestore();
        const userDoc = doc(db, 'users', user.id);
        getDoc(userDoc)
            .then((res) => {
                // En este punto recupero las ??rdenes que el usuario ten??a
                let { orders } = res.data();

                const newOrders = orders ? orders.concat(newOrderId) : newOrderId;

                updateDoc(userDoc, {
                    orders: newOrders
                });

                const newState = { ...user, orders: newOrders };
                setUser(newState);
                updateLocalStorage(newState);
            })
            .catch(error => console.log(error));
    }

    const modifyUserCart = (newCart) => {
        const db = getFirestore();
        const userDoc = doc(db, 'users', user.id);
        updateDoc(userDoc, {
            cart: newCart
        })

        const newState = { ...user, cart: newCart };
        updateLocalStorage(newState);
    }

    const userWidgetRef = useRef();

    const context = {
        user,
        isLogged,
        createUser,
        login,
        logout,
        addOrder,
        modifyUserCart,
        userWidgetRef
    };

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}

export { useUser, UserProvider };