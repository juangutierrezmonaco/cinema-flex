import MovieScreeningSelect from './MovieScreeningSelect';

import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import Swal from 'sweetalert2'
import { useUser } from '../../context/UserContext';

const MovieFooter = ({ initial = 1, onAdd, submitText, movieId, selectedScreeningId }) => {

    /* Traigo las funciones de la base de datos */
    const [screenings, setScreenings] = useState([]);
    const getScreenings = () => {
        return new Promise((resolve, reject) => {
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

        if (screenings.length > 0 && screeningId) {
            // Set disponibles
            setDisponibles(screenings.find(s => s.id == screeningId) && screenings.find(s => s.id == screeningId).asientosDisponibles)

            // Set de precio
            const funcion = screenings.find(s => s.id == screeningId);
            funcion && setPrecio(howMuch(funcion.sala));
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
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
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
                title: 'No disponemos de esa cantidad de entradas para la función seleccionada.'
            })
        }
    }

    const decreaseCount = () => {
        count > 1 && setCount(parseInt(count) - 1);
    }

    const [toggleSubmitButtton, setToggleSubmitButtton] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const { userWidgetRef, isLogged } = useUser();

    const submitTickets = () => {
        const sizeInCart = imInCart ? 0 : howMany(movieId + screeningId);

        if (parseInt(count) + sizeInCart <= disponibles) {
            if (imInCart && !isLogged) {

                userWidgetRef.current && userWidgetRef.current.parentElement.classList.add('shake-horizontal');
                userWidgetRef.current && userWidgetRef.current.classList.add('bg-white', 'text-black');
                setTimeout(() => {
                    userWidgetRef.current && userWidgetRef.current.parentElement.classList.remove('shake-horizontal');
                    userWidgetRef.current && userWidgetRef.current.classList.remove('bg-white', 'text-black');
                }, 500);

                Toast.fire({
                    icon: 'error',
                    title: 'Tenes que contar con una sesión activa para comprar las entradas.'
                })
            } else {
                const funcion = screenings.find(s => s.id == screeningId);
                onAdd({ ...funcion, horario: funcion.horario.toDate() }, parseInt(count), precioTotal);
                !imInCart && setCount(1);

                // Esto cambia el estado del botón de agregar al carrito, pero si estoy en el carrito no lo cambio.
                !imInCart && setToggleSubmitButtton(true);
            }
        } else {
            Toast.fire({
                icon: 'error',
                title: 'No disponemos de esa cantidad de entradas para la función seleccionada.'
            })
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

            <div className='movieDetailFooter_selectContainer'>
                <div className='movieDetailFooter_select'>
                    <span className='uppercase font-extrabold tracking-wider bg-primary/70 p-1 movieDetailFooter_select_title'>Seleccione la función</span>
                    <MovieScreeningSelect screenings={screenings} setScreeningId={setScreeningId} defaultScreening={defaultValue} />
                </div>

                <div className={screeningId ? `movieDetailFooter_select visible` : 'movieDetailFooter_select invisible'}>
                    <span className='uppercase font-extrabold tracking-wider bg-primary/70 p-1 movieDetailFooter_select_title'>Seleccione entradas</span>
                    {!toggleSubmitButtton ?
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <button className="btn btn-ghost btn-sm bg-white/50" onClick={decreaseCount}><i className="fa fa-minus"></i></button>
                                <span className="px-7 font-bold movieDetailFooter_select_count">{count}</span>
                                <button className="btn btn-ghost btn-sm bg-white/50" onClick={increaseCount}><i className="fa fa-plus"></i></button>
                            </div>

                            <button className="btn btn-ghost btn-sm hover:btn-primary bg-white/50" onClick={submitTickets}>{submitText}</button>
                        </div>
                        :
                        <div className='movieDetailFooter_goToCart flex flex-col gap-3'>
                            <button className='btn btn-ghost btn-sm hover:btn-primary bg-white/50' onClick={leaveMeHere}>Volver</button>
                            <Link to='/tickets' className='btn btn-ghost btn-sm hover:btn-warning bg-white/50'>Ir a mis entradas</Link>
                        </div>
                    }
                </div>
            </div>

            {imInCart &&
                <div className='movieDetailFooter_price font-bowlby text-lg md:text-2xl'>
                    <span className='uppercase'>Total</span>
                    <span> {precioTotal ? `: $ ${precioTotal}` : '...'} </span>
                </div>
            }
        </div>
    )
}

export default MovieFooter;