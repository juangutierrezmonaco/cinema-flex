import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import moviesData from '../../movies.json'

const ItemListContainer = ( {greeting} ) => {
    const [movies, setMovies] = useState([]);

    const getMovies = (data, time) => 
        new Promise( (resolve, reject) => {
            setTimeout( () => {
                data ? resolve(data) : reject("Error con la solicitud de las películas.");
            }, time);
        });

    useEffect(() => {
        getMovies(moviesData, 3000)
            .then(res => {
                setMovies(res);
            })
            .catch((err) => console.log(err));
    }, [])
    

    return (
        <div className="itemListContainer pl-8">
            <h1 className="text-4xl"> {greeting} </h1>
            <ItemList movies={movies}/>    
        </div>
    )
}

export default ItemListContainer;