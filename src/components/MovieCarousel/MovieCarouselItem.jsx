const MovieCarouselItem = ({ slide, stopSlide, startSlide }) => {
    return (
        <div className="movieCarousel-item" onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <img src={slide} alt="" />
        </div>
    )
}

export default MovieCarouselItem;