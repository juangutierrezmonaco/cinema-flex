const MovieDetailActor = ({ name, character, profile_path }) => {
    const image = `https://image.tmdb.org/t/p/original/${profile_path}`;

    return (
        <div className="movieDetailActor rounded-lg shadow-2xl">
            <figure className="movieDetailActor-img"><img src={image} alt={`Foto del actor ${name}`} /></figure>

            <div className="movieDetailActor-body text-center rounded-t-2xl">
                <span className="font-semibold ">{name}</span>
                <span className="text-thin">{character}</span>
            </div>
        </div>
    )
}

export default MovieDetailActor;