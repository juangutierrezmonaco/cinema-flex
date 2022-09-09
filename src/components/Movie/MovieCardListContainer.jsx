import { useEffect, useState } from "react";
import moviesData from '../../movies.json';
import MovieCardList from './MovieCardList';

const MovieCardListContainer = ( {greeting} ) => {
    /* const API_PARAMS = {
        'URL': 'https://developers.themoviedb.org/3/movie',
        'API_KEY': '892e5b21eccd8afb7c43b48a426ac1e1',
        'LANGUAGE': 'ES',
        'REGION': 'AR'
    } */
    
    const [movies, setMovies] = useState([]);

    const getMovies = (data, time) => {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                data ? resolve(data) : reject("Error con la solicitud de las películas.");
            }, time);
        });
    }

    useEffect(() => {
        getMovies(moviesData, 3000)
            .then(res => {
                setMovies(res);
            })
            .catch((err) => console.log(err));
    }, []);
     

    return (
        <div className="movieCardContainer flex flex-col items-center lg:pt-4">
            <h1 className="text text-5xl uppercase "> {greeting} </h1>
            <MovieCardList movies={movies}/>
        </div>
    )
}

export default MovieCardListContainer;