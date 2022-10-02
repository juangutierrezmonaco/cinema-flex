import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const UserTicket = ({ movie, funcion, precio, paymentId, codigoParaRetirar, id, fechaDeEmision }) => {
    const { title, poster_path, backdrop_path } = movie;
    const { sala, tipo, lenguaje, horario, seatsNumbers } = funcion;

    const horarioDate = horario.toDate();
    const fechaFuncion = horarioDate.toLocaleDateString();
    const horaFuncion = horarioDate.getHours() + ':' + horarioDate.getMinutes();

    const fechaPago = fechaDeEmision.toDate().toLocaleDateString();
    const horaPago = fechaDeEmision.toDate().getHours() + ':' + fechaDeEmision.toDate().getMinutes() + ':' + fechaDeEmision.toDate().getSeconds();

    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    return (
        <div className="userTicket">
            <div className="userTicket_left text-2xl">
                <div className='userTicket_left-background'>
                    <div style={backgroundStyle}></div>
                </div>

                <span className='userTicket_left-order'>{`ORDEN N°: #${id}`}</span>

                <div className='userTicket_left-items'>
                    <span> {`${sala} - ${tipo} (${lenguaje})`} </span>

                    <span>{title}</span>

                    <span>{`${fechaFuncion} - ${horaFuncion}`}</span>

                    <span>{`Butacas: ${seatsNumbers.join(', ')}`}</span>

                    <span>{`Total: $${precio}`}</span>
                </div>
            </div>

            <div className="userTicket_right">
                <span className='text-md uppercase font-semibold underline mb-3'>Código para retirar en el cine</span>
                <div className='userTicket_right-qrCode'>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={codigoParaRetirar}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <span className='font-bowlby text-[#E85D04] mt-2'>{codigoParaRetirar}</span>
            </div>

            <div className="userTicket_bottom">
                <div className='userTicket_bottom-text uppercase text-md px-5 flex flex-col'>
                    <span>Código de pago</span>
                    <span>{`(${fechaPago} - ${horaPago})`}</span>
                </div>
                <div className='userTicket_bottom-barcode'>
                    <Barcode
                        value={paymentId}
                        height={25}
                        width={1}
                        font='Staatliches'
                        fontSize={15}
                    />
                </div>
            </div>


        </div>
    )
}

export default UserTicket;