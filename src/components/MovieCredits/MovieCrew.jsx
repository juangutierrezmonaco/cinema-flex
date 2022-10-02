import personNotFound from '/assets/img/person-not-found.svg';

const MovieCrew = ({ name, profile_path, job }) => {
    const profilePath = profile_path ? `https://image.tmdb.org/t/p/original/${profile_path}` : personNotFound;

    return (
        <div className="flex gap-5 items-center mb-5">
            <div className='avatar'>
                <div className='w-10 sm:w-20 rounded'>
                    <img src={profilePath} alt={`Foto de ${name}`} />
                </div>
            </div>

            <div className='flex flex-col text-xs sm:text-lg '>
                <span className='font-bold'>{name}</span>
                <span className='font-normal'>{job}</span>
            </div>
        </div>
    )
}

export default MovieCrew;