const MovieCarouselIndicators = ({ slides, currentIndex, switchIndex }) => {
    const indicatorsClass = `movieCarousel-indicator-item btn-circle h-2 w-2 xs:h-3 xs:w-3 md:h-4 md:w-4`;

    return (
        <div className="movieCarousel-indicators">
            {slides.map((_, index) => (
                <button 
                    key={index}
                    className={`${indicatorsClass} ${currentIndex == index ? 'item-active' : ''}`}
                    onClick={() => switchIndex(index)} 
                ></button>
            ))}
        </div>
    )
}

export default MovieCarouselIndicators;