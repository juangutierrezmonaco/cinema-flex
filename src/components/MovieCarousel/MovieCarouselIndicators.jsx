const MovieCarouselIndicators = ({ slides, currentIndex, switchIndex }) => {
    return (
        <div className="movieCarousel-indicators">
            {slides.map((_, index) => (
                <button 
                    key={index}
                    className={`movieCarousel-indicator-item ${currentIndex == index ? 'active' : ''}`}
                    onClick={() => switchIndex(index)} 
                >{index}</button>
            ))}
        </div>
    )
}

export default MovieCarouselIndicators;