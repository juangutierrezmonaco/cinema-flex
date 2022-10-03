import { useState } from "react";
import Swal from "sweetalert2";

const LoginForm = ({ onSubmit, close, children }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'loginEmail':
                setEmail(value);
                break;
            case 'loginPassword':
                setPassword(value);
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

    const submitLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        onSubmit(user, close);
    }

    return (
        <div>
            <div className="flex flex-col items-center sm:justify-center">
                <div className="flex justify-between w-full">
                    <h3 className="text-4xl font-bold text-slate-900  ">
                        Login
                    </h3>
                    {children}
                </div>

                <form className="w-full flex flex-col gap-3 items-center px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg text-black" onSubmit={submitLogin}>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="loginEmail" className="label block text-sm font-medium text-gray-700 undefined">
                            Email
                        </label>

                        <input type="email" name="loginEmail" className="input input-sm input-bordered w-full max-w-xs" autoComplete="email" required onChange={handleInputChange} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="loginPassword" className="label block text-sm font-medium text-gray-700 undefined">
                            Contraseña
                        </label>

                        <input type="password" name="loginPassword" className="input input-sm input-bordered w-full max-w-xs" autoComplete="current-password"  required onChange={handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-wide font-semibold tracking-widest text-white uppercase mt-6">Ingresar</button>

                </form>
            </div>
        </div>
    );
}

export default LoginForm;