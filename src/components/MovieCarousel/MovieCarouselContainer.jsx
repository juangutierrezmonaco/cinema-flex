import MovieCarousel from "./MovieCarousel"
import MovieCarouselHeader from "./MovieCarouselHeader";

const MovieCarouselContainer = () => {
    const slides = [
        {img: "https://image.tmdb.org/t/p/original//ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg", titulo: "Dragon Ball Super: Super Hero", id: 1},
        {img: "https://image.tmdb.org/t/p/original//bqJXL8DRUIN6WsF86VB87pZZCOr.jpg", titulo: "30 noches con mi ex", id: 2},
        {img: "https://image.tmdb.org/t/p/original//xVbppM1xgbskOKgOuV8fbWBWHtt.jpg", titulo: "¡Nop!", id: 3},
        {img: "https://image.tmdb.org/t/p/original//8TUb2U9GN3PonbXAQ1FBcJ4XeXu.jpg", titulo: "Bestia", id: 4},
        {img: "https://image.tmdb.org/t/p/original//92PJmMopfy64VYjd0HvIQaHGZX0.jpg", titulo: "El Perro Samurai: La Leyenda de Kakamucho", id: 5}
    ]

    return (
        <div className="movieCarousel-container lg:px-40">
            <MovieCarousel slides={slides} controls header titulo={'Películas'}/>
        </div>
    )
}

export default MovieCarouselContainer;