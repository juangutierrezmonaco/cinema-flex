import React, { useRef, useState } from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './CreditCardUtils';

const CreditCardContainer = () => {
    const [state, setState] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    });

    const formRef = useRef();

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setState({ issuer });
        }
    };

    const handleInputFocus = ({ target }) => {
        setState( prevState => ({...prevState, focused: target.name }));
    };

    const handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        setState( prevState => ({...prevState, [target.name]: target.value}) );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { issuer } = state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        setState({ formData });
        formRef.current.reset();
    };

    const { name, number, expiry, cvc, focused, issuer, formData } = state;

    return (
        <div key="Payment">
            <div className="App-payment bg-white flex flex-col items-center gap-5 py-5">
                <Card
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                    callback={handleCallback}
                />

                <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div>
                        <input
                            type="tel"
                            name="number"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Card Number"
                            pattern="[\d| ]{16,22}"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Name"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>

                    {/* <div>
                        <div className="col-6">
                            <input
                                type="tel"
                                name="expiry"
                                className="input input-bordered w-full max-w-xs"
                                placeholder="Valid Thru"
                                pattern="\d\d/\d\d"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="tel"
                                name="cvc"
                                className="input input-bordered w-full max-w-xs"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                    </div> */}
                    <input type="hidden" name="issuer" value={issuer} />
                    <div className="form-actions">
                        <button className="btn btn-primary btn-block">PAY</button>
                    </div>
                </form>
                {formData && (
                    <div className="App-highlight">
                        {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreditCardContainer;
