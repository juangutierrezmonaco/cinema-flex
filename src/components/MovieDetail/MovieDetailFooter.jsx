import MovieScreeningSelect from './MovieScreeningSelect';
import funcionesDeCine from '../../funcionesDeCine.json';

import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, getFirestore, orderBy, query, limit } from 'firebase/firestore';

const MovieDetailFooter = ({ initial = 1, onAdd, submitText, movieId, values = [] }) => {

    /* Traigo las funciones de la base de datos */
    const [screenings, setScreenings] = useState([]);
    const getScreenings = () => {

        return new Promise( (resolve, reject) => {
            const db = getFirestore();
            const q = query(
                collection(db, "screenings"),
                orderBy('sala')
            );

            getDocs(q)
                .then(res => {
                    if (res.size == 0) {
                        console.log('Sin resultados');
                        resolve([]);
                    } else {
                        const resp = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        resolve(resp);
                    }
                })
                .catch(error => reject(error));
        });
    }

    useEffect(() => {
        // Setteo las funciones
        getScreenings()
            .then(res => {
                setScreenings(res);
            })
            .catch(err => console.log(err));
    }, [])

    /* En teoría esta sería la función que hace la consulta a la base de datos con la película, el día y horario y la sala */
    /* De momento sólo retorna 10, pero a futuro se hará la funcionalidad */
    const getDisponibles = () => {
        return 10;
    }

    /* Valores por default para los select para seleccionar la función */
    const [screeningId, setScreeningId] = useState('');
    const defaultSala = values.length > 0 ? values.slice(0, 1) : -1;
    const defaultHorario = values.length > 0 ? values.slice(1, 3) : -1;

    useEffect(() => {
        const screeningInfo = screeningId.slice(0, 3);
        screeningInfo && setPrecio(howMuch(screeningInfo));

        // Si se cambia la función, el contador se reinicia
        setCount(initial);

    }, [screeningId]);

    /* Si estoy en el cart no tengo que contar cuántas tengo en el cart para el stock, pero si estoy afuera del cart sí */
    const imInCart = useLocation().pathname == '/tickets';

    /* MovieCount */
    const { howMany, howMuch } = useCart();
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

    const submitTickets = () => {
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

    /* Valores para los precios */
    const [precio, setPrecio] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);

    useEffect(() => {
        setPrecioTotal(precio * count);
    }, [precio, count])

    return (
        <div className='movieDetailFooter'>

            <div className='movieDetailFooter_select'>
                <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione la función</span>
                <MovieScreeningSelect screenings={screenings} defaultSala={defaultSala} defaultHorario={defaultHorario} setScreeningId={setScreeningId} />
            </div>

            <div className={screeningId ? `movieDetailFooter_select visible` : 'movieDetailFooter_select invisible'}>
                <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione entradas</span>
                {!toggleSubmitButtton ?
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <button className="btn text-white bg-black" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                            <span className="px-7 text-2xl btn btn-warning btn-circle outline outline-2">{count}</span>
                            <button className="btn text-white bg-black" onClick={increaseCount}><i className="fa fa-plus"></i></button>
                        </div>
                        <button className="btn btn-warning outline outline-2" onClick={submitTickets}>{submitText}</button>
                    </div>
                    :
                    <div className='movieDetailFooter_goToCart flex flex-col gap-3'>
                        <button className='btn btn-warning outline outline-2' onClick={leaveMeHere}>Volver</button>
                        <Link to='/tickets' className='btn text-warning bg-black'>Ir a mis entradas</Link>
                    </div>
                }
            </div>

            {imInCart &&
                <div className='text-center uppercase font-semibold text-warning p-2 rounded-3xl bg-black/60'>
                    <div className='flex flex-col text-lg mb-3'>
                        <span className='underline'>Precio unitario</span>
                        <span> ${precio} </span>
                    </div>

                    <div className='flex flex-col text-3xl'>
                        <span className='underline'>Precio total</span>
                        <span> ${precioTotal} </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetailFooter;