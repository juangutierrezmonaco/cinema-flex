import MovieCard from './MovieCard';
import Loader from '../Loader/Loader';

const MovieCardList = ({ movies }) => {
    return (
        <ul className=' xl:p-24'>
            {movies.length ? (
                movies.map( m => 
                    <li key={m.id} className="my-4">
                        <MovieCard {...m}/>
                    </li>
                )
            ) : (
                <Loader/>
            )}
        </ul>  
    )
}

export default MovieCardList;