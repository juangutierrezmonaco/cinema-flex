import { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel"

const MovieCarouselContainer = () => {
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-AR`)
        .then(res => res.json())
        .then(data => {
            setSlides(data.results.slice(0,15));
        })
        .catch(err => console.log(err));
    }, [])
    

    return (
        <div>
            {slides && slides.length > 0 &&
                <MovieCarousel slides={slides} controls indicators/>
            }            
        </div>
    )
}

export default MovieCarouselContainer;