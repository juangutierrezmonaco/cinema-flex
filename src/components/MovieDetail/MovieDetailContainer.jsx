import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader'
import MovieDetail from './MovieDetail'

const MovieDetailContainer = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState();

    const getMovie = (time) => {
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES`)
                    .then(res => res.json())
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            }, time);
        });
    }

    useEffect(() => {
        getMovie(2000)
            .then(res => {
                setMovie(res);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
       <div>
            {movie ? <MovieDetail {...movie}/> : <Loader/>}
       </div>
    )
}

export default MovieDetailContainer;