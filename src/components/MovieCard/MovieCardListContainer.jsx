import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import MovieCardList from './MovieCardList';

const MovieCardListContainer = ( {greeting} ) => {
    
    /* Me traigo los géneros para encontrar a este id qué nombre le pertenece */
    const [genres, setGenreS] = useState('');
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES`)
            .then(res => res.json())
            .then(data => {
                setGenreS(data.genres);
            })
            .catch(error => console.log(error));
    }, [])


    const [movieLists, setMovieLists] = useState();
    const [listTitles, setListTitles] = useState([]);
    
    const categoryId = useParams().categoryId || 'inicio';
    
    const getMovies = (time) => {
        let URLS = [];
        
        switch (categoryId) {
            case 'inicio':
                setListTitles(['Cartelera', 'Próximos estrenos']);
                URLS.push('https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&page=1&region=AR');
                URLS.push('https://api.themoviedb.org/3/movie/upcoming?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&page=1&region=AR');
                break;
            case 'cartelera':
                setListTitles(['Cartelera']);
                URLS.push('https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&page=1&region=AR');
                break;
            case 'estrenos':
                setListTitles(['Próximos estrenos']);
                URLS.push('https://api.themoviedb.org/3/movie/upcoming?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&page=1&region=AR');
                break;
            default:
                setListTitles([`${genres && genres.find(g => g.id == categoryId).name}`]);
                URLS.push(`https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&page=1with_genres=${categoryId}`);
                break;
        }

        /* Nota: Como a veces tengo que realizar múltiples consultas a la API en esta función resuelvo las promesas dinámicamente acorde a la cantidad de consultas que tenga que hacer, por lo cual, también acumulo todas las respuestas en una sola para devolverlas. */
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                Promise.all(
                    URLS.map((url) => fetch(url)
                        .then(res => res.json())
                        .then(res => res.results))
                )
                .then(data => resolve(data))
                .catch(err => reject(err));
            }, time);
        });
    }

    useEffect(() => {
        setMovieLists();
        getMovies(2000)
            .then(res => {
                setMovieLists(res);
            })
            .catch((err) => console.log(err));
    }, [categoryId]);

    /* Explicación: Como podemos tener varias peticiones, hice que haya varias listas de películas y está todo preparado para agregar más peticiones y que se sigan agregando más películas separas por listas. */
    return (
        <div className="movieCardContainer flex flex-col items-center lg:pt-4">
            <h1 className="text text-5xl uppercase"> {greeting} </h1>
            {   movieLists ? (
                    movieLists.map( (movieList, index) => (
                        <MovieCardList movies={movieList} listTitle={listTitles[index]} key={categoryId + index}/>)
                    )
                ) : 
                <Loader/>         
            }
        </div>
    )
}

export default MovieCardListContainer;