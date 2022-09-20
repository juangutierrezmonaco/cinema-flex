import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        isEmpty && functions.scrollTo('main');
    }, [cart]);
    
    
    return (
        <div className="flex flex-col items-center px-10 xl:px-36">
            <h1 className="text text-5xl uppercase">Entradas</h1>
            {   !isEmpty() &&
                <ul className="text-2xl my-20 flex flex-col gap-4">
                {   
                    cart.map( ({ movie, quantity, screeningId, screeningInfo }) => (
                        <li key={screeningId} className='flex justify-center items-end'> 
                            <Ticket movie={movie} quantity={quantity} screeningId={screeningId} screeningInfo={screeningInfo} removeMovie={removeMovie} />
                        </li>)
                    )
                }
            </ul>
            }
            {   clear ?
                    <button className="btn btn-warning" onClick={clearCart}>Limpiar entradas</button> 
                    :
                    <div className="flex flex-col gap-5">
                        <span className="mt-10">Aún no ha seleccionado entradas</span>
                        <Link to={'/'} className="btn">Volver a la página principal</Link>
                    </div>
            }
        </div>
    )
}

export default Cart;