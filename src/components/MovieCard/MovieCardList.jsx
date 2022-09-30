import MovieCard from './MovieCard';
import { useState } from 'react'
const MovieCardList = ({ movies, listTitle }) => {
    /* Esto es para saber las fechas limite de estreno */
    let start = new Date();
    while (start.getDay() !== 4) start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setDate(start.getDate() + 7);

    const [itemsToShow, setItemsToShow] = useState(5);
    const showMore = ({ target }) => {

        target.classList.add('loading');
        setTimeout(() => {
            if (itemsToShow < movies.length) {
                target.classList.remove('loading');
                setItemsToShow(prevState => movies.length >= prevState ? (prevState + 5) : movies.length);
            } else {
                target.innerText = 'No hay más películas para mostrar';
                target.classList.remove('loading');
                target.classList.add('pointer-events-none', 'btn-outline');
            }
        }, 1000);

    };    

    return (
        <div className='flex flex-col items-center font-bowlby mb-7 pb-10'>
            <h2 className="text text-4xl uppercase mb-14 underline ">{listTitle}</h2>
            <ul className='moviesCards'>
                {movies.slice(0, itemsToShow).map(m => (
                    <li key={m.id} className="mb-10 movieCardContainer">
                        <MovieCard {...m} start={start} end={end} listTitle={listTitle}/>
                    </li>
                ))}
            </ul>
            {movies.length != 0 && <button className='btn btn-warning' onClick={showMore}>Mostrar más</button>}

            {movies.length == 0 && <span>No se encontraron películas</span>}
        </div>
    )
}

export default MovieCardList;