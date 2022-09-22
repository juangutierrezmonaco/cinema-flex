import { useState, useEffect } from "react";


const UserWidget = ({ btnStyles }) => {
    const [userOptions, setUserOptions] = useState(['Registrarse', 'Ingresar']);
    const isLogged = false;
    useEffect(() => {
        isLogged && setUserOptions(['Mi perfil', 'Mis entradas', 'Salir']);
    }, [])
    

    return (
        <div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className={btnStyles}>
                    <button><i className="fa-regular fa-user"></i></button>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black">
                    { userOptions && userOptions.map((opt, index) => (
                        <li key={index}> <a> {opt} </a> </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserWidget;