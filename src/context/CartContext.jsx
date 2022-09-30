import React, { useContext, useRef, useState, useEffect } from "react";
import { useUser } from './UserContext'

const CartContext = React.createContext([]);

const useCart = () => {
    return useContext(CartContext);
}

const CartProvider = ({ defaultValue = [], children }) => {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || defaultValue);    

    const updateLocalStorageAndDB = (newState) => {
        // Cart in usersDB
        isLogged && modifyUserCart(newState);

        // Local Storage
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(newState));
    }
     
    const { user, isLogged, modifyUserCart } = useUser();
    useEffect(() => {
        // Si se loggea le tengo que agregar el cart que ya estaba
        
        if (isLogged) {
            const userCart = user.cart;
            cart.map(( ticket ) => {
                // Busco en el usuario si tiene en su cart el ticket
                const userTicketIndex = userCart.findIndex(t => t.ticketId == ticket.ticketId);

                // Si existe, lo actualizo (lo piso) y sino lo agrego.
                if ( userTicketIndex != -1 ) {
                    userCart[userTicketIndex] = ticket;
                } else {
                    userCart.push(ticket);
                }
            })
            setCart(userCart);
            updateLocalStorageAndDB(userCart);
        }
    }, [user])

    const addTicket = (movie, screeningId, quantity) => {
        const ticketId = movie.id + screeningId;

        if (isInCart(ticketId)) {
            // Si está en el arreglo, hago una copia y le modifico la cantidad a esa película, sino agrego la película.
            const newState = [...cart];
            const index = newState.findIndex(ticket => ticket.ticketId == ticketId);
            newState[index].quantity += quantity;
            setCart(newState);
            updateLocalStorageAndDB(newState);
        } else {
            setCart(prevState => {
                const newState = prevState.concat({ movie, screeningId, ticketId, quantity });
                updateLocalStorageAndDB(newState);
                return newState;
            });
        }
    }

    // Es para alterar una función que ya está en el carrito
    const modifyTicket = (oldScreeningId, movie, newScreeningId, newQuantity) => {
        const oldTicketId = movie.id + oldScreeningId;
        const newTicketId = movie.id + newScreeningId;
        const newState = [...cart];
        const index = newState.findIndex(ticket => ticket.ticketId == oldTicketId);
        newState[index] = { 
            movie: movie, 
            screeningId: newScreeningId, 
            ticketId: newTicketId, 
            quantity: newQuantity
        };
        updateLocalStorageAndDB(newState);
        setCart(newState);
    }

    const removeTicket = (ticketId) => {
        setCart(prevState => {
            const newState = prevState.filter(ticket => ticket.ticketId != ticketId);
            updateLocalStorageAndDB(newState);
            return newState;
        });
    }

    const findTicket = (ticketId) => {
        return cart.find(ticket => ticket.ticketId != ticketId)
    }

    const howMany = (ticketId) => {
        const index = cart.findIndex(ticket => ticket.ticketId == ticketId);
        return (index != -1 ? cart[index].quantity : 0);
    }

    const clearCart = () => {
        updateLocalStorageAndDB([]);
        setCart([]);
    }

    const isInCart = (ticketId) => {
        return cart.some(ticket => ticket.ticketId == ticketId);
    }

    const getTotal = () => {
        return cart.reduce((ac, { quantity }) => ac + quantity, 0);
    }

    const isEmpty = () => {
        return cart.length == 0;
    }

    const howMuch = (sala) => {
        // Devuelve el precio acorde a esa función

        switch (true) {
            case sala.includes('SALA 1'):
                return 800;
            case sala.includes('SALA 2'):
                return 800;
            case sala.includes('SALA 3'):
                return 1000;
            default:
                return undefined;
        }
    }

    const cartWidgetRef = useRef();

    const context = {
        cart,
        addTicket,
        modifyTicket,
        removeTicket,
        findTicket,
        howMany,
        clearCart,
        isInCart,
        getTotal,
        isEmpty,
        howMuch,
        cartWidgetRef
    };

    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    );
}

export { useCart, CartProvider };