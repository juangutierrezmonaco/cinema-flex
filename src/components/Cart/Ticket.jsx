import { useEffect, useRef, useState } from 'react';
import MovieFooter from '../MovieFooter/MovieFooter';
import CinemaContainer from './CinemaContainer';
import CreditCardContainer from '../CreditCard/CreditCardContainer'

import movieNotFound from '/assets/img/movie-not-found.svg';
import { scrollTo } from '../Utils/functions'
import Swal from 'sweetalert2';
import { usePurchase } from '../../context/PurchaseContext';
import { useUser } from '../../context/UserContext';
const Ticket = ({ movie, initialScreeningId, initialQuantity, removeTicket, modifyTicket, toMyTickets }) => {

    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : movieNotFound;

    const backdropPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

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

    const ticketRef = useRef();

    const [openCinema, setOpenCinema] = useState(false);
    const closeCinema = () => {
        const { screening, cantidad } = order;
        if (screening.id != initialScreeningId) {
            modifyTicket(initialScreeningId, movie, screening.id, cantidad);
        }
        setOpenCinema(false);
    };

    useEffect(() => {
        scrollTo('', ticketRef);
        setIsActive(openCinema);    // Sólo se puede comprar las entradas de a una función por vez
    }, [openCinema]);


    const [openCreditCard, setOpenCreditCard] = useState(false);
    const closeCreditCard = () => {
        setOpenCreditCard(false);
        scrollTo('', ticketRef);
    }

    const clearTicket = () => {
        scrollTo('', ticketRef);
        removeTicket(movie.id + initialScreeningId);
    }

    const { order, setScreeningData, setSeats, setPaymentId, setUserId, isActive, setIsActive, submitOrder } = usePurchase();

    const submitScreening = (screening, cantidad, precio) => {
        if (screening.asientosOcupados == undefined) {
            screening = { ...screening, asientosOcupados: [] };
        }

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
        setSeats(seats);
        setOpenCreditCard(true);
    };

    const { user } = useUser();

    const finishPurchase = (paymentInfo) => {
        const { paymentStatus } = paymentInfo;

        if (paymentStatus == 'success') {
            const { paymentId } = paymentInfo;
            setUserId(user.id);

            const callbackPayment = (currentOrder) => {
                setOpenCreditCard(false);
                setOpenCinema(false);
                setIsActive(false);
                submitOrder(currentOrder);
                clearTicket();

                Swal.fire({
                    icon: 'success',
                    title: 'Cobrado correctamente!',
                    text: "Puede ir a ver sus tickets!",
                    showCancelButton: true,
                    confirmButtonText: 'Ir a mis tickets!',
                    cancelButtonText: "Quedarme aquí"
                }).then(({ isConfirmed }) => {
                    isConfirmed && toMyTickets();
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
    }

    return (
        <div ref={ticketRef} className='w-full'>
            {!openCinema ?
                <div className="cartCard font-albert">
                    <div className='cartCard-background'>
                        <div style={backgroundStyle}></div>
                    </div>

                    <div className="cartCard-img">
                        <img src={posterPath} alt={`Poster de la película ${movie.title}`} className={!movie.poster_path ? 'cartCard-img_notFound' : ''} />
                    </div>

                    <div className='cartCard-right'>
                        <div className='cartCard-right-details uppercase text-md font-bold '>
                            <span className='flex gap-1 justify-start items-center'>
                                <i className="fa-solid fa-film"></i>
                                {movie.title}
                            </span>
                            <span className='flex gap-1 justify-start items-center'>
                                <i className="fa-regular fa-clock"></i>
                                {`${movie.runtime} minutos`}
                            </span>
                        </div>
                        <MovieFooter initial={initialQuantity} submitText='¡Comprar entradas!' onAdd={submitScreening} movieId={movie.id} selectedScreeningId={initialScreeningId} />
                    </div>

                    <button className="cartCard-deleteBtn btn btn-primary" onClick={clearTicket}>
                        <span>Eliminar</span>
                        <span><i className="fa-solid fa-trash"></i></span>
                    </button>
                </div>
                :
                <CinemaContainer continuar={submitSeats} cancelar={closeCinema} />
            }

            {openCreditCard &&
                <CreditCardContainer onSubmit={finishPurchase} onCancel={closeCreditCard} open={openCreditCard} />
            }

        </div>
    )
}
export default Ticket;
