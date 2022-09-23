import { useEffect, useRef, useState } from 'react';
import MovieDetailFooter from '../MovieDetail/MovieDetailFooter';
import CartCinemaContainer from './CartCinemaContainer';
import movieNotFound from '/assets/img/movie-not-found.svg';
import functions from '../global/functions'

const Ticket = ({ movie, screeningId, quantity, ticketId, removeTicket, modifyTicket }) => {
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : movieNotFound;

    const clearMovie = () => {
        removeTicket(movie.id + screeningId);
    }

    const buyTickets = (screening, cantidad) => {
        
        setScreeningData({ funcion: screening, movie: movie, cantidad: cantidad });
        setOpen(true);
        /* modifyTicket(screeningId, movie, screening.id, cantidad); */
        // Verificaciones, si todo salio bien la borro
        /* removeTicket(movie.id + screeningId); */
    }

    const backdropPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    const [open, setOpen] = useState(false);
    const [screeningData, setScreeningData] = useState({});
    const ticketRef = useRef();
    const cancelar = () =>  setOpen(false);
    const continuar = () => { };

    useEffect(() => {
        functions.scrollTo('', ticketRef);
    }, [open])
    

    return (
        <div ref={ticketRef} className='w-full'>
            {!open ?
                <div className="cartCard">
                    <div className='cartCard-background'>
                        <div style={backgroundStyle}></div>
                    </div>

                    <figure className="cartCard-img"><img src={posterPath} alt={`Poster de la película ${movie.title}`} className={!movie.poster_path ? 'cartCard-img_notFound' : ''} /></figure>

                    <div className='cartCard-right'>

                        <div className='cartCard-right_top rounded-xl'>
                            <span className='font-semibold text-4xl underline mb-5'>{`Título: ${movie.title}`}</span>
                            <span className='text-2xl'>{`Duración: ${movie.runtime} minutos`}</span>
                            <span className="text-2xl italic">{`ID de la función: ${ticketId}`}</span>
                        </div>

                        <div className='cartCard-right_bottom'>
                            <MovieDetailFooter initial={quantity} submitText='Comprar entradas!' onAdd={buyTickets} movieId={movie.id} selectedScreeningId={screeningId} />
                        </div>
                    </div>

                    <button className="cartCard-deleteBtn btn" onClick={clearMovie}>Borrar</button>
                </div>
                :
                <CartCinemaContainer {...screeningData} cancelar={cancelar} continuar={continuar} />

            }
        </div>
    )
}
export default Ticket;
