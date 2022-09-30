import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SearchDropdown = ({ searchTerm, close }) => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const getMovies = () => {
        const URLS = [
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&region=AR`,
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`,
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`,
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&region=AR`
        ];

        /* Nota: Como a veces tengo que realizar múltiples consultas a la API en esta función resuelvo las promesas dinámicamente acorde a la cantidad de consultas que tenga que hacer, por lo cual, también acumulo todas las respuestas en una sola para devolverlas. */
        return new Promise((resolve, reject) => {
            Promise.all(
                URLS.map((url) => fetch(url)
                    .then(res => res.json())
                    .then(res => res.results))
            )
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    const RemoveDuplicates = (array, key) => {
        return array.reduce((arr, item) => {
            const removed = arr.filter(i => i[key] !== item[key]);
            return [...removed, item];
        }, []);
    }

    useEffect(() => {
        getMovies()
            .then(res => {
                // Como traigo de 4 consultas distintas para traer todo, elimino los duplicados
                const moviesWithoutDups = RemoveDuplicates(res.flat(), 'id');
                setMovies(moviesWithoutDups);
            })
            .catch((err) => console.log(err));
    }, []);

    const isRelated = (movie) => {
        return movie.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
            movie.original_title.toUpperCase().includes(searchTerm.toUpperCase());
    };

    useEffect(() => {
        if (movies.length > 0) {
            setLoading(true);
            const filteredMovies = movies.filter(m => isRelated(m));
            setFilteredMovies(filteredMovies);
            setLoading(false);
        }
    }, [movies, searchTerm]);


    return (
        <div className="search-dropdown">
            <ul className="dropdown-content menu w-full mt-2 font-albert">
                {!loading ?
                    filteredMovies.length != 0 ? filteredMovies.map(m => (
                        <li key={m.id}>
                            <Link to={`movie/${m.id}`} onClick={close}>{m.title}</Link>
                        </li>
                    )) :
                        <li className="btn rounded-none text-black bg-white pointer-events-none">Sin resultados</li>
                    :
                    <button className="btn rounded-none text-black bg-white loading pointer-events-none"></button>
                }
            </ul>
        </div>
    )
}

export default SearchDropdown;