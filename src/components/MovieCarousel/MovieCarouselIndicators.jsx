const MovieCarouselIndicators = ({ slides, currentIndex, switchIndex }) => {
    const indicatorsClass = `movieCarousel-indicator-item btn-circle h-4 w-4 `;

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