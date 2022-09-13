import MovieCarouselIndicators from "./MovieCarouselIndicators";

const MovieCarouselHeader = ({ slides, currentSlide, switchIndex, titulo }) => {
  return (
    <div className="flex flex-col md:gap-3 flex-wrap mb-2 md:flex-row md:justify-between md:items-center text-xl md:text-2xl lg:text-xl">
        <h2 className="uppercase">{titulo}</h2>
        <MovieCarouselIndicators slides={slides} currentIndex={currentSlide} switchIndex={switchIndex}/>
    </div>
  )
}

export default MovieCarouselHeader;