import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import MovieCardList from './MovieCardList';
import functions from '../global/functions';

const MovieCardListContainer = ( {greeting} ) => {
    const categoryId = useParams().categoryId || 'inicio';

    const [loading, setLoading] = useState(false);
    const [movieLists, setMovieLists] = useState([]);
    const [listTitles, setListTitles] = useState([]);
    
    
    /* Me traigo los géneros para encontrar a este id qué nombre le pertenece por si estoy en algún género*/
    const [genre, setGenre] = useState('');
    useEffect(() => {
        if (categoryId != 'inicio') {
            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES`)
                .then(res => res.json())
                .then(data => {
                    setGenre(data.genres.find(g => g.id == categoryId).name);
                })
                .catch(error => console.log(error));
        }
    }, [])
    
    useEffect(() => {   // Nota: Esto es porque a veces la API tarda y si lo setteo acá sin el efecto nunca se actualiza cuando está la rta.
        setListTitles([`Cartelera - ${genre}`, `Próximos estrenos - ${genre}`]);
    }, [genre])
    
    const getMovies = () => {
        let URLS = [];
        
        switch (categoryId) {
            case 'inicio':
                setListTitles(['Cartelera', 'Próximos estrenos']);
                URLS.push(`https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&region=AR`);
                URLS.push(`https://api.themoviedb.org/3/movie/upcoming?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&region=AR`);
                break;
            case 'cartelera':
                setListTitles(['Cartelera']);
                URLS.push(`https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&region=AR`);
                break;
            case 'estrenos':
                setListTitles(['Próximos estrenos']);
                URLS.push(`https://api.themoviedb.org/3/movie/upcoming?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-E1&region=AR`);
                break;
            default:

                URLS.push(`https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&region=AR&with_genres=${categoryId}`);

                URLS.push(`https://api.themoviedb.org/3/movie/upcoming?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES&region=AR&with_genres=${categoryId}`);
                break;
        }

        /* Nota: Como a veces tengo que realizar múltiples consultas a la API en esta función resuelvo las promesas dinámicamente acorde a la cantidad de consultas que tenga que hacer, por lo cual, también acumulo todas las respuestas en una sola para devolverlas. */
        return new Promise( (resolve, reject) => {
            Promise.all(
                URLS.map((url) => fetch(url)
                    .then(res => res.json())
                    .then(res => res.results))
            )
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }

    useEffect(() => {
        categoryId != 'inicio' ? functions.scrollTo('main') : functions.scrollTo('body');
        setLoading(true);
        getMovies(0)
            .then(res => {
                setMovieLists(res);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [categoryId]);

    /* Explicación: Como podemos tener varias peticiones, hice que haya varias listas de películas y está todo preparado para agregar más peticiones y que se sigan agregando más películas separas por listas. */
    return (
        <div className="movieCardContainer flex flex-col items-center lg:pt-4">
            <h1 className="text text-5xl uppercase"> {greeting} </h1>
            {   !loading ? (
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