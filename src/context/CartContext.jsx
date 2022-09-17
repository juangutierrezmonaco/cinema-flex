import React, { useContext, useState } from "react";

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

    const addMovie = ( movie, quantity ) => {
        if ( isInCart(movie.id) ){
            // Si está en el arreglo, hago una copia y le modifico la cantidad a esa película, sino agrego la película.
            const newState = [...cart];
            const index = newState.findIndex(({ movie : currentMovie }) => currentMovie.id == movie.id);
            newState[index].quantity += quantity; 
            setCart( newState );
            updateLocalStorage(newState);
        } else {
            setCart( prevState => {
                const newState = prevState.concat({ movie, quantity });
                updateLocalStorage(newState);
                return newState;
            });
        }
            
    }

    const removeMovie = ( movieId ) => {
        setCart( prevState => {
            const newState = prevState.filter( ({ movie }) => movie.id != movieId );
            updateLocalStorage(newState);
            return newState;
        });
    }

    const howMany = ( movieId ) => {
        const index = cart.findIndex(({ movie }) => movie.id == movieId);
        return (index != -1 ? cart[index].quantity : 0);
    }

    const clearCart = () => {
        updateLocalStorage( [] );
        setCart( [] );
    }

    const isInCart = (movieId) => {
        return cart.some( ({ movie : m } )=> m.id == movieId );
    }

    const getTotal = () => {
        return cart.reduce((ac, { quantity }) => ac + quantity , 0);
    }

    const isEmpty = () => {
        return cart.length == 0;
    }

    const context = {
        cart, 
        addMovie,
        removeMovie,
        howMany,
        clearCart,
        isInCart,
        getTotal,
        isEmpty
    };

    return (
        <CartContext.Provider value={ context }>
            { children }
        </CartContext.Provider>
    );
}

export { useCart, CartProvider };