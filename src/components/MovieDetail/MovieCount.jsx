import { useState } from "react";

const MovieDetailCount = ( {stock, initial, onAdd} ) => {

    const [count, setCount] = useState(initial);

    const increaseCount = () => {
        count < stock && setCount(parseInt(count) + 1);
    }

    const decreaseCount = () => {
        count > 1 && setCount(parseInt(count) - 1);
    }

    const validate = () => {    // Aunque ya está previamente validado que no supere al stock, lo verifico nuevamente por si acaso
        count <= stock && onAdd(count);
    }

    return (
        <div className="movieCount">
           <div>
                <button className="btn btn-light" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                <span className="carritoCantidad">{count}</span>
                <button className="btn btn-light" onClick={increaseCount}><i className="fa fa-plus"></i></button>
           </div>

            <button className="btn btn-warning" onClick={validate}>Agregar a mis entradas!</button>
        </div>
    )
}

export default MovieDetailCount;