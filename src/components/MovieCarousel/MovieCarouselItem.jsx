import { Link } from "react-router-dom";

const MovieCarouselItem = ({ slide, stopSlide, startSlide }) => {
    return (
        <Link to={`./movie/${slide.id}`} className="movieCarousel-item" onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <img src={slide.img} alt={`Película - ${slide.titulo}`} />
            <div className="movieCarousel-item-desc text-xs pr-2 py-2 sm:text-2xl sm:py-4 sm:pr-5 lg:text-3xl lg:py-6 lg:pr-14">
                <h3 className="uppercase whitespace-normal text-right">{slide.titulo}</h3>
                <span className="uppercase">Más info</span>
            </div>
        </Link>
    )
}

export default MovieCarouselItem;