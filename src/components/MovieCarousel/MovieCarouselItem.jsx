const MovieCarouselItem = ({ slide, stopSlide, startSlide }) => {
    return (
        <div className="movieCarousel-item" onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <img src={slide.img} alt="" />
            <div className="movieCarousel-item-desc">
                <h3 className="uppercase">{slide.titulo}</h3>
                <span className="uppercase">Más info</span>
            </div>
        </div>
    )
}

export default MovieCarouselItem;