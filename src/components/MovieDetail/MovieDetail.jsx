import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

import MovieDetailActor from './MovieDetailActor';
import MovieDetailFooter from "./MovieDetailFooter";

const MovieDetail = ({ id, title, tagline, poster_path, backdrop_path, overview, runtime, release_date, genres, release_dates,       production_countries, credits }) => {
    
    // Imagenes
    const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    // Si no lo hago con hooks para usar el useEffect surgen errores.

    const [rate, setRate] = useState('SIN DATOS');
    const [director, setDirector] = useState('SIN DATOS');
    const [cast, setCast] = useState([]);
    const [nacionality, setNacionality] = useState('SIN DATOS')

    useEffect(() => {
        setRate( release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'US') || release_dates.results[0]).release_dates[0].certification)

        setDirector(credits && credits.crew.filter( c => c.job == 'Director')[0].name);

        /* En cuánto al cast filtro los primeros 13 */
        setCast(credits && credits.cast.slice(0, 13));

        setNacionality(production_countries && production_countries.length > 0 && production_countries[0].name);

    }, []);

    // Fecha de estreno y nacionalidad
    const releaseDate = (new Date( release_date + 'T00:00' )).toLocaleDateString();

    // Manejo de carrito
    const { addMovie } = useCart();

    const addToCart = (cantidad, screeningInfo) => {
        const movie = {id, title, runtime, poster_path, backdrop_path};
        addMovie(movie, screeningInfo, cantidad);
    }

    return (
        <div className='my-20 container'>
            <article className="movieDetailCard">
                <div className='movieDetailCard-header'>
                    <div className='movieDetailCard-header_background' style={backgroundStyle}></div>
                </div>

                <div className='movieDetailCard-body'>
                    <div className='movieDetailCard-body_left'>
                        <button className='movieDetailCard-body_left_poster'>
                            <img src={posterPath} alt={`Póster de la película ${title}`} />

                            <p className='movieDetailCard-body_left_poster_overlay text-3xl'>
                                <span className='uppercase'>Ver trailer</span>
                                <i className="fa-solid fa-circle-play text-6xl"></i>
                            </p>
                        </button>

                        <ul className='movieDetailCard-body_left_details tracking-wider text-base '>
                            <li>
                                <span className='underline'>Fecha de estreno</span>
                                <span> {releaseDate}</span>
                            </li>
                            <li>
                                <span className='underline'>Director</span>
                                <span> {director}</span>
                            </li>
                            <li>
                                <span className='underline'>Nacionalidad</span>
                                <span> {nacionality}</span>
                            </li>
                            <li>
                                <span className='underline'>Calificación</span>
                                <span> {rate}</span>
                            </li>
                            <li>
                                <span className='underline'>Duración</span>
                                <span> {`${runtime} Minutos`}</span>
                            </li>
                        </ul>
                    </div>

                    <div className='movieDetailCard-body_right'>
                        <div className='movieDetailCard-body_right_titles rounded-lg'>
                            <h1 className=''>{title}</h1>
                            <h2 className='italic font-thin'>{tagline}</h2>
                        </div>
                        
                        <ul className='movieDetailCard-body_right_genres'>
                            {genres && genres.map((g) => (
                                <li className='badge badge-lg' key={g.id}>{g.name}</li>
                            ))}
                        </ul>


                        <p className='tracking-wider text-base flex flex-col gap-2'>
                            <span className='text-2xl lg:text-4xl'>Sinopsis</span>
                            <span className='text-lg lg:text-xl'>{overview}</span>
                        </p>

                        <div className='movieDetailCard-body_right_cast'>
                            <h3 className='text-3xl font-semibold  tracking-wider'>Reparto principal</h3>
                            <ul className='movieDetailCard-body_right_cast_actors'>
                                {cast && cast.map(actor => (
                                    <li key={actor.id}><MovieDetailActor {...actor}/></li>
                                ))}

                                
                                <li >
                                    <Link to='./credits' className='flex flex-col text-center justify-center text-2xl font-bold'>
                                        <span>Ver más</span>
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="movieDetailCard-body_bottom">
                        <MovieDetailFooter onAdd={addToCart} submitText='Aregar a mis entradas' movieId={id}/>
                    </div>
                </div>
            </article>
        </div>
    )
}
export default MovieDetail;