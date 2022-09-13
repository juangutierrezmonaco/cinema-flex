import { useState, useEffect } from "react";
import MovieCount from './MovieCount';

const MovieDetail = ({id, title, tagline, poster_path, backdrop_path, overview, genres, release_dates}) => {
    // Imagenes
    const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const background = `
        .movieDetail-card__container__top::before {
                background-image: url(${backdropPath});
        }`
    
    const [rate, setRate] = useState();
    useEffect(() => {
        // Certificación
        setRate( release_dates && (release_dates.results.find(rD => rD.iso_3166_1 == 'US') || release_dates.results[0]).release_dates[0].certification)
    }, []);

    // Manejo de carrito
    const addToCart = (cantidad) => {
        const word = cantidad == 1 ? "entrada" : "entradas";
        alert(`Agregaste ${cantidad} ${word} al carrito!`)
    }

    return (
        <div className="movieDetail-card">
            <div className="movieDetail-card__container">       

                <div className="movieDetail-card__container__poster ">
                    <img src={posterPath} alt={`Poster de la película - ${title}`}/>
                </div>        

                <div>
                    <div className="movieDetail-card__container__top">
                        <div className="movieDetail-card__container__top__fondo"></div>
                        <style>{background}</style>
                        <div className="details rounded-lg ">
                            <div className="title1">{title}</div>
                            <div className="title2 italic">{tagline}</div>  
                            <span className="rate">{rate}</span>           
                        </div> 
                    </div>
                </div>
                
                <div className="movieDetail-card__container__bottom">
                    
                    <div className="genres">
                        {genres && genres.map((g) => (
                            <span key={g.id}>{g.name}</span>
                        ))}
                    </div> 
                    
                    <div className="details">
                        <p className="details__overview">{overview}</p>
                    </div> 
                </div> 

                <div className="absolute right-40 bottom-40">
                    <MovieCount stock="10" initial="1" onAdd={addToCart}/>
                </div>
            </div> 
        </div> 
    )
}
export default MovieDetail