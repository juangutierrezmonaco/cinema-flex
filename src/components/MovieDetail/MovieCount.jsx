import { useState } from "react";
import { useCart } from "../../context/CartContext";

const MovieCount = ( {stock = Infinity, initial = 1, onAdd, submitText, movieId} ) => {
    const { howMany } = useCart();

    const [count, setCount] = useState(initial);

    const increaseCount = () => {
        if (parseInt(count) + howMany(movieId) < stock ) {
            setCount(parseInt(count) + 1);
        } else {
            alert('No disponemos de esa cantidad de entradas para la función seleccionada.')
        }

    }

    const decreaseCount = () => {
        count > 1 && setCount(parseInt(count) - 1);
    }

    const submitTickets = () => {    // Aunque ya está previamente validado que no supere al stock, lo verifico nuevamente por si acaso
        if ( parseInt(count) + howMany(movieId) <= stock ) { // Agrego al carrito y reseteo el contador
            onAdd(parseInt(count));
            setCount(parseInt(1));
        } else {
            alert('No disponemos de esa cantidad de entradas para la función seleccionada.')
        }
    }

    return (
        <div className="flex flex-col">
           <div className="flex justify-between items-center">
                <button className="btn btn-light" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                <span className="carritoCantidad px-7 text-2xl">{count}</span>
                <button className="btn btn-light" onClick={increaseCount}><i className="fa fa-plus"></i></button>
           </div>

            {   submitText &&
                <button className="btn btn-warning" onClick={submitTickets}>{submitText}</button>
            }
        </div>
    )
}

export default MovieCount;