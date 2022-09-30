import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../../context/UserContext'
import UserFormContainer from "../UserForm/UserFormContainer";

const UserWidget = ({ btnStyles }) => {
    const { isLogged, logout, userWidgetRef, user } = useUser();
    const [openForm, setOpenForm] = useState(false);
    const [wichForm, setWichForm] = useState();

    const seeForm = (e) => {
        setWichForm(e.target.innerText);
        setOpenForm(true);
    }

    const closeForm = () => {
        setOpenForm(false);
    }

    const closeDropDown = (e) => {
        e.target.blur();
    }
    
    return (
        <div>
            {openForm && <UserFormContainer open={openForm} closeForm={closeForm} wichForm={wichForm}/>}
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className={btnStyles} ref={userWidgetRef}>
                    <button><i className="fa-regular fa-user"></i></button>
                </label>

                {isLogged ?
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black font-albert font-semibold">
                        <li className="text-lg text-center btn btn-primary pointer-events-none">{user.firstName}</li>
                        <li onClick={closeDropDown}> <Link to={'/user/tickets'} className='text-lg'> Mis tickets </Link> </li>
                        <li onClick={closeDropDown}> <button onClick={logout} className='text-lg'> Salir </button> </li>
                    </ul>
                    :
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black font-albert font-semibold">
                        <li onClick={closeDropDown}> <button onClick={seeForm} className='text-lg'> Registrarse </button> </li>
                        <li onClick={closeDropDown}> <button onClick={seeForm} className='text-lg'> Ingresar </button> </li>
                    </ul>

                }

            </div>
        </div>
    )
}

export default UserWidget;