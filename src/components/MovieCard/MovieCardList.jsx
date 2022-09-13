import MovieCard from './MovieCard';

const MovieCardList = ({ movies, listTitle }) => {
    /* Esto es para saber las fechas limite de estreno */
    let start = new Date();
    while ( start.getDay() !== 4 ) start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setDate(start.getDate() + 7);    

    return (
        <ul className='flex flex-col items-center'>
            <h2 className='text-center text-3xl p-5 underline'>{listTitle}</h2>
            {movies.length > 0 ? (
                movies.map( m => 
                    <li key={m.id} className="mb-10">
                        <MovieCard {...m} start={start} end={end}/>
                    </li>
                )
            ) : (
                <span>No se encontraron películas</span>
            )}
        </ul>  
    )
}

export default MovieCardList;