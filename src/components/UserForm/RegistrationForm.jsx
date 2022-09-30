import { useState } from "react";
import Swal from "sweetalert2";

const RegistrationForm = ({ onSubmit, close, children }) => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'registrarionName':
                setFirstName(value);
                break;
            case 'registrarionLastName':
                setLastName(value);
                break;
            case 'registrarionEmail':
                setEmail(value);
                break;
            case 'registrarionPassword':
                setPassword(value);
                break;
            case 'registrarionPasswordConfirm':
                setConfirmPassword(value);
                break;
        }
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const submitRegistration = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            Toast.fire({
                icon: 'error',
                title: 'Las contraseñas deben coincidir!'
            })
        } else {
            const user = {
                firstName,
                lastName,
                email,
                password,
                orders: []
            }

            onSubmit(user, close);
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center sm:justify-center">
                <div className="flex justify-between w-full">
                    <h3 className="text-4xl font-bold text-slate-900  ">
                        Registro
                    </h3>
                    {children}
                </div>

                <form className="w-full flex flex-col gap-3 items-center px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg text-black" onSubmit={submitRegistration}>
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="registrarionName" className="label block text-sm font-medium text-gray-700 undefined">
                            <span className="label-text">Nombre</span>
                        </label>

                        <input type="text" name="registrarionName" className="input input-sm input-bordered w-full max-w-xs" autoComplete="given-name" required onChange={handleInputChange} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="registrarionLastName" className="label block text-sm font-medium text-gray-700 undefined">
                            <span className="label-text">Apellido</span>
                        </label>

                        <input type="text" name="registrarionLastName" className="input input-sm input-bordered w-full max-w-xs" autoComplete="family-name" required onChange={handleInputChange} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="registrarionEmail" className="label block text-sm font-medium text-gray-700 undefined">
                            Email
                        </label>

                        <input type="email" name="registrarionEmail" className="input input-sm input-bordered w-full max-w-xs" autoComplete="email" required onChange={handleInputChange} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="registrarionPassword" className="label block text-sm font-medium text-gray-700 undefined">
                            Contraseña
                        </label>

                        <input type="password" name="registrarionPassword" className="input input-sm input-bordered w-full max-w-xs" required onChange={handleInputChange} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="registrarionPasswordConfirm" className="label block text-sm font-medium text-gray-700 undefined">
                            Confirmar contraseña
                        </label>

                        <input type="password" name="registrarionPasswordConfirm" className="input input-sm input-bordered w-full max-w-xs" required onChange={handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-wide font-semibold tracking-widest text-white uppercase mt-6">Registrase</button>

                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;