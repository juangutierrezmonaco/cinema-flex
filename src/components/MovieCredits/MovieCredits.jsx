import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader';
import functions from '../global/functions';
import MovieCast from "./MovieCast";
import MovieCrew from "./MovieCrew";

const MovieCredits = () => {
    const [loading, setLoading] = useState(false);

    const { movieId } = useParams();
    const [credits, setCredits] = useState({});
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);

    const getCredits = () => {
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    useEffect(() => {
        functions.scrollTo('main');
        setLoading(true);
        getCredits()
            .then(res => {
                setCredits(res);
                setLoading(false);  
            })
            .catch((err) => console.log(err));
    }, []);    

    useEffect(() => {
        if (credits) {
            setCast(credits.cast);
            setCrew(credits.crew);
        }
    }, [credits])
    
    

    return (
        <div className="bg-white text-black px-36 py-10">
            {!loading ?
                <div className="flex">
                    <ul className=" w-1/2 ">
                        <div className="mb-10 flex items-center text-2xl gap-2">
                            <span className="font-bold">Reparto</span>
                            <span className="text-slate-600">{cast && cast.length}</span>
                        </div>

                        {cast && cast.map(c => (
                            <li key={c.credit_id}> 
                                <MovieCast {...c}/>
                            </li>
                        ))}
                    </ul>

                    <ul className=" w-1/2 ">
                        <div className="mb-10 flex items-center text-2xl gap-2">
                            <span className="font-bold">Equipo</span>
                            <span className="text-slate-600">{crew && crew.length}</span>
                        </div>
                        {crew && crew.map(c => (
                            <li key={c.credit_id}> 
                                <MovieCrew {...c}/>
                            </li>
                        ))}
                    </ul>
                </div>

                :

                <Loader />
            }
        </div>
    )
}

export default MovieCredits;