import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const UserTicket = ({ movie, funcion, precio, paymentId, codigoParaRetirar, id }) => {
    const { title } = movie;
    const { sala, tipo, lenguaje, horario, seatsNumbers } = funcion;

    const horarioDate = horario.toDate();
    const fecha = horarioDate.toLocaleDateString();
    const hora = horarioDate.getHours() + ':' + horarioDate.getMinutes();

    return (
        <div className="userTicket">
            <div className="userTicket_left text-2xl">
                <span className='userTicket_left-order'>{`ORDEN N°: #${id}`}</span>
                <div className='userTicket_left-items'>
                    <span> {`${sala} - ${tipo} (${lenguaje})`} </span>

                    <span>{title}</span>

                    <span>{`${fecha} - ${hora}`}</span>

                    <span>{`Butacas: ${seatsNumbers.join(', ')}`}</span>

                    <span>{`Total: $${precio}`}</span>
                </div>
            </div>

            <div className="userTicket_right">
                <span className='text-lg'>Código para retirar en el cine</span>
                <div className='userTicket_right-qrCode'>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={codigoParaRetirar}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>

            <div className="userTicket_bottom">
                <span className='userTicket_bottom-text uppercase text-2xl px-5'>Código de pago</span>
                <div className='userTicket_bottom-barcode'>
                    <Barcode
                        value={paymentId}
                        height={30}
                        width={1}
                        font='Staatliches'
                        fontSize={20}
                    />
                </div>
            </div>


        </div>
    )
}

export default UserTicket;