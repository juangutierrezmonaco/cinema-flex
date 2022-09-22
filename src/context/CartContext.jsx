import React, { useContext, useRef, useState } from "react";

const CartContext = React.createContext([]);

const useCart = () => {
    return useContext(CartContext);
}

const CartProvider = ({ defaultValue = [], children }) => {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || defaultValue);

    const updateLocalStorage = (newState) => {
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(newState));
    }

    const addTicket = (movie, screeningId, quantity) => {
        const ticketId = movie.id + screeningId;

        if (isInCart(ticketId)) {
            // Si está en el arreglo, hago una copia y le modifico la cantidad a esa película, sino agrego la película.
            const newState = [...cart];
            const index = newState.findIndex(ticket => ticket.ticketId == ticketId);
            newState[index].quantity += quantity;
            setCart(newState);
            updateLocalStorage(newState);
        } else {
            setCart(prevState => {
                const newState = prevState.concat({ movie, screeningId, ticketId, quantity });
                updateLocalStorage(newState);
                return newState;
            });
        }
    }

    const removeTicket = (ticketId) => {
        setCart(prevState => {
            const newState = prevState.filter(ticket => ticket.ticketId != ticketId);
            updateLocalStorage(newState);
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
        updateLocalStorage([]);
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

    const howMuch = ( sala ) => {
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