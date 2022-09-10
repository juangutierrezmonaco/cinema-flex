import { useEffect, useState } from 'react';
import MovieDetailCount from './MovieDetailCount';


const MovieDetail = ({ id, title, backdrop_path, poster_path, overview, details,  }) => {
    /* Imagen */
    const imgUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;

    /* Trailer */
    const [videoUrl, setVideoUrl] = useState('');
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES`)
            .then(res => res.json())
            .then(data => {
                setVideoUrl(data.results.find(video => video.type == 'Trailer') || data.results[0]);
            })
            .catch(error => console.log(error));
        console.log(videoUrl)
    }, [])
    

    return (
        <div>
            <div>
                <h1>{title}</h1>

                <div>
                    <img src={imgUrl} alt={`Póster de la película - ${title}`} />
                    <div>
                        <p>{overview}</p>
                        <MovieDetailCount/>
                    </div>
                </div>

                <div>
                    <div>data</div>
                    <iframe src="https://www.youtube.com/embed/cWDJoK8zw58" />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default MovieDetail;