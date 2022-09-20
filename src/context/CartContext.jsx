import React, { useContext, useRef, useState } from "react";

const CartContext = React.createContext([]);

const useCart = () => {
    return useContext(CartContext);
}

const CartProvider = ({ defaultValue = [], children }) => { 

    const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')) || defaultValue );

    const updateLocalStorage = (newState) => {
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(newState));
    }

    const addMovie = ( movie, screeningInfo, quantity ) => {
        const screeningId = movie.id + screeningInfo;

        if ( isInCart(screeningId) ){
            // Si está en el arreglo, hago una copia y le modifico la cantidad a esa película, sino agrego la película.
            const newState = [...cart];
            const index = newState.findIndex( ticket => ticket.screeningId == screeningId);
            newState[index].quantity += quantity; 
            setCart( newState );
            updateLocalStorage(newState);
        } else {
            setCart( prevState => {
                const newState = prevState.concat({ movie, screeningInfo, quantity, screeningId });
                updateLocalStorage(newState);
                return newState;
            });
        }
            
    }

    const removeMovie = ( screeningId ) => {
        setCart( prevState => {
            const newState = prevState.filter( ticket => ticket.screeningId != screeningId );
            updateLocalStorage(newState);
            return newState;
        });
    }


    const howMany = ( movieId, screeningInfo ) => {
        const screeningId = movieId + screeningInfo;

        const index = cart.findIndex(ticket => ticket.screeningId == screeningId);
        return (index != -1 ? cart[index].quantity : 0);
    }

    const clearCart = () => {
        updateLocalStorage( [] );
        setCart( [] );
    }

    const isInCart = (id) => {
        return cart.some(ticket => ticket.screeningId == id);
    }

    const getTotal = () => {
        return cart.reduce((ac, { quantity }) => ac + quantity , 0);
    }

    const isEmpty = () => {
        return cart.length == 0;
    }

    const cartWidgetRef = useRef();

    const context = {
        cart, 
        addMovie,
        removeMovie,
        howMany,
        clearCart,
        isInCart,
        getTotal,
        isEmpty,
        cartWidgetRef
    };

    return (
        <CartContext.Provider value={ context }>
            { children }
        </CartContext.Provider>
    );
}

export { useCart, CartProvider };