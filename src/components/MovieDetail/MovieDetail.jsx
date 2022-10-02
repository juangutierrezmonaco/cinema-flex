import { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";

import MovieFooter from "../MovieFooter/MovieFooter";
import MovieDetailActorList from "./MovieDetailActorList";
import movieNotFound from '/assets/img/movie-not-found.svg';
import MovieDetailTrailer from "./MovieDetailTrailer";

const MovieDetail = ({ id, title, tagline, poster_path, backdrop_path, overview, runtime, genres, release_dates, production_countries, credits, videos }) => {

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
    const [trailerPath, setTrailerPath] = useState('');

    useEffect(() => {
        /* Busco la fecha de estreno en Argentina, si no la consigo agarro la que viene por default */
        const r_date = new Date(release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'AR') || release_dates.results[0]).release_dates[0].release_date);
        r_date.setDate(r_date.getDate() + 1);
        r_date != 'Invalid Date' && setReleaseDate(r_date.toLocaleDateString());

        /* Uso la certificación de Estados Unidos porque para Argetina no hay mucha información (La API no funciona bien con Argentina) */
        const rate = release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'US') || release_dates.results[0]).release_dates[0].certification;
        rate && setRate(rate)

        const director = credits && credits.crew.filter(c => c.job == 'Director')[0];
        director && director.name && setDirector(director.name);

        const cast = credits && credits.cast;
        cast && setCast(cast);

        const nacionality = production_countries && production_countries.length > 0 && production_countries[0].name;
        nacionality && setNacionality(nacionality);

        // Para el trailer traigo primero el de Mexico y sino el de España. Si no trajo ninguno, pongo el trailer en inglés.
        const trailerPath = videos && (videos.results.filter(v => v.iso_3166_1 == 'MX')[0] ||
                            videos.results.filter(v => v.iso_3166_1 == 'ES')[0] || videos && videos.results.filter(v => v.type == 'Trailer')[0]);

        trailerPath && setTrailerPath(trailerPath.key);
    }, []);

    // Manejo de carrito
    const { addTicket } = useCart();

    const addToCart = ( screening, cantidad ) => {
        flyToCart();
        
        setTimeout(() => {
            const movie = { id, title, runtime, poster_path, backdrop_path };
            addTicket(movie, screening.id, cantidad);
        }, 2000);
    }

    // Efecto de que la película vuela al carrito
    const imgRef = useRef();
    const movieCardRef = useRef();
    const { cartWidgetRef } = useCart();

    const flyToCart = (e) => {
        setTimeout(() => {
            // Setteo al carrito la clase active para que se corra el carrito
            cartWidgetRef.current.classList.add('cartWidget_active');
        }, 1300);

        // Hago una copia del elemento imagen y lo agrego al movieDetail
        let flyingImg = imgRef.current.cloneNode();
        flyingImg.classList.add('flyingImg');
        movieCardRef.current.appendChild(flyingImg);

        // Encuentro las posiciones
        const flyingImg_pos = flyingImg.getBoundingClientRect();
        const cartWidget_pos = cartWidgetRef.current.getBoundingClientRect();
        let data = {
            left: cartWidget_pos.left - (cartWidget_pos.width / 2 + flyingImg_pos.left + flyingImg_pos.width / 2),
            bottom: flyingImg_pos.bottom - flyingImg_pos.width + cartWidget_pos.bottom / 2,
        }

        flyingImg.style.cssText = `
            --left: ${data.left.toFixed(2)}px;
            --bottom: ${data.bottom.toFixed(2)}px;
        `

        setTimeout(() => {
            movieCardRef.current && movieCardRef.current.removeChild(flyingImg);
            cartWidgetRef.current && cartWidgetRef.current.classList.remove('cartWidget_active');
            cartWidgetRef.current && cartWidgetRef.current.classList.add('cartWidget_shakeCount');
        }, 2000);

        setTimeout(() => {
            cartWidgetRef.current.classList.remove('cartWidget_shakeCount');
        }, 2500);
    }

    return (
        <div>
            <article className="movieDetailCard" ref={movieCardRef} >
                <div className='movieDetailCard-header'>
                    <div className='movieDetailCard-header_background' style={backgroundStyle}></div>
                </div>

                <div className='movieDetailCard-body'>
                    <div className='movieDetailCard-body_left'>

                        <button className='movieDetailCard-body_left_poster'>
                            <img src={posterPath} alt={`Póster de la película ${title}`} className={!poster_path ? 'movieDetailCard-body_left_poster_notFound' : ''} ref={imgRef} />

                            <MovieDetailTrailer trailerPath={trailerPath} />
                        </button>

                        <ul className='movieDetailCard-body_left_details tracking-wider font-quicksand'>
                            <li>
                                <span className='underline  font-semibold'>Fecha de estreno</span>
                                <span className='font-[500]'> {releaseDate}</span>
                            </li>
                            <li>
                                <span className='underline  font-semibold'>Director</span>
                                <span className='font-[500]'> {director}</span>
                            </li>
                            <li>
                                <span className='underline  font-semibold'>Nacionalidad</span>
                                <span className='font-[500]'> {nacionality}</span>
                            </li>
                            <li>
                                <span className='underline  font-semibold'>Calificación</span>
                                <span className='font-[500]'> {rate}</span>
                            </li>
                            <li>
                                <span className='underline font-semibold'>Duración</span>
                                <span className='font-[500]'>{runtime ? `${runtime} Minutos` : 'SIN DATOS'}</span>
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


                        <p className='tracking-wider text-base flex flex-col gap-2 min-h-[200px]'>
                            <span className='text-2xl lg:text-4xl'>Sinopsis</span>
                            <span className='text-lg lg:text-xl'>{overview || 'Sin datos sobre la sinopsis de esta película'}</span>
                        </p>

                        <div className='movieDetailCard-body_right_cast'>
                            <h3 className='text-3xl font-semibold  tracking-wider'>Reparto principal</h3>

                            <MovieDetailActorList cast={cast} />
                        </div>
                    </div>

                    <div className="movieDetailCard-body_bottom">
                        <MovieFooter onAdd={addToCart} submitText='Agregar a mis entradas' movieId={id} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default MovieDetail;