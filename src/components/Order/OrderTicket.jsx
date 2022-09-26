import { usePurchase } from "../../context/PurchaseContext";

const OrderTicket = () => {

    const { order } = usePurchase();
    const { screening, movie, cantidad, precio, seatsNumbers } = order;
    console.log(order);

    return (
        <div className="orderTicket">
            <div className="orderTicket_card orderTicket_cardLeft">
                <h2 className="uppercase orderTicket_cardLeft-brand">Cinemaflex</h2>
                <div className="orderTicket_cardLef-title">
                    <h2> {movie.title} </h2>
                    <span>Película</span>
                </div>
                {/* <div className="name">
                        <h2>Vladimir Kudinov</h2>
                        <span>name</span>
                    </div> */}
                <div className="orderTicket_cardLeft-seats">
                    <h2>{seatsNumbers.join(', ')}</h2>
                    <span>Asientos</span>
                </div>
                <div className="orderTicket_cardLeft-time">
                    <h2>12:00</h2>
                    <span>time</span>
                </div>

            </div>
            <div className="orderTicket_card orderTicket_cardRight">
                <div className="orderTicket_cardRight-eye"></div>
                <div className="orderTicket_cardRight-number">
                    <h3>156</h3>
                    <span>seat</span>
                </div>
                <div className="orderTicket_cardRight-barcode"></div>
            </div>

        </div>
    )
}

export default OrderTicket;