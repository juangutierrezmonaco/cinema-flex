import { NavLink } from "react-router-dom";

const GenerosDropdown = ({ genres, close }) => {
    return (
        <ul className="menu dropdown-content p-2 bg-white text-black ">
            {genres.length > 0 ? (
                genres.map(g =>
                    <li key={g.id} onClick={close}>
                        <NavLink to={`./category/${g.id}`}>{g.name}</NavLink>
                    </li>
                )
            ) : (
                <button className="btn rounded-none text-black bg-white loading pointer-events-none"></button>
            )}
        </ul>
    )
}

export default GenerosDropdown;