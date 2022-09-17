import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import MovieDetailActor from './MovieDetailActor';
import MovieCount from './MovieCount'
import MovieFunction from './MovieFunction';
import { Link, useParams } from "react-router-dom";

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

        setNacionality(production_countries && production_countries[0].name);

    }, []);

    // Fecha de estreno y nacionalidad
    const releaseDate = (new Date( release_date + 'T00:00' )).toLocaleDateString();

    const name = 'Daniel Kaluuya';
    const character = 'OJ Haywood';
    const profile_path = '/a07Tqzgp0IrW9YkcOQiuKavP4tm.jpg';

    // Manejo de carrito
    const { addMovie } = useCart();

    const addToCart = (cantidad) => {
        const movie = {id, title, poster_path, backdrop_path};
        addMovie(movie, cantidad);
    }

    // Créditos
    const ruta = useParams();
    useEffect(() => {
        console.log(ruta);
        console.log(credits);
    }, [ruta])
    

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

                        <ul className='movieDetailCard-body_left_details'>
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
                            <h1 className='text-4xl'>{title}</h1>
                            <h2 className='italic text-xl font-thin'>{tagline}</h2>
                        </div>
                        
                        <ul className='movieDetailCard-body_right_genres'>
                            {genres && genres.map((g) => (
                                <li className='badge badge-lg' key={g.id}>{g.name}</li>
                            ))}
                        </ul>


                        <p className='tracking-wider text-base flex flex-col gap-2 mt-10'>
                            <span className='text-2xl'>Sinopsis</span>
                            <span className='text-lg'>{overview}</span>
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

                    <div className='movieDetailCard-body_bottom'>
                        <div className='movieDetailCard-body_bottom_select'>
                            <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione la función</span>
                            <MovieFunction title='Elija la función' options={['Horario 1', 'Horario 2', 'Horario 3']}/>
                        </div>

                        <div className='movieDetailCard-body_bottom_select'>
                            <span className='uppercase font-extrabold text-xl tracking-wider'>Seleccione entradas</span>
                            <MovieCount stock={10} initial={1} onAdd={addToCart} submitText='Agregar a mis entradas' movieId={id}/>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
export default MovieDetail;