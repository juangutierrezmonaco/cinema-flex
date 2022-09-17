import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext"
import functions from '../global/functions'
import Ticket from "./Ticket";

const Cart = () => {
    const { cart, removeMovie, clearCart, isEmpty } = useCart();

    const [ clear, setClear ] = useState(false);

    useEffect(() => {
        functions.scrollTo('main');
    }, []);
    

    useEffect(() => {
        setClear(!isEmpty());
    }, [cart])

    return (
        <div className="flex flex-col items-center px-36">
            <h1 className="text text-5xl uppercase">Entradas</h1>
            {   !isEmpty() &&
                <ul className="text-2xl m-20 bg-slate-300">
                {   
                    cart.map( ({ movie, quantity, screeningId, screeningInfo }) => (
                        <li key={screeningId} className='mb-5 flex justify-center items-end'> 
                            <Ticket movie={movie} quantity={quantity} screeningId={screeningId} screeningInfo={screeningInfo} removeMovie={removeMovie} />
                        </li>)
                    )
                }
            </ul>
            }
            {   clear ?
                    <button className="btn" onClick={clearCart}>Limpiar entradas</button> :
                    <span className="mt-10">Aún no ha seleccionado entradas</span>
            }
        </div>
    )
}

export default Cart;