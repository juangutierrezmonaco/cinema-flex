import { useRef } from "react";
import { Link } from "react-router-dom";
import MovieDetailActor from "./MovieDetailActor";

const MovieDetailActorList = ({ cast, length }) => {
    const castList = cast.slice(0, length);
    const ref = useRef();

    const scrollHorizontal = (e) => {
        // Lógica para mantener apretado shift en el hover
    }

    return (
        <ul className='movieDetailCard-body_right_cast_actors' onMouseOver={scrollHorizontal} ref={ref}>
            {castList && castList.map(actor => (
                <li key={actor.id}><MovieDetailActor {...actor} /></li>
            ))}


            <li >
                <Link to='./credits' className='flex flex-col text-center justify-center text-2xl font-bold'>
                    <span>Ver más</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </li>
        </ul>
    )
}

export default MovieDetailActorList;