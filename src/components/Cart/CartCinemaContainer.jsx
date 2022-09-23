import CreditCard from "../CreditCard/CreditCard"
import CartCinema from "./CartCinema"

const CartCinemaContainer = ({ funcion, movie, cantidad, cancelar, continuar }) => {

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
    const sala = funcion && funcion.sala;
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

    return (
        <div className="cartCinemaContainer py-16">

            <div className="flex flex-col items-center mb-5">
                <span>Película: {movie && movie.title}</span>
                <span>Función: {funcion && funcion.horario.toLocaleString()}</span>
                <span>Cantidad: {cantidad}</span>
            </div>

            <CartCinema {...cinemaSeatsParams} maxSeats={cantidad} />

            <div className="absolute right-5 bottom-5 flex gap-5">
                <button className="btn btn-success" onClick={continuar}>Continuar</button>
                <button className="btn btn-error" onClick={cancelar}>Cancelar</button>
            </div>
        </div>


    )
}
export default CartCinemaContainer;