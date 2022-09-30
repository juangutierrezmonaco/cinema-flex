import { useRef } from "react";
import { Link } from "react-router-dom";
import MovieDetailActor from "./MovieDetailActor";

const MovieDetailActorList = ({ cast, length = 13 }) => {
    const castList = cast.slice(0, length);
    const ref = useRef();

    const scrollHorizontal = (e) => {
        // Lógica para mantener apretado shift en el hover
    }

    return (
        <ul className='movieDetailCard-body_right_cast_actors' onMouseOver={scrollHorizontal} ref={ref}>
            {castList && castList.slice(0, 4).map(actor => (
                <li key={actor.id}><MovieDetailActor {...actor} /></li>
            ))}


            <li>
                <Link to='./credits' className='movieDetailCard-body_right_cast_actors-seeMore text-lg rounded'>
                    <span>Ver todos</span>
                    <span><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
            </li>
        </ul>
    )
}

export default MovieDetailActorList;