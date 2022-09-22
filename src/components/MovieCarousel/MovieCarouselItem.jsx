import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieCarouselItem = ({ slide, stopSlide, startSlide }) => {/* 
    const imgUrl = ; */
    const [imgURL, setImgURL] = useState('');
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${slide.id}/images?api_key=892e5b21eccd8afb7c43b48a426ac1e1`)
            .then(res => res.json())
            .then(data => {
                setImgURL(data.backdrops.length > 0 ? data.backdrops[0].file_path : data.posters[0].file_path);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <Link to={`/movie/${slide.id}`} className="movieCarousel-item" onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <img src={`https://image.tmdb.org/t/p/original/${imgURL}`} alt={`Película - ${slide.title}`} />
            <div className="movieCarousel-item-desc text-xs pr-2 py-2 sm:text-2xl sm:py-4 sm:pr-5 lg:text-3xl lg:py-6 lg:pr-14">
                <h3 className="uppercase whitespace-normal text-right">{slide.title}</h3>
                <span className="uppercase">Más info</span>
            </div>
        </Link>
    )
}

export default MovieCarouselItem;