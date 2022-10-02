import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieNotFound from '/assets/img/movie-not-found.svg'

const MovieCard = ({ title, overview, poster_path, id, release_date, start, end, listTitle }) => {

    /* Es estreno ? */
    const [esEstreno, setEstreno] = useState(false);
    useEffect(() => {
        /* Como los estrenos se actualizan los jueves, para saber si es estreno reviso si la fecha de estreno cae adentro del jueves pasado y el jueves que viene */
        let releaseDate = new Date(release_date + 'T00:00');
        releaseDate.setHours(0, 0, 0, 0);

        if (releaseDate.getTime() >= start.getTime() && releaseDate.getTime() < end.getTime()) {
            setEstreno(true);
        }
    }, [])

    // Traigo algunos detalles que no estaban
    const [details, setDetails] = useState('');

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES&append_to_response=credits,release_dates`)
            .then(res => res.json())
            .then(data => {

                const director = data.credits.crew.find(c => c.job == 'Director').name;
                const actores = data.credits.cast.map(c => c.name);

                // Traigo de USA la clasificación porque de Argentina no hay mucho, si no hay de USA trae la primera que se encuentra
                const releaseDatesUS = data.release_dates.results.find(rD => rD.iso_3166_1 == 'US');
                const releaseDates = data.release_dates.results[0];
                const certification = (releaseDatesUS || releaseDates).release_dates[0].certification;

                setDetails({ ...data, 'director': director, 'cast': actores, 'rate': certification });
            })
            .catch(error => console.log(error));
    }, [])

    const { runtime, genres, director, cast } = details;

    /* Imagen */
    const imgUrl = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : movieNotFound;

    return (
        <div className="movieCard">
            <div className="movieCard_img">
                <img src={imgUrl} alt={`Afiche de la película '${title}'`} className={!poster_path ? 'movieCard_img_notFound' : ''} />
            </div>

            <div className="movieCard_info">

                {esEstreno && !listTitle.includes('Próximos estrenos') &&
                    <ul className="movieCard_info__premiere rounded font-bold uppercase ">
                        <li><i className="fa-solid fa-star"></i></li>
                        <li className="flex"><span className="text-center">Estreno de la semana</span></li>
                        <li><i className="fa-solid fa-star"></i></li>
                    </ul>
                }

                <h2 className="movieCard_info__title uppercase">{title}</h2>

                <div className="movieCard_info__review">
                    {/* <p className="hidden md:flex">{overview ? (overview.length <= 372 ? overview : overview.slice(0, 372) + '...') : 'No hay información sobre la sinopsis de esta película.'}</p>
                    <p className="flex md:hidden">{overview ? (overview.length <= 150 ? overview : overview.slice(0, 150) + '...') : 'No hay información sobre la sinopsis de esta película.'}</p> */}
                    <p className="">{overview ? (overview.length <= 200 ? overview : overview.slice(0, 200) + '...') : 'No hay información sobre la sinopsis de esta película.'}</p>
                </div>

                <div>
                    <hr className="mb-1"></hr>
                    <ul className="movieCard_info__details uppercase">
                        <li className={details && runtime ? '' : "hidden"}>Duración: {`${details && runtime} min`}</li>
                        <li className=""> Género: {genres && genres[0] && genres[0].name} </li>
                    </ul>
                    <hr className="mt-1"></hr>
                </div>

            </div>


            <ul className="movieCard_extraInfo uppercase">

                <li className="movieCard_extraInfo_item">

                    <ul className="">
                        <li><i className="fa-solid fa-film"></i></li>
                        <li>{director && director}</li>
                    </ul>

                    <ul className="">
                        <li><i className="fa-solid fa-star"></i></li>
                        <li><p>{cast && cast.map(actor => actor).slice(0, 3).join(', ') + (cast.length > 4 && '...')}</p></li>
                    </ul>

                    <ul className="">
                        <li><i className="fa-solid fa-user-group"></i></li>
                        <li className="uppercase">{details.rate || 'Sin info'}</li>
                    </ul>
                </li>

                <Link to={`/movie/${id}`}>
                    <button className="btn btn-sm btn-primary rounded uppercase movieCard_extraInfo_verFicha">Ver ficha completa</button>
                </Link>


            </ul>

        </div>
    )
}

export default MovieCard;