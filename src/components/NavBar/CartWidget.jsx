import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from 'react';

const CartWidget = ({ btnStyles }) => {
    const { cart, getTotal } = useCart();
    const [total, setTotal] = useState(0);
    const { cartWidgetRef } = useCart();

    useEffect(() => {
        setTotal(getTotal());
    }, [cart])

    const removeFocus = (evt) => {
        evt.target.blur();
    }

    const cantidad = total > 0 ? `${total} Entrada${total > 1 ? 's' : ''}` : 'No agregó ninguna entrada aún';

    return (
        <div>
            <div className="dropdown dropdown-end cartWidget" ref={cartWidgetRef} >
                <label tabIndex={0} className={btnStyles}>
                    <button className={'indicator'}>
                        <i className="fa-solid fa-ticket"></i>
                        <span className="badge badge-sm badge-primary indicator-item">{total}</span>
                    </button>
                </label>

                {<div tabIndex={0} className="mt-3 card card-compact dropdown-content text-black font-albert">
                    <Link to={'./tickets'} className="card-actions">
                        <button className="btn btn-primary text-xs w-52" onClick={removeFocus}>Ver mis entradas</button>
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default CartWidget;