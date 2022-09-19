import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

import MovieDetailFooter from "./MovieDetailFooter";
import MovieDetailActorList from "./MovieDetailActorList";
import movieNotFound from '/assets/img/movie-not-found.svg';

const MovieDetail = ({ id, title, tagline, poster_path, backdrop_path, overview, runtime, genres, release_dates, production_countries, credits }) => {
    
    // Imagenes
    const posterPath = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : movieNotFound;
    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    // Si no lo hago con hooks para usar el useEffect surgen errores.
    // NOTA: No uso el release_date que viene de la api porque viene por defecto la fecha de estados unidos, así tengo más control.
    const [rate, setRate] = useState('SIN DATOS');
    const [releaseDate, setReleaseDate] = useState('SIN DATOS');
    const [director, setDirector] = useState('SIN DATOS');
    const [cast, setCast] = useState([]);
    const [nacionality, setNacionality] = useState('SIN DATOS');

    useEffect(() => {
        /* Busco la fecha de estreno en Argentina, si no la consigo agarro la que viene por default */
        const r_date = new Date(release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'AR') || release_dates.results[0]).release_dates[0].release_date);
        r_date.setDate(r_date.getDate() + 1);
        r_date != 'Invalid Date' && setReleaseDate(r_date.toLocaleDateString());
        
        /* Uso la certificación de Estados Unidos porque para Argetina no hay mucha información (La API no funciona bien con Argentina) */
        setRate( release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'US') || release_dates.results[0]).release_dates[0].certification)

        setDirector(credits && credits.crew.filter( c => c.job == 'Director')[0].name);

        setCast(credits && credits.cast);

        setNacionality(production_countries && production_countries.length > 0 && production_countries[0].name);

    }, []);

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
                            <img src={posterPath} alt={`Póster de la película ${title}`} className={!poster_path ? 'movieDetailCard-body_left_poster_notFound' : ''}/>

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

                            <MovieDetailActorList cast={cast} length={13} />
                        </div>
                    </div>

                    <div className="movieDetailCard-body_bottom">
                        <MovieDetailFooter onAdd={addToCart} submitText='Agregar a mis entradas' movieId={id}/>
                    </div>
                </div>
            </article>
        </div>
    )
}
export default MovieDetail;