import CountDown from './CountDown'
import CreditCard from './CreditCard'

const CreditCardContainer = ({ onSubmit, onCancel, open }) => {
    const closeOnClickOutside = (e) => {
        e.target.classList.contains('modal') && onCancel();

    }

    return (
        <div className='w-full flex justify-center px-32'>
            <input type="checkbox" id="creditCardModal" className="modal-toggle" checked={open} onChange={() => { }} />
            <div className="modal" onClick={closeOnClickOutside}>
                <div className="modal-box creditCardContainer rounded">
                    <CreditCard onSubmit={onSubmit} >
                        <label htmlFor="creditCardModal" className="btn btn-circle btn-outline" onClick={onCancel}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </label>
                        <CountDown close={onCancel} />
                    </CreditCard>
                </div>

            </div>

        </div>
    )
}

export default CreditCardContainer