import React, { useContext, useEffect, useState } from "react";
import { addDoc, collection, getDoc, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import Swal from "sweetalert2";

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
        tickets: [],
        id: ''
    };

    const localStorageUser = localStorage.getItem('activeUser') != 'undefined' ? localStorage.getItem('activeUser') : null;
    const [user, setUser] = useState( JSON.parse(localStorageUser) || defaultValue );

    const updateLocalStorage = (newState) => {
        localStorage.removeItem('activeUser');
        localStorage.setItem('activeUser', JSON.stringify(newState));
    }

    const isLogged = ((JSON.stringify(user) != JSON.stringify(defaultValue))) ? true : false;

    useEffect(() => {
        console.log(isLogged);
    }, [isLogged])
    

    const setUserId = (id) => {
        setUser(prevState => ({ ...prevState, id }));
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
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
                        title: 'Ese mail ya está registrado.'
                    })
                } else {
                    setUser(newUser);
                    updateLocalStorage(res)
                    const db = getFirestore();
                    const userCollection = collection(db, 'users');
                    addDoc(userCollection, newUser)
                        .then(({ id }) => setUserId(id));

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
                if (!res) errorMessage = 'No hay ningún usuario registrado con ese mail.';
                if (res && (res.password != password)) {
                    errorMessage = 'La contraseña es incorrecta.';
                } else {
                    setUser(res);
                    updateLocalStorage(res)
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
                        title: `Bienvenido de vuelta ${res.firstName}!`
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
        setUser(defaultValue);
        updateLocalStorage(defaultValue);
    }

    const context = {
        user,
        isLogged,
        createUser,
        login,
        logout
    };

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}

export { useUser, UserProvider };