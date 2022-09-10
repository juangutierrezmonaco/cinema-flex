import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCardList from './MovieCardList';

const MovieCardListContainer = ( {greeting} ) => {
    const [movies, setMovies] = useState([]);

    const getMovies = (time) => {
        /* const categoryId = useParams(); */
        

        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&page=1&region=AR')
                    .then(res => res.json())
                    .then(data => resolve(data.results))
                    .catch(error => reject(error));
            }, time);
        });
    }

    useEffect(() => {
        getMovies(2000)
            .then(res => {
                setMovies(res);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="movieCardContainer flex flex-col items-center lg:pt-4">
            <h1 className="text text-5xl uppercase mb-12"> {greeting} </h1>
            <MovieCardList movies={movies}/>
        </div>
    )
}

export default MovieCardListContainer;