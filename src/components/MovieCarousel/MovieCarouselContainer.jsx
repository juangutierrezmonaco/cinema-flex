import MovieCarousel from "./MovieCarousel"
import MovieCarouselHeader from "./MovieCarouselHeader";

const MovieCarouselContainer = () => {
    const slides = [
        "https://image.tmdb.org/t/p/original//ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg",
        "https://image.tmdb.org/t/p/original//xVbppM1xgbskOKgOuV8fbWBWHtt.jpg",
        "https://image.tmdb.org/t/p/original//bqJXL8DRUIN6WsF86VB87pZZCOr.jpg",
        "https://image.tmdb.org/t/p/original//8TUb2U9GN3PonbXAQ1FBcJ4XeXu.jpg",
        "https://image.tmdb.org/t/p/original//92PJmMopfy64VYjd0HvIQaHGZX0.jpg",
    ]

    return (
        <div className="movieCarousel-container">
            <MovieCarousel slides={slides} controls header autoPlay={false} titulo={'Películas'}/>
        </div>
    )
}

export default MovieCarouselContainer;