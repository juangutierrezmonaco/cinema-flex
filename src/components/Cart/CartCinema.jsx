import { useState } from "react";

const CartCinema = ({ leftInitial, leftColumns, middleInitial, middleColumns, rightInitial, rightColumns, totalRows, maxSeats }) => {

    // Si no se pasó un máximo, lo setteo igual a la cantidad de asientos
    const totalSeats =  (totalRows - leftInitial) * leftColumns +
                        (totalRows - middleInitial) * middleColumns +
                        (totalRows - rightInitial) * rightColumns;
    maxSeats = maxSeats || totalSeats; 
    console.log( totalSeats );

    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState([]);

    const onClick = (e) => {
        e.target.classList.contains('seat') && console.log(e.target.title);

        if (e.target.classList.contains('seat') &&
            !e.target.classList.contains('occupied')) {

            if (!e.target.classList.contains('selected')) {
                if (count == maxSeats) {
                    alert('Ya elegiste todos capo')
                } else {
                    e.target.classList.toggle('selected');
                    setSelected(prevState => prevState.concat(e.target.title));
                    setCount(count + 1);
                }
            } else {
                e.target.classList.toggle('selected');
                setSelected(prevState => prevState.filter(seat => seat != e.target.title));
                setCount(count - 1);
            }


        }
    };

    function NumToChar(number) {
        number = typeof number == 'string' ? parseInt(number) : number;
        const code = 'A'.charCodeAt(0);

        return String.fromCharCode(code + number);
    }

    return (
        <div className="cartCinemaContainer">
            <h1>CartCinema</h1>

            <div className="cartCinema">

                <ul className="cartCinema-showcase">
                    <li>
                        <div className="seat"></div>
                        <small>N/A</small>
                    </li>
                    <li>
                        <div className="seat selected"></div>
                        <small>Selected</small>
                    </li>
                    <li>
                        <div className="seat occupied"></div>
                        <small>Occupied</small>
                    </li>
                </ul>

                <div className="cartCinema-container" onClick={onClick}>
                    <div className="cartCinema-container_screen"></div>

                    {[...Array(totalRows)].map((_, i) => (
                        <div className="flex gap-5" key={i}>

                            {/* Left side */}
                            <div className="cartCinema-container_seatsRow">
                                {[...Array(leftColumns)].map((_, j) => (
                                    <div className={((j < leftColumns) && (leftInitial <= i)) ?
                                        'seat' : 'seat invisible'} key={j} title={`${NumToChar(i)}${j + 1}`}>
                                    </div>
                                ))}
                            </div>

                            {/* Middle side */}
                            <div className="cartCinema-container_seatsRow">
                                {[...Array(middleColumns)].map((_, j) => (
                                    <div className={(j < middleColumns && middleInitial <= i) ?
                                        'seat' : 'seat invisible'} key={j} title={`${NumToChar(i)}${j + leftColumns + 1}`}>
                                    </div>
                                ))}
                            </div>

                            {/* RIght side */}
                            <div className="cartCinema-container_seatsRow">
                                {[...Array(rightColumns)].map((_, j) => (
                                    <div className={(j < rightColumns && rightInitial <= i) ?
                                        'seat' : 'seat invisible'} key={j} title={`${NumToChar(i)}${j + middleColumns + rightColumns + 1}`}>
                                    </div>
                                ))}
                            </div>

                        </div>

                    ))}
                </div>

                <p className="flex flex-col items-center">
                    <span>Total: {count}</span>
                    <span>
                        Seleccionados: 
                        {selected.map(s => <li>{s}</li>)}
                    </span>
                    <span>Capacidad de la sala: {totalSeats}</span>
                </p>
            </div>

        </div>
    )
}

export default CartCinema;