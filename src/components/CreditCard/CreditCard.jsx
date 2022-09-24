import { useEffect, useState } from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const CreditCard = () => {
    const thisYear = new Date().getFullYear();

    const [state, setState] = useState({
        number: '',
        name: '',
        expiry: '',
        expiryyear: '',
        cvc: '',
        focused: ''
    });

    const { number, name, expiry, expiryyear, cvc, focused } = state;

    /*function to remove special characters like + - . e E 
    which are otherwise valid in case of type=number used in case  of cvc*/
    const removeSpecial = (e) => {
        const invalidChars = ["-", "+", "e", "E", " ", "."];
        invalidChars.includes(e.key) && e.preventDefault();;
    };

    //function to add space after every 4 character in card number
    const addSpace = (e) => {
        const { value } = e.target;
        if (value.length === 4 || value.length === 9 || value.length === 14) {
            e.target.value = value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
        }
    };

    //function to validate the length of input in case of cvv and replace invalid characters in case of card number
    const validateInput = (e) => {
        const { name, value, maxLength, id } = e.target;
        
        if (id === 'cvc') { // Truncate the number  
            const num = value.slice(0, maxLength);            
            setState(prevState => ({ ...prevState, [name]: num }));
        } else {            // Remove incalid charactes
            const validValue = value.replace(
                /[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g,
                ""
            );
            setState(prevState => ({ ...prevState, [name]: validValue }));
        }
    };

    //function to handle focus on input
    const handleInputFocus = ({ target }) => {
        setState(prevState => ({ ...prevState, focus: target.name }));
    };

    //function to handle  input and update the state of variable
    const handleInputChange = (e) => {
        const { name, id, value } = e.target;

        if (id === "cardHolder") {
            //if user enters any invalid characters it gets replaced
            e.target.value = value.replace(
                /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
                ""
            );
        }

        setState(prevState => ({ ...prevState, [name]: e.target.value }));
    };
    
    const submit = (e) => {
        // GUARDAR 
        /* sessionStorage.setItem("user", JSON.stringify(this.state)); */
        e.preventDefault();

        //restoring initial state of the app
        setState({
            name: "",
            number: "",
            cvc: "",
            expiry: "",
            expiryyear: "",
            focus: ""
        });
    };

    return (
        <div className='bg-white w-1/2 flex flex-col gap-5 py-10'>
            <div>
                <Card
                    locale={{ valid: "Expira" }}
                    placeholders={{ name: "NOMBRE COMPLETO" }}
                    cvc={cvc}
                    expiry={expiry}
                    expiryyear={expiryyear}
                    focused={focused}
                    name={name}
                    number={number}
                />
            </div>

            <div className=' text-black w-full flex justify-center'>
                <form className='flex flex-col gap-3 w-4/5'>

                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Número de la tarjeta</span>
                        </label>

                        <input
                            type="tel"
                            onChange={validateInput}
                            value={number}
                            onKeyDown={removeSpecial}
                            onPaste={(e) => e.preventDefault()}
                            onKeyPress={addSpace}
                            onFocus={handleInputFocus}
                            name="number"
                            maxLength="19"
                            id="cardNumber"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nombre</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            spellCheck="false"
                            value={name}
                            maxLength="20"
                            autoComplete="off"
                            onPaste={(e) => e.preventDefault()}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            id="cardHolder"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="flex gap-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Fecha de expiración</span>
                            </label>

                            <div className='w-full flex justify-between gap-3'>
                                <select
                                    id="cardMonth"
                                    data-ref="cardDate"
                                    value={expiry}
                                    name="expiry"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    className="select select-bordered"
                                >
                                    <option value="" defaultChecked="true" disabled>
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
                                    id="cardYear"
                                    data-ref="cardDate"
                                    value={expiryyear}
                                    name="expiryyear"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    className="select select-bordered"
                                >
                                    <option value="" defaultChecked="true" disabled>
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">CVC</span>
                            </label>

                            <input
                                type="tel"
                                onChange={validateInput}
                                onKeyDown={removeSpecial}
                                onPaste={(e) => e.preventDefault()}
                                onFocus={handleInputFocus}
                                name="cvc"
                                id="cvc"
                                value={cvc}
                                className="input input-bordered w-full"
                                maxLength="4"
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-lg btn-block"
                        onClick={submit}
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}
export default CreditCard