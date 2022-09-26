import { useRef, useState } from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { v4 as uuidv4 } from 'uuid';

import {
    formatCreditCardNumber,
    formatName,
    formatCVC,
    createData
} from './CreditCardUtils';

const CreditCard = ({ onSubmit }) => {
    const thisYear = new Date().getFullYear();

    const [formData, setFormData] = useState();
    const [state, setState] = useState({
        number: '',
        name: '',
        expiry: '',
        expiryyear: '',
        cvc: '',
        focused: '',
        issuer: ''
    });

    const formRef = useRef();

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setState(prevState => ({ ...prevState, issuer: issuer }));
        }
    };

    const handleInputFocus = ({ target }) => {
        setState(prevState => ({ ...prevState, focused: target.name }));
    };

    const handleInputChange = ({ target }) => {
        switch (target.name) {
            case 'number':
                target.value = formatCreditCardNumber(target.value);
                break;
            case 'name':
                target.value = formatName(target.value);
                break;
            case 'cvc':
                target.value = formatCVC(target.value);
                break;
        }

        setState(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { issuer } = state;

        if (issuer) {
            const submitButton = e.nativeEvent.submitter;
            submitButton.innerText = 'Verificando pago';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-warning', 'loading');
            
            setTimeout(() => {                
                submitButton.innerText = 'Pago exitoso!';
                submitButton.classList.remove('btn-warning', 'loading');
                submitButton.classList.add('btn-success')
            }, 2000);

            setTimeout(() => {
                
                const id = uuidv4();
                onSubmit({ paymentStatus: 'success', paymentId: id });

                setFormData(state);
                formRef.current.reset();
                setState({
                    number: '',
                    name: '',
                    expiry: '',
                    expiryyear: '',
                    cvc: '',
                    focused: '',
                    issuer: ''
                });
            }, 2500);
        } else {
            onSubmit({ paymentStatus: 'rejected', errorDetail: 'Tarjeta inválida' });
        }
    };

    const autoComplete = () => {
        const genericData = createData();
        setState(prevState => ({
            ...prevState,
            ...genericData
        }));
    }

    const { number, name, expiry, expiryyear, cvc, focused } = state;

    return (
        <div className='flex flex-col items-center gap-5 py-10 creditCard'>
            <div>
                <Card
                    locale={{ valid: "Expira" }}
                    placeholders={{ name: "NOMBRE COMPLETO" }}
                    cvc={cvc}
                    expiry={expiry + expiryyear}
                    focused={focused}
                    name={name}
                    number={number}
                    callback={handleCallback}
                />
            </div>

            <div className=' text-black w-full flex justify-center'>
                <form className='flex flex-col gap-3 w-full' ref={formRef} onSubmit={handleSubmit} >

                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Número de la tarjeta</span>
                        </label>

                        <input
                            className="input input-bordered w-full"
                            type="tel"
                            name="number"
                            pattern="[\d| ]{16,22}"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onPaste={(e) => e.preventDefault()}
                            value={number}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nombre</span>
                        </label>

                        <input
                            className="input input-bordered w-full"
                            type="text"
                            name="name"
                            autoComplete="off"
                            onPaste={(e) => e.preventDefault()}
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            value={name}
                        />
                    </div>

                    <div className="flex justify-between">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Fecha de expiración</span>
                            </label>

                            <div className='w-full flex justify-between gap-3'>
                                <select
                                    className="select select-bordered w-1/2"
                                    name="expiry"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    value={expiry}
                                >
                                    <option value="" disabled>
                                        Mes
                                    </option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>

                                <select
                                    className="select select-bordered w-1/2"
                                    name="expiryyear"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    value={expiryyear}
                                >
                                    <option value="" disabled>
                                        Año
                                    </option>
                                    <option value={thisYear}>{thisYear}</option>
                                    <option value={thisYear + 1}>{thisYear + 1}</option>
                                    <option value={thisYear + 2}>{thisYear + 2}</option>
                                    <option value={thisYear + 3}>{thisYear + 3}</option>
                                    <option value={thisYear + 4}>{thisYear + 4}</option>
                                    <option value={thisYear + 5}>{thisYear + 5}</option>
                                    <option value={thisYear + 6}>{thisYear + 6}</option>
                                    <option value={thisYear + 7}>{thisYear + 7}</option>
                                    <option value={thisYear + 8}>{thisYear + 8}</option>
                                    <option value={thisYear + 9}>{thisYear + 9}</option>
                                    <option value={thisYear + 10}>{thisYear + 10}</option>
                                    <option value={thisYear + 11}>{thisYear + 11}</option>
                                </select>

                            </div>
                        </div>

                        <div className="form-control w-2/5">
                            <label className="label">
                                <span className="label-text">CVC</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="tel"
                                name="cvc"
                                pattern="\d{3,4}"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                onPaste={(e) => e.preventDefault()}
                                value={cvc}
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary btn-lg btn-block" type='submit'> Submit </button>
                </form>
            </div>

            <button className="badge badge-lg p-5" onClick={autoComplete}> Autocompletar </button>
        </div>
    )
}
export default CreditCard