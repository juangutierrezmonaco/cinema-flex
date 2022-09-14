import React, { useContext, useState } from "react";

const CartContext = React.createContext([]);

const useCart = () => {
    return useContext(CartContext);
}

const CartProvider = ({ defaultValue = [], children }) => { 

    const [cart, setCart] = useState( defaultValue );

    const addMovie = ( movie, quantity ) => { 
        if ( isInCart(movie.id) ){
            // Si está en el arreglo, hago una copia y le modifico la cantidad a esa película, sino agrego la película.
            const newState = [...cart];
            const index = newState.findIndex(({ movie : currentMovie }) => currentMovie.id == movie.id);
            newState[index].quantity += quantity; 
            setCart( newState );
            
        } else {
            setCart( prevState => prevState.concat({ movie, quantity }) );
        }
            
    }

    const removeMovie = ( movieId ) => {
        setCart( prevState => prevState.filter( ({ movie }) => movie.id != movieId ));
    }

    const clearCart = () => {
        setCart( [] );
    }

    const isInCart = (movieId) => {
        return cart.some( ({ movie : m } )=> m.id == movieId );
    }

    const getTotal = () => {
        return cart.reduce((ac, { quantity }) => ac + quantity , 0);
    }

    const isEmpty = () => {
        console.log(cart.length);
        return cart.length == 0;
    }

    const context = {
        cart, 
        addMovie,
        removeMovie,
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