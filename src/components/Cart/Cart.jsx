import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"
import { scrollTo } from '../global/functions'
import Ticket from "./Ticket";
import { PurchaseProvider } from '../../context/PurchaseContext'

const Cart = () => {
    const { cart, removeTicket, modifyTicket, clearCart, isEmpty } = useCart();

    const [clear, setClear] = useState(false);

    useEffect(() => {
        scrollTo('main');
    }, []);


    useEffect(() => {
        if (isEmpty()) {
            setClear(false);
            scrollTo('main');
        } else {
            setClear(true);
        }
    }, [cart]);

    return (
        <PurchaseProvider>
            <div className="flex flex-col items-center px-10 xl:px-36">
                <h1 className="text text-5xl uppercase">Entradas</h1>

                {!isEmpty() &&
                    <ul className="text-2xl my-20 flex flex-col gap-4 w-full">
                        {
                            cart.map(({ movie, screeningId, ticketId, quantity }) => (
                                <li key={ticketId} className='flex justify-center items-end'>
                                    <Ticket movie={movie} initialQuantity={quantity} initialScreeningId={screeningId} removeTicket={removeTicket} modifyTicket={modifyTicket} />
                                </li>)
                            )
                        }
                    </ul>
                }
                {clear ?
                    <button className="btn btn-warning" onClick={clearCart}>Limpiar entradas</button>
                    :
                    <div className="flex flex-col gap-5">
                        <span className="mt-10">Aún no ha seleccionado entradas</span>
                        <Link to={'/'} className="btn">Volver a la página principal</Link>
                    </div>
                }
            </div>
        </PurchaseProvider>
    )
}

export default Cart;