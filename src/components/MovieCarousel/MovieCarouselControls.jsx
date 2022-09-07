const MovieCarouselControls = ({ prev, next}) => {
    return (
        <div>
            <button className="movieCarousel-control left" onClick={prev}> <i className="fa-solid fa-chevron-left"></i></button>
            <button className="movieCarousel-control right" onClick={next}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    )
}

export default MovieCarouselControls;