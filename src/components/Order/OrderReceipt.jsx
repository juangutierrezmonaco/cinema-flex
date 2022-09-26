import { usePurchase } from "../../context/PurchaseContext"
import Barcode from 'react-barcode';

const OrderReceipt = () => {
    const { order } = usePurchase();
    const { paymentId } = order;
    
    return (
        <div>
            <Barcode value={paymentId} />;
        </div>
    )
}
export default OrderReceipt