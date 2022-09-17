import MovieDetailFooter from '../MovieDetail/MovieDetailFooter'

const Ticket = ({ movie, quantity, screeningId, screeningInfo, removeMovie }) => {
    const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    const sala =  screeningInfo.slice(0, 1);
    const dia = screeningInfo.slice(1, 2);
    const horario = screeningInfo.slice(2, 3);

    const clearMovie = () => {
        removeMovie(screeningId);
    }

    return (
        <div className="cartCard">
            <figure className="cartCard-img"><img src={posterPath} alt={`Poster de la película ${movie.title}`}/></figure>
            <div className='cartCard-right'>

                <div className='cartCard-right_top'>
                    <span className='font-semibold text-4xl underline mb-5'>{`Título: ${movie.title}`}</span>
                    <span className='text-2xl'>{`Duración: ${movie.runtime} minutos`}</span>
                    <span className="text-2xl italic">{`ID de la función: ${screeningId}`}</span>
                </div>

                <div className='cartCard-right_bottom'>
                    <MovieDetailFooter initial={quantity} submitText='Comprar entradas!' movieId={movie.id} defaultSalaIndex={sala} defaultDiaIndex={dia} delfaultHorarioIndex={horario}/>
                </div>
            </div>
                
            <button className="cartCard-deleteBtn btn" onClick={clearMovie}>Borrar</button>
        </div>
    )
}
export default Ticket;
