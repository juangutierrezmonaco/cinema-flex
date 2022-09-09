import { Link } from "react-router-dom";

const MovieCard = ({ title, sinopsis, img, genero, duracion, id, estreno = true }) => {
    return (
        <div className="movieCard grid grid-cols-[1fr_3fr_1fr]">
            <div className="movieCard_img">
                <img src={img} alt={`Afiche de la película '${title}'`}/>
            </div>

            <div className="movieCard_info p-10">

                <h2 className="movieCard_info__title uppercase text-4xl">{title}</h2>

                <div className="movieCard_info__details text-sm">
                    <ul>
                        <li>{duracion}</li>
                        <li>{genero}</li>
                    </ul>
                </div>

                <div className="movieCard_info__review text-sm">
                    <p>{sinopsis}</p>
                </div>

                {   estreno &&
                    <ul className="movieCard_info__premiere flex gap-2 text-xs items-center uppercase font-semibold p-4">
                        <li><i className="fa-solid fa-star"></i></li>
                            <li><span>Estreno de la semana</span></li>
                        <li><i className="fa-solid fa-star"></i></li>
                    </ul> 
                }               
            </div>

            

            <ul className="movieCard_extraInfo uppercase flex flex-col items-center justify-between">
                <li className="flex flex-col gap-5">
                    <ul className="flex gap-5 items-start">
                        <li><i className="fa-solid fa-film"></i></li>
                        <li>Juan Gutierrez</li>
                    </ul>

                    <ul className="flex gap-5 items-start">
                        <li><i className="fa-solid fa-star"></i></li>
                        <li><p>carlos clacla, alfonso clacla, carla clacla</p></li>
                    </ul>
                    
                    <ul className="flex gap-5 items-start">
                        <li><i className="fa-solid fa-user-group"></i></li>
                        <li className="uppercase">pg-13</li>
                    </ul>
                </li>

                <li><Link to={`./movie/${id}`} className="btn">Ver ficha completa</Link></li>
            </ul>
            
        </div>
    )
}

export default MovieCard;