import { useState } from "react";

const MovieDetailCount = ( {stock, initial, onAdd} ) => {

    const [count, setCount] = useState(initial);

    const increaseCount = () => {
        if (count < stock ) {
            setCount(parseInt(count) + 1);
        } else {
            alert('No disponemos de esa cantidad de stock.')
        }

    }

    const decreaseCount = () => {
        count > 1 && setCount(parseInt(count) - 1);
    }

    const submitTickets = () => {    // Aunque ya está previamente validado que no supere al stock, lo verifico nuevamente por si acaso
        if ( count <= stock ) { // Agrego al carrito y reseteo el contador
            onAdd(parseInt(count));
            setCount(1);
        } else {
            alert('No disponemos de esa cantidad de stock.')
        }
    }

    return (
        <div className="movieCount">
           <div>
                <button className="btn btn-light" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                <span className="carritoCantidad">{count}</span>
                <button className="btn btn-light" onClick={increaseCount}><i className="fa fa-plus"></i></button>
           </div>

            <button className="btn btn-warning" onClick={submitTickets}>Agregar a mis entradas!</button>
        </div>
    )
}

export default MovieDetailCount;