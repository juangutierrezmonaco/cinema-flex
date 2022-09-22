import MovieScreeningSelect from './MovieScreeningSelect';

import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';

const MovieDetailFooter = ({ initial = 1, onAdd, submitText, movieId, selectedScreeningId }) => {

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


    // El default value es por si estamos en el carrito para settear los selects, contiene todos los atributos de la función
    const [defaultValue, setDefaultValue] = useState(undefined);
    useEffect(() => {
        screenings.length != 0 && setDefaultValue(screenings.find(s => s.id == selectedScreeningId));
    }, [screenings])

    /* ID único de la función que seleccionamos */
    const [screeningId, setScreeningId] = useState(selectedScreeningId);

    /* Hace la consulta de cantidad disponible para esa función */
    const [disponibles, setDisponibles] = useState(0);

    useEffect(() => {
        // Setteo disponibles para esa función

        // Setteo el precio
        if ( screenings.length > 0 && screeningId ) {
            // Set disponibles
            setDisponibles(screenings.find(s => s.id == screeningId) && screenings.find(s => s.id == screeningId).asientosDisponibles)

            // Set de precio
            const sala = screenings.find(s => s.id == screeningId).sala;
            setPrecio(howMuch(sala));
        } else {
            setDisponibles(0)
            setPrecio(0);
        }
        
    }, [screenings, screeningId])

    /* Si estoy en el cart no tengo que contar cuántas funciones tengo en el cart para el stock, pero si estoy afuera del cart sí */
    const imInCart = useLocation().pathname == '/tickets';

    /* MovieCount */
    const { howMany, howMuch } = useCart();
    const [count, setCount] = useState(initial);

    const increaseCount = () => {
        const sizeInCart = imInCart ? 0 : howMany(movieId + screeningId);
        if (parseInt(count) + sizeInCart < disponibles) {
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
        const sizeInCart = imInCart ? 0 : howMany(movieId + screeningId);
        if (parseInt(count) + sizeInCart <= disponibles) {
            onAdd(screeningId, parseInt(count));
            setCount(1);
            
            // Esto cambia el estado del botón de agregar al carrito, pero si estoy en el carrito no lo cambio.
            !imInCart && setToggleSubmitButtton(true);
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
                <MovieScreeningSelect screenings={screenings} setScreeningId={setScreeningId} defaultScreening={defaultValue}/>
            </div>

            <div className={screeningId ? `movieDetailFooter_select visible` : 'movieDetailFooter_select invisible'}>
                <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione entradas</span>
                {!toggleSubmitButtton ?
                    <div className="flex flex-col gap-3">

                        <div className='flex justify-end'>
                            <span className=' badge badge-lg badge-success font-semibold   '>Disponibles: {disponibles || '...'}</span>
                        </div>

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
                        <span> {precio ? `$ ${precio}` : '...'} </span>
                    </div>

                    <div className='flex flex-col text-3xl'>
                        <span className='underline'>Precio total</span>
                        <span> {precioTotal ? `$ ${precioTotal}` : '...'} </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetailFooter;