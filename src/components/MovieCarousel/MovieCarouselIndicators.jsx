const MovieCarouselIndicators = ({ slides, currentIndex, switchIndex }) => {
    const indicatorsClass = `movieCarousel-indicator-item h-7 w-7 md:h-10 md:w-10 lg`;

    return (
        <div className="">
            {slides.map((_, index) => (
                <button 
                    key={index}
                    className={`${indicatorsClass} ${currentIndex == index ? 'item-active' : ''}`}
                    onClick={() => switchIndex(index)} 
                >{index + 1}</button>
            ))}
        </div>
    )
}

export default MovieCarouselIndicators;