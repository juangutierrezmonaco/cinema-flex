import { useRef, useState, useEffect } from "react";
import MovieCarouselItem from "./MovieCarouselItem"
import MovieCarouselControls from "./MovieCarouselControls";
import MovieCarouselHeader from "./MovieCarouselHeader";

const MovieCarousel = ({ slides, interval = 3000, controls = false, header = false, autoPlay = true, width = '100%', height = '400px', titulo = ''}) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slideInterval = useRef();

    const handlePrev = () => {
        startSlideTimer();
        const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        setCurrentSlide(index);
    }

    const handleNext = () => {
        startSlideTimer();
        const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(index);
    }

    const switchIndex = (index) => {
        startSlideTimer();
        setCurrentSlide(index);
    }

    const startSlideTimer = () => {
        if (autoPlay) {
            stopSlideTimer();
            slideInterval.current = setInterval(() => {
                setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0)
            }, interval)
        }
    }

    const stopSlideTimer = () => {
        if (autoPlay && slideInterval.current) {
            clearInterval(slideInterval.current);
        }
    }

    useEffect(() => {
        startSlideTimer();    
        return () => stopSlideTimer();
    }, []);
    
    return (
        <div>
            {header && <MovieCarouselHeader slides={slides} currentSlide={currentSlide} switchIndex={switchIndex} titulo={titulo}/>}

            <div className="movieCarousel md:flex md:justify-center" style={{ 'maxWidth' : width, 'maxHeight' : height}}>
                <div 
                    className="movieCarousel-inner h-44 sm:h-64 md:h-auto"
                    style={{ transform: `translateX(${-currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <MovieCarouselItem slide={slide} key={index} stopSlide={stopSlideTimer} startSlide={startSlideTimer}/>
                    ))}
                </div>

                {controls && <MovieCarouselControls prev={handlePrev} next={handleNext}/>}
            </div>
        </div>
    )
}

export default MovieCarousel;