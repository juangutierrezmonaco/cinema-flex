import { useRef } from "react";
import { Link } from "react-router-dom";
import MovieDetailActor from "./MovieDetailActor";

const MovieDetailActorList = ({ cast, length = 13 }) => {
    const castList = cast.slice(0, length);
    const ref = useRef();

    return (
        <ul className='movieDetailCard-body_right_cast_actors' ref={ref}>
            {castList && castList.slice(0, 5).map(actor => (
                <li key={actor.id}><MovieDetailActor {...actor} /></li>
            ))}


            <li>
                <Link to='./credits' className='movieDetailCard-body_right_cast_actors-seeMore text-xs xxs:text-sm md:text-base rounded'>
                    <span>Ver todos</span>
                    <span><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
            </li>
        </ul>
    )
}

export default MovieDetailActorList;