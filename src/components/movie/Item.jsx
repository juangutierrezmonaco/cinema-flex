import { useState, useEffect } from 'react'
import ItemCount from './ItemCount'

const Item = ({title, sinopsis, img, genero, duracion}) => {
    const addToCart = (cantidad) => {
        const word = cantidad == 1 ? "entrada" : "entradas";
        alert(`Agregaste ${cantidad} ${word} al carrito!`)
    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl item">
            <figure><img src={img} alt={`Poster - ${title}`}/></figure>
            <div className="card-body">
                <h2 className="card-title uppercase">{title}</h2>
                <p>{sinopsis}</p>
                <span>{`Género: ${genero} // Duración: ${duracion}`}</span>


                <div className="card-actions justify-end">
                    <ItemCount stock="10" initial="1" onAdd={addToCart}/>
                </div>
            </div>
        </div>
    )
}

export default Item