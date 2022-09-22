import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieNotFound from '/assets/img/movie-not-found.svg'

const MovieCard = ({ title, overview, poster_path, id, release_date, start, end }) => {
    
    /* Es estreno ? */
    const [esEstreno, setEstreno] = useState(false);
    useEffect(() => {
        /* Como los estrenos se actualizan los jueves, para saber si es estreno reviso si la fecha de estreno cae adentro del jueves pasado y el jueves que viene */
        let releaseDate = new Date(release_date + 'T00:00');
        releaseDate.setHours(0, 0, 0, 0);

        if (releaseDate.getTime() >= start.getTime() && releaseDate.getTime() < end.getTime()){
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
            
            setDetails({...data, 'director': director, 'cast': actores, 'rate': certification });
        });
    }, [])
    
    const { runtime, genres, director, cast} = details;
    
    /* Imagen */
    const imgUrl = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : movieNotFound;

    return (
        <div className="movieCard flex flex-wrap">
            <div className="movieCard_img w-2/5 xs:w-4/12 md:w-3/12 lg:w-3/12 xl:w-[20%]">
                <img src={imgUrl} alt={`Afiche de la película '${title}'`} className={!poster_path ? 'movieCard_img_notFound' : ''}/>
            </div>

            <div className="movieCard_info relative flex flex-col gap-1 w-3/5 pt-2 xxs:p-2 xs:w-8/12 md:w-6/12 mlg:pl-4 mlg:pt-3 lg:p-5 lg:gap-5 lg:w-6/12 xl:w-[55%] xl:p-10">

                <h2 className="movieCard_info__title uppercase text-sm pl-2 xxs:pl-0 md:tracking-widest md:text-xl mlg:text-3xl lg:text-4xl">{title}</h2>

                <div className="movieCard_info__details text-[.75rem] pl-2 xxs:pl-0 md:text-sm lg:text-xl">
                    <ul className="flex flex-wrap">
                        <li className={details && runtime ? '' : "hidden"}>{`${details && runtime } min`}</li>
                        <li className="hidden xxs:block">
                            <ul>
                                {genres && genres.length > 0 && genres.map(g => 
                                    <li key={g.id}>{g.name}</li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="movieCard_info__review hidden xxs:block xxs:text-xs md:tracking-tight md:text-sm mlg:text-sm mlg:tracking-wider lg:text-base">
                    <p>{overview.length <= 200 ? overview : overview.slice(0, 200) + '...'}</p>
                </div>

                {   esEstreno &&
                    <ul className="movieCard_info__premiere flex items-center gap-2 uppercase font-semibold w-full absolute bottom-0 left-0 p-2 z-20 text-[.75rem] xxs:py-4 md:w-fit md:left-auto md:bottom-5 md:right-10 ">
                        <li><i className="fa-solid fa-star"></i></li>
                        <li className="flex"><span className="text-center">Estreno de la semana</span></li>
                        <li><i className="fa-solid fa-star"></i></li>
                    </ul> 
                }     
                
                <Link to={`/movie/${id}`}>
                    <ul className="flex items-start justify-center gap-3 text-white p-2 uppercase text-[.65rem] absolute w-full h-full bg-[#9D0208] xxs:hidden mt-2">
                        <li>Ver ficha completa</li>
                        <li ><i className="fa-solid fa-plus"></i></li>
                    </ul> 
                </Link>
                
            </div>
            

            <ul className="movieCard_extraInfo uppercase hidden xxs:p-2 xxs:text-xs xxs:flex xxs:gap-5 xxs:items-center xxs:w-full md:w-3/12 md:flex-col md:justify-between md:p-5 md:pt-8 lg:text-base lg:w-3/12 xl:w-[25%]">

                <li className="hidden xxs:flex xxs:flex-col xxs:gap-1 xxs:w-3/5 md:w-full mlg:gap-3 lg:gap-5">

                    <ul className="xxs:flex xxs:gap-5 xxs:items-start">
                        <li><i className="fa-solid fa-film"></i></li>
                        <li>{director && director}</li>
                    </ul>

                    <ul className="xxs:flex xxs:gap-5 xxs:items-start">
                        <li><i className="fa-solid fa-star"></i></li>
                        <li><p>{cast && cast.map(actor => actor).slice(0,4).join(', ') + (cast.length > 4 && '...')}</p></li>
                    </ul>
                    
                    <ul className="xxs:flex xxs:gap-5 xxs:items-start">
                        <li><i className="fa-solid fa-user-group"></i></li>
                        <li className="uppercase">{details.rate || 'Sin info'}</li>
                    </ul>
                </li>

                <Link to={`/movie/${id}`}>
                    <li className="hidden xxs:block xxs:w-2/5 md:w-full">
                        <ul className="btn min-w-fit xxs:flex xxs:flex-nowrap xxs:p-5 gap-2">
                            <li>Ver ficha completa</li>
                            <li><i className="fa-solid fa-plus"></i></li>
                        </ul>
                    </li>
                </Link>

                
            </ul>
            
        </div>
    )
}

export default MovieCard;