import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext"
import functions from '../global/functions'

const Cart = () => {
    const { cart, removeMovie, clearCart, isEmpty } = useCart();

    const [ clear, setClear ] = useState(false);

    useEffect(() => {
        functions.scrollTo('main');
        setClear(!isEmpty());
    }, [cart])

    return (
        <div className="flex flex-col items-center ">
            <h1 className="text text-5xl uppercase">Entradas</h1>
            <ul className="text-2xl mt-20">
                {
                    cart.map( ({ movie, quantity }) => (
                        <li key={movie.id} className='flex justify-between mb-5'>
                            <span>{`Título: ${movie.title}, cantidad: ${quantity}`}</span>
                            <button className="btn btn-sm ml-8" onClick={() => removeMovie(movie.id)}>Borrar</button>
                        </li>)
                    )
                    
                }
            </ul>
            {   clear ?
                    <button className="btn" onClick={clearCart}>Limpiar entradas</button> :
                    <span>Aún no ha seleccionado entradas</span>
            }
        </div>
    )
}

export default Cart;