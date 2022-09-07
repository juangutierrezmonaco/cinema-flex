import MovieCarousel from "./MovieCarousel"
import MovieCarouselHeader from "./MovieCarouselHeader";

const MovieCarouselContainer = () => {
    const slides = [
        "https://picsum.photos/id/1032/1400/400",
        "https://picsum.photos/id/1033/1400/400",
        "https://picsum.photos/id/1037/1400/400",
        "https://picsum.photos/id/1035/1400/400",
        "https://picsum.photos/id/1036/1400/400",
    ]

    return (
        <div className="movieCarousel-container">
            <MovieCarouselHeader/>
            <MovieCarousel slides={slides} controls indicators autoPlay={false}/>
        </div>
    )
}

export default MovieCarouselContainer;