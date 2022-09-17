import MovieScreeningSelect from './MovieScreeningSelect';
import funcionesDeCine from '../../funcionesDeCine.json';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

const MovieDetailFooter = ({ initial = 1, onAdd, submitText, movieId }) => {

    /* En teoría esta sería la función que hace la consulta a la base de datos con la película, el día y horario y la sala */
    /* De momento sólo retorna 10, pero a futuro se hará la funcionalidad */
    const getDisponibles = () => {
        return 10;
    }

    /* MovieCount */
    const { howMany } = useCart();
    const [count, setCount] = useState(initial);

    const increaseCount = () => {
        if (parseInt(count) + howMany(movieId, screeningId) < getDisponibles()) {
            setCount(parseInt(count) + 1);
        } else {
            alert('No disponemos de esa cantidad de entradas para la función seleccionada.')
        }
    }

    const decreaseCount = () => {
        count > 1 && setCount(parseInt(count) - 1);
    }


    const submitTickets = () => {
        if (parseInt(count) + howMany(movieId, screeningId) <= getDisponibles()) {
            onAdd(parseInt(count), screeningId);
        } else {
            alert('No disponemos de esa cantidad de entradas para la función seleccionada.')
        }
    }

    /* MovieScreeningId */
    const [horarioId, setHorarioId] = useState('');
    const [sala, setSala] = useState('');
    const screeningId = (sala && horarioId) && sala + horarioId;

    return (
        <div className='movieDetailFooter'>
            <div className='movieDetailFooter_select'>
                <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione la función</span>
                <MovieScreeningSelect screenings={funcionesDeCine} setHorario={setHorarioId} setSala={setSala}/>
            </div>

            {   screeningId &&
                <div className='movieDetailFooter_select'>
                    <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione entradas</span>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                            <button className="btn btn-light" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                            <span className="carritoCantidad px-7 text-2xl">{count}</span>
                            <button className="btn btn-light" onClick={increaseCount}><i className="fa fa-plus"></i></button>
                        </div>

                        <button className="btn btn-warning" onClick={submitTickets}>{submitText}</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetailFooter;