import { useRef } from "react";
import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'
import UserFormContainer from "../UserForm/UserFormContainer";

const UserWidget = ({ btnStyles }) => {
    const { isLogged, logout } = useUser();
    const [openForm, setOpenForm] = useState(false);
    const [wichForm, setWichForm] = useState();

    const seeForm = (e) => {
        setWichForm(e.target.innerText);
        setOpenForm(true);
    }

    const closeForm = () => {
        setOpenForm(false);
    }    

    const userButtonRef = useRef();
    const closeDropDown = (e) => {
        e.target.blur();
    }
    return (
        <div>
            {openForm && <UserFormContainer open={openForm} closeForm={closeForm} wichForm={wichForm}/>}
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className={btnStyles} ref={userButtonRef}>
                    <button><i className="fa-regular fa-user"></i></button>
                </label>

                {isLogged ?
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black">
                        <li onClick={closeDropDown}> <button> Mis entradas </button> </li>
                        <li onClick={closeDropDown}> <button onClick={logout}> Salir </button> </li>
                    </ul>
                    :
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black">
                        <li onClick={closeDropDown}> <button onClick={seeForm}> Registrarse </button> </li>
                        <li onClick={closeDropDown}> <button onClick={seeForm}> Ingresar </button> </li>
                    </ul>

                }

            </div>
        </div>
    )
}

export default UserWidget;