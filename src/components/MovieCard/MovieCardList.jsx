import MovieCard from './MovieCard';
import Loader from '../Loader/Loader';

const MovieCardList = ({ movies }) => {
    /* Esto es para saber las fechas limite de estreno */
    let start = new Date();
    while ( start.getDay() !== 4 ) start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setDate(start.getDate() + 7);    

    return (
        <ul>
            {movies.length ? (
                movies.map( m => 
                    <li key={m.id} className="mb-10">
                        <MovieCard {...m} start={start} end={end}/>
                    </li>
                )
            ) : (
                <Loader/>
            )}
        </ul>  
    )
}

export default MovieCardList;