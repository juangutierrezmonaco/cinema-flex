import RegistrationForm from "./RegistrationForm"
import LoginForm from './LoginForm';
import { useUser } from "../../context/UserContext"

const UserFormContainer = ({ closeForm, open, wichForm }) => {

    const { createUser, login } = useUser();
    
    return (
        <div className='w-full flex justify-center px-32 absolute top-0'>
            <input type="checkbox" id="userFormModal" className="modal-toggle" checked={open} onChange={() => { }} />
            <div className="modal">

                <div className="modal-box creditCardContainer rounded">
                    {wichForm == 'Registrarse' ?
                        <RegistrationForm onSubmit={createUser} close={closeForm}>
                            <label htmlFor="userFormModal" className="btn btn-circle btn-outline" onClick={closeForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </label>
                        </RegistrationForm>
                        :
                        <LoginForm onSubmit={login} close={closeForm}>
                            <label htmlFor="userFormModal" className="btn btn-circle btn-outline" onClick={closeForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </label>
                        </LoginForm>
                    }
                </div>

            </div>

        </div>
    )
}
export default UserFormContainer