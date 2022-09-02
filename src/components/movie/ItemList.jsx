import Item from "./Item"
import Loader from "../Loader"

const ItemList = ( {movies} ) => {
  return (
    <ul>
        {movies.length ?
            movies.map( m => 
                <li key={m.id} className="mb-6">
                    <Item {...m}/>
                </li>
            ) : 
            <Loader/>
        }
    </ul>  
  )
}

export default ItemList