import { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel"

const MovieCarouselContainer = () => {
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-AR`)
        .then(res => res.json())
        .then(data => {
            setSlides(data.results);
        })
        .catch(err => console.log(err));
    }, [])
    

    return (
        <div>
            {slides && slides.length > 0 && <div className="movieCarousel-container lg:px-40">
                <MovieCarousel slides={slides} controls header titulo={'Películas'}/>
            </div>}            
        </div>
    )
}

export default MovieCarouselContainer;