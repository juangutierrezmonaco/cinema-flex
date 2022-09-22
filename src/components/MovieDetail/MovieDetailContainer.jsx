import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader';
import MovieDetail from './MovieDetail';
import functions from '../global/functions';

const MovieDetailContainer = () => {
    const [loading, setLoading] = useState(false);

    const { movieId } = useParams();
    const [movie, setMovie] = useState();

    const getMovie = () => {
        return new Promise( (resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&region=AR&append_to_response=release_dates,credits,videos&include_video_language=es-MX,es-ES,en`)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    useEffect(() => {
        functions.scrollTo('main');
        setLoading(true);
        getMovie()
            .then(res => {
                setMovie(res);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [movieId]);

    return (
       <div>
            {!loading ? <MovieDetail {...movie}/> : <Loader/>}
       </div>
    )
}

export default MovieDetailContainer;