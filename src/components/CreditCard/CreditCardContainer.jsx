import CreditCard from './CreditCard'

const CreditCardContainer = ({ onSubmit }) => {
  return (
    <div className='w-full '>
        <div className='w-full flex justify-center'>
            <CreditCard onSubmit={onSubmit}/>
        </div>
    </div>
  )
}
export default CreditCardContainer