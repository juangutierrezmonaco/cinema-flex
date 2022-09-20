import MovieScreeningSelect from './MovieScreeningSelect';
import funcionesDeCine from '../../funcionesDeCine.json';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

const MovieDetailFooter = ({ initial = 1, onAdd, submitText, movieId, values = [] }) => {

    /* En teoría esta sería la función que hace la consulta a la base de datos con la película, el día y horario y la sala */
    /* De momento sólo retorna 10, pero a futuro se hará la funcionalidad */
    const getDisponibles = () => {
        return 10;
    }

    /* Si estoy en el cart no tengo que contar cuántas tengo en el cart para el stock, pero si estoy afuera del cart sí */
    const imInCart = useLocation().pathname == '/tickets';

    /* MovieCount */
    const { howMany } = useCart();
    const [count, setCount] = useState(initial);

    const increaseCount = () => {
        const sizeInCart = imInCart ? 0 : howMany(movieId, screeningId);
        if (parseInt(count) + sizeInCart < getDisponibles()) {
            setCount(parseInt(count) + 1);
        } else {
            alert('No disponemos de esa cantidad de entradas para la función seleccionada.')
        }
    }

    const decreaseCount = () => {
        count > 1 && setCount(parseInt(count) - 1);
    }

    const [toggleSubmitButtton, setToggleSubmitButtton] = useState(false);

    const submitTickets = (e) => {
        // Esto cambia el estado del botón de agregar al carrito, pero si estoy en el carrito no lo cambio.
        !imInCart && setToggleSubmitButtton(true);

        const sizeInCart = imInCart ? 0 : howMany(movieId, screeningId);
        if (parseInt(count) + sizeInCart <= getDisponibles()) {
            onAdd(parseInt(count), screeningId);
            setCount(1);
        } else {
            alert('No disponemos de esa cantidad de entradas para la función seleccionada.')
        }
    }

    const leaveMeHere = () => {
        setToggleSubmitButtton(!toggleSubmitButtton);
    }

    /* Valores por default para los select */
    const [screeningId, setScreeningId] = useState('');
    const defaultSala = values.length > 0 ? values.slice(0, 1) : -1;
    const defaultHorario = values.length > 0 ? values.slice(1, 3) : -1;

    return (
        <div className='movieDetailFooter'>
            <div className='movieDetailFooter_select'>
                <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione la función</span>
                <MovieScreeningSelect screenings={funcionesDeCine} defaultSala={defaultSala} defaultHorario={defaultHorario} setScreeningId={setScreeningId} />
            </div>

            <div className={screeningId ? `movieDetailFooter_select visible` : 'movieDetailFooter_select invisible'}>
                <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione entradas</span>
                {!toggleSubmitButtton ?
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                            <button className="btn btn-light" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                            <span className="carritoCantidad px-7 text-2xl">{count}</span>
                            <button className="btn btn-light" onClick={increaseCount}><i className="fa fa-plus"></i></button>
                        </div>
                        <button className="btn btn-warning" onClick={submitTickets}>{submitText}</button>
                    </div>
                    :
                    <div className='movieDetailFooter_goToCart flex flex-col'>
                        <Link to='/tickets' className='btn text-warning bg-black'>Ir a mis entradas</Link>
                        <button className='btn btn-warning' onClick={leaveMeHere}>Volver</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default MovieDetailFooter;