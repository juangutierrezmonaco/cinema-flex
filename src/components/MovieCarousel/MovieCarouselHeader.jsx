import MovieCarouselIndicators from "./MovieCarouselIndicators";

const MovieCarouselHeader = ({ slides, currentSlide, switchIndex, titulo }) => {
  return (
    <div className="movieCarouselHeader">
        <h2 className="movieCarouselHeader uppercase text-3xl">{titulo}</h2>
        <MovieCarouselIndicators slides={slides} currentIndex={currentSlide} switchIndex={switchIndex}/>
    </div>
  )
}

export default MovieCarouselHeader;