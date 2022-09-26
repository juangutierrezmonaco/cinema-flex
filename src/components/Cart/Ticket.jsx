import { useEffect, useRef, useState } from 'react';
import MovieFooter from '../MovieFooter/MovieFooter';
import CinemaContainer from './CinemaContainer';
import CreditCardContainer from '../CreditCard/CreditCardContainer'

import movieNotFound from '/assets/img/movie-not-found.svg';
import { scrollTo } from '../global/functions'
import Swal from 'sweetalert2';
import { usePurchase } from '../../context/PurchaseContext';
import { useCart } from '../../context/CartContext';
import OrderContainer from '../Order/OrderContainer';

const Ticket = ({ movie, initialScreeningId, initialQuantity, removeTicket, modifyTicket }) => {

    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : movieNotFound;

    const backdropPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    const ticketRef = useRef();

    const [openCinema, setOpenCinema] = useState(false);
    const closeCinema = () => {
        // Antes de cerrarlo modifico el ticket en el que estoy
        const { screening, cantidad } = order;
        modifyTicket(initialScreeningId, movie, screening.id, cantidad);
        setOpenCinema(false);
    };

    const [openCreditCard, setOpenCreditCard] = useState(false);
    const closeCreditCard = () => {
        setOpenCreditCard(false);
        scrollTo('', ticketRef);
    }

    const [openOrder, setOpenOrder] = useState(false);
    const closeOrder = () => {
        setOpenOrder(false);
    }

    useEffect(() => {
        scrollTo('', ticketRef);
        setIsActive(openCinema);    // Sólo se puede comprar las entradas de a una función por vez
    }, [openCinema])

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

    const clearTicket = () => {
        // Modificar para que se elimine el id que realmente tiene (modify ticket)
        removeTicket(movie.id + initialScreeningId);
    }

    const { order, setScreeningData, setSeats, setPaymentId, isActive, setIsActive, submitOrderToDB } = usePurchase();

    /* useEffect(() => {
        console.log(order);
    }, [order]) */

    useEffect(() => {
        document.body.style.overflowY = openCreditCard ? "hidden" : 'scroll';
    }, [openCreditCard])
    


    const submitScreening = (screening, cantidad, precio) => {
        if (!isActive) {
            setScreeningData(screening, movie, cantidad, precio);
            setOpenCinema(true);
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Ya estás en proceso de compra de una película'
            })
        }
    }

    const submitSeats = (seats) => {
        // ANTES QUE NADA TENÉS QUE ESTAR LOGGEADO PARA COMPRAR PAPÁ
        setSeats(seats);
        setOpenCreditCard(true);
    };

    const finishPurchase = (paymentInfo) => {
        const { paymentStatus } = paymentInfo;

        if (paymentStatus == 'success') {
            const { paymentId } = paymentInfo;

            const callbackPayment = ( currentOrder ) => {
                setOpenCreditCard(false);
                setOpenCinema(false);
                submitOrderToDB( currentOrder );
                /* clearTicket(); */

                Swal.fire({
                    icon: 'success',
                    text: 'Cobrado correctamente!',
                })
            }

            setPaymentId(paymentId, callbackPayment);


        } else {
            const { errorDetail } = paymentInfo;
            Swal.fire({
                icon: 'error',
                text: errorDetail,
            })
        }


        // Verificaciones, si todo salio bien la borro
        /* removeTicket(movie.id + initialScreeningId); */

        // ACTUALIZAR DB SI SALE TODO BIEN ACá
        // Primero actualizar DB, después cobrar y después lanzar cartel
    }


    return (
        <div ref={ticketRef} className='w-full'>
            {!openCinema ?
                <div className="cartCard">
                    <div className='cartCard-background'>
                        <div style={backgroundStyle}></div>
                    </div>

                    <figure className="cartCard-img"><img src={posterPath} alt={`Poster de la película ${movie.title}`} className={!movie.poster_path ? 'cartCard-img_notFound' : ''} /></figure>

                    <div className='cartCard-right'>

                        <div className='cartCard-right_top rounded-xl'>
                            <span className='font-semibold text-4xl underline mb-5'>{`Título: ${movie.title}`}</span>
                            <span className='text-2xl'>{`Duración: ${movie.runtime} minutos`}</span>
                        </div>

                        <div className='cartCard-right_bottom'>
                            <MovieFooter initial={initialQuantity} submitText='Comprar entradas!' onAdd={submitScreening} movieId={movie.id} selectedScreeningId={initialScreeningId} />
                        </div>
                    </div>

                    <button className="cartCard-deleteBtn btn" onClick={clearTicket}>Borrar</button>
                </div>
                :
                <CinemaContainer continuar={submitSeats} cancelar={closeCinema} />
            }

            {openCreditCard &&
                <CreditCardContainer onSubmit={finishPurchase} onCancel={closeCreditCard} open={openCreditCard} />
            }

            {openOrder &&
                <OrderContainer />
            }

        </div>
    )
}
export default Ticket;
