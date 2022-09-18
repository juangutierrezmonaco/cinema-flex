import notFound from '/assets/img/person-not-found.svg';

const MovieDetailActor = ({ name, profile_path }) => {
    
    const image = profile_path ? `https://image.tmdb.org/t/p/original/${profile_path}` : notFound;

    return (
        <div className="movieDetailActor rounded-lg shadow-2xl">
            <figure className="movieDetailActor-img"><img src={image} alt={`Foto del actor ${name}`} /></figure>

            <div className="movieDetailActor-body text-center rounded-t-2xl">
                <span className="font-semibold ">{name}</span>
            </div>
        </div>
    )
}

export default MovieDetailActor;