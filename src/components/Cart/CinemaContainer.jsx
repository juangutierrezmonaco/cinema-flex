import { useRef } from "react"
import Cinema from "./Cinema"
import Swal from "sweetalert2";
import { usePurchase } from "../../context/PurchaseContext";

const CinemaContainer = ({  continuar, cancelar }) => {
    const { order } = usePurchase();
    const { screening, movie, cantidad } = order;

    const cinemaSeatsParams1 = {
        leftInitial: 0, leftColumns: 4,
        middleInitial: 4, middleColumns: 12,
        rightInitial: 0, rightColumns: 4,
        totalRows: 20
    }

    const cinemaSeatsParams2 = {
        leftInitial: 6, leftColumns: 3,
        middleInitial: 0, middleColumns: 10,
        rightInitial: 6, rightColumns: 3,
        totalRows: 22
    }

    const cinemaSeatsParams3 = {
        leftInitial: 4, leftColumns: 2,
        middleInitial: 0, middleColumns: 8,
        rightInitial: 4, rightColumns: 2,
        totalRows: 20
    }

    let cinemaSeatsParams = {};
    const sala = screening && screening.sala;
    switch (sala) {
        case 'SALA 1':
            cinemaSeatsParams = cinemaSeatsParams1;
            break;
        case 'SALA 2':
            cinemaSeatsParams = cinemaSeatsParams2;
            break;
        case 'SALA 3':
            cinemaSeatsParams = cinemaSeatsParams3;
            break;

        default:
            break;
    }

    const selectedRef = useRef();

    const submitSeats = () => {
        if (selectedRef.current.length >= cantidad) {
            continuar(selectedRef.current);
        } else {
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
            Toast.fire({
                icon: 'error',
                title: 'Debe seleccionar todos los asientos!'
            })
        }
    }

    

    return (
        <div className="cartCinemaContainer py-16">

            <div className="flex flex-col items-center mb-5">
                <span>Película: {movie && movie.title}</span>
                <span>Función: {screening && screening.horario.toLocaleString()}</span>
                <span>Cantidad: {cantidad}</span>
            </div>

            <Cinema {...cinemaSeatsParams} maxSeats={cantidad} selectedRef={selectedRef} ocupados={screening.asientosOcupados}/>

            <div className="absolute right-5 bottom-5 flex gap-5">
                <button className="btn btn-success" onClick={submitSeats}>Continuar</button>
                <button className="btn btn-error" onClick={cancelar}>Cancelar</button>
            </div>
        </div>


    )
}
export default CinemaContainer;