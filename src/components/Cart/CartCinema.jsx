import { useState } from "react";
import Swal from "sweetalert2";

const CartCinema = ({ leftInitial, leftColumns, middleInitial, middleColumns, rightInitial, rightColumns, totalRows, maxSeats }) => {

    // Si no se pasó un máximo, lo setteo igual a la cantidad de asientos
    const totalSeats = (totalRows - leftInitial) * leftColumns +
        (totalRows - middleInitial) * middleColumns +
        (totalRows - rightInitial) * rightColumns;
    maxSeats = maxSeats || totalSeats;

    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState([]);

    // Alert de error
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const onClick = (e) => {
        if (e.target.classList.contains('seat') &&
            !e.target.classList.contains('occupied')) {

            if (!e.target.classList.contains('selected')) {
                if (count == maxSeats) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Ya elegiste todos los asientos!'
                    })
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

    // De momento genero algunos ocupados al azar.
    const ocupados = [  'A1', 'A3',
                        'C3', 'C11',
                        'D9',
                        'F8', 'F9',
                        'G10',
                        'J5',
                        'K4', 'K5', 'K6', 'K7',
                        'M1', 'M2', 'M9',
                        'R10', 'R12',
                        'T5', 'T6', 'T7', 'T8', 'T9'

                    ];
    const ocupado = (seat) => {
        return ocupados.includes(seat) ? 'occupied' : '';
    }
    

    return (
        <div className="cartCinema mb-10">

            <ul className="cartCinema-showcase">
                <li>
                    <div className="seat"></div>
                    <small>Disponible</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>Seleccionada</small>
                </li>
                <li>
                    <div className="seat occupied"></div>
                    <small>Ocupada</small>
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
                                    `seat ${ocupado(`${NumToChar(i)}${j + 1}`)}` : 'seat invisible'} key={j} title={`${NumToChar(i)}${j + 1}`}>
                                </div>
                            ))}
                        </div>

                        {/* Middle side */}
                        <div className="cartCinema-container_seatsRow">
                            {[...Array(middleColumns)].map((_, j) => (
                                <div className={(j < middleColumns && middleInitial <= i) ?
                                    `seat ${ocupado(`${NumToChar(i)}${j + leftColumns + 1}`)}` : 'seat invisible'} key={j} title={`${NumToChar(i)}${j + leftColumns + 1}`}>
                                </div>
                            ))}
                        </div>

                        {/* RIght side */}
                        <div className="cartCinema-container_seatsRow">
                            {[...Array(rightColumns)].map((_, j) => (
                                <div className={(j < rightColumns && rightInitial <= i) ?
                                    `seat ${ocupado(`${NumToChar(i)}${j + middleColumns + rightColumns + 1}`)}` : 'seat invisible'} key={j} title={`${NumToChar(i)}${j + middleColumns + rightColumns + 1}`}>
                                </div>
                            ))}
                        </div>

                    </div>

                ))}
            </div>

            <p className="flex justify-center px-5 uppercase font-bold w-full">
                Butacas seleccionadas: {selected.join(', ')}
            </p>
        </div>
    )
}

export default CartCinema;