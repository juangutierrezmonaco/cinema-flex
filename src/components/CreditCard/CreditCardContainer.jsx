import CreditCard from './CreditCard'

const CreditCardContainer = ({ onSubmit, onCancel, open }) => {    
    return (
        <div className='w-full flex justify-center px-32'>
            <input type="checkbox" id="creditCardModal" className="modal-toggle" checked={open} onChange={() => { }} />
            <div className="modal">

                <div className="modal-box creditCardContainer rounded">
                    <div className='text-center text-black text-3xl'>Complete los datos para finalizar su compra!</div>

                    <CreditCard onSubmit={onSubmit} />

                    <div className="modal-action m-0">
                        <label htmlFor="creditCardModal" className="btn btn-error" onClick={onCancel}>Volver</label>
                    </div>      
                </div>

            </div>

        </div>
    )
}

export default CreditCardContainer