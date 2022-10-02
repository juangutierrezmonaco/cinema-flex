import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"
import { scrollTo } from '../Utils/functions'
import Ticket from "./Ticket";
import { PurchaseProvider } from '../../context/PurchaseContext'
import { useRef } from "react";

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

    const linkRef = useRef();
    const toMyTickets = () => {
        linkRef.current && linkRef.current.click();
    }

    return (
        <PurchaseProvider>
            <div className="flex flex-col items-center mb-7 pb-10">
                <h1 className="text-4xl uppercase mb-14 underline font-bowlby">Entradas</h1>

                {!isEmpty() &&
                    <ul className="cartCards">
                        {
                            cart.map(({ movie, screeningId, ticketId, quantity }) => (
                                <li key={ticketId} className='flex justify-center items-end'>
                                    <Ticket movie={movie} initialQuantity={quantity} initialScreeningId={screeningId} removeTicket={removeTicket} modifyTicket={modifyTicket} toMyTickets={toMyTickets}/>
                                </li>)
                            )
                        }
                    </ul>
                }
                {clear ?
                    <button className="btn btn-warning mt-10" onClick={clearCart}>Limpiar entradas</button>
                    :
                    <div className="flex flex-col gap-5 text-xl">
                        <span>Aún no ha seleccionado entradas</span>
                        <Link to={'/'} className="btn btn-warning">Volver a la página principal</Link>
                    </div>
                }

                <Link to='/user/tickets' ref={linkRef} className='hidden'></Link>
            </div>
        </PurchaseProvider>
    )
}

export default Cart;