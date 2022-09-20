import { useEffect, useRef } from "react";

const MovieDetailTrailer = ({ trailerPath }) => {
    const videoUrl = `https://www.youtube-nocookie.com/embed/${trailerPath}`;

    const videoRef = useRef();

    const toggle = (e) => {
        // Lo hago así ya que tengo un input y para no abusar de los useState.
        e.target.value = e.target.value == 'off' ? 'on' : 'off';
        if (e.target.value == 'on') {
            videoRef.current.src = '';
        } else {
            videoRef.current.src = videoUrl;
        }
    }
    

    return (
        <div>
            <label className='movieDetailCard-body_left_poster_overlay text-3xl' htmlFor="my-modal-4" >
                <span className='uppercase'>Ver trailer</span>
                <i className="fa-solid fa-circle-play text-6xl"></i>
            </label>

            <input type="checkbox" id="my-modal-4" className="modal-toggle" onChange={toggle}/>

            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <iframe src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className=" w-4/5 lg:w-3/5 aspect-video" ref={videoRef}></iframe>
            </label>
        </div>
    )
}

export default MovieDetailTrailer;