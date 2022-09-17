const Ticket = ({ movie, quantity }) => {
    const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="w-1/4"><img src={posterPath} alt={`Poster de la película ${movie.title}`} className=' w-full' /></figure>
            <div className="card-body text-black">
                <h2 className="card-title">{movie.title}</h2>
                <p>{`Seleccionadas: ${quantity}`}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Comprar entradas</button>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Ticket;
