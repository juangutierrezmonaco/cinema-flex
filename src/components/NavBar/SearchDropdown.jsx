import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SearchDropdown = ({ searchTerm, close }) => {

    const [movies, setMovies] = useState();

    const getMovies = () => {
        const URLS = [
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&region=AR`,
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`,
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&region=AR`
        ];

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

    const isRelated = ( movie ) => {
        console.log(movie.title);
        return  movie.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
                movie.original_title.toUpperCase().includes(searchTerm.toUpperCase()) ||
                movie.overview.toUpperCase().includes(searchTerm.toUpperCase());
    }

    useEffect(() => {
        getMovies()
            .then(res => {
                const filteredMovies = res.flat().filter( m => isRelated(m) );
                setMovies(filteredMovies);
            })
            .catch((err) => console.log(err));
    }, [searchTerm]);

    return (
        <ul className="menu w-full mt-2 bg-base-100 text-black">
            {movies && movies.map( m => (
                <li key={m.id}>
                    <Link to={`movie/${m.id}`} onClick={close}>{m.title}</Link>
                </li>
            ))

            }
        </ul>
    )
}

export default SearchDropdown;