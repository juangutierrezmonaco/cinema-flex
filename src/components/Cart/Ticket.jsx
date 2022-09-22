import MovieDetailFooter from '../MovieDetail/MovieDetailFooter';
import movieNotFound from '/assets/img/movie-not-found.svg';

const Ticket = ({ movie, screeningId, quantity, ticketId, removeTicket }) => {
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : movieNotFound;

    const clearMovie = () => {
        removeTicket(movie.id + screeningId);
    }

    const buyTickets = (screeningId, cantidad) => {
        alert('Simulación de proceso de compra.');
        // Verificaciones, si todo salio bien la borro
        removeTicket(movie.id + screeningId);
    }

    const backdropPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    return (
        <div className="cartCard">
            <div className='cartCard-background'>
                <div style={backgroundStyle}></div>
            </div>

            <figure className="cartCard-img"><img src={posterPath} alt={`Poster de la película ${movie.title}`} className={!movie.poster_path ? 'cartCard-img_notFound' : ''}/></figure>

            <div className='cartCard-right'>

                <div className='cartCard-right_top rounded-xl'>
                    <span className='font-semibold text-4xl underline mb-5'>{`Título: ${movie.title}`}</span>
                    <span className='text-2xl'>{`Duración: ${movie.runtime} minutos`}</span>
                    <span className="text-2xl italic">{`ID de la función: ${ticketId}`}</span>
                </div>

                <div className='cartCard-right_bottom'>
                    <MovieDetailFooter initial={quantity} submitText='Comprar entradas!' onAdd={buyTickets} movieId={movie.id} selectedScreeningId={screeningId}/>
                </div>
            </div>
                
            <button className="cartCard-deleteBtn btn" onClick={clearMovie}>Borrar</button>
        </div>
    )
}
export default Ticket;
