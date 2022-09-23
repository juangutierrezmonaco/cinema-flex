import personNotFound from '/assets/img/person-not-found.svg';

const MovieCast = ({ name, profile_path, character }) => {
    const profilePath = profile_path ? `https://image.tmdb.org/t/p/original/${profile_path}` : personNotFound;

    return (
        <div className="flex gap-5 items-center mb-5">
            <div className='avatar'>
                <div className='w-20 rounded'>
                    <img src={profilePath} alt={`Foto de ${name}`} />
                </div>
            </div>

            <div className='flex flex-col'>
                <span className='font-bold'>{name}</span>
                <span className='font-normal'>{character}</span>
            </div>
        </div>
    )
}

export default MovieCast;