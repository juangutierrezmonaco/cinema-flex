import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';

const UserTicket = ({ movie, funcion, precio, paymentId, codigoParaRetirar, id, fechaDeEmision }) => {
    const { title, poster_path, backdrop_path } = movie;
    const { sala, tipo, lenguaje, horario, seatsNumbers } = funcion;

    const formatoTiempo = ( date ) => {
        const hh = ('0' + date.getHours()).slice(-2);
        const mm = ('0' + date.getMinutes()).slice(-2);
        const ss = ('0' + date.getSeconds()).slice(-2);

        return `${hh}:${mm}:${ss}`;
    }

    const horarioDate = horario.toDate();
    const fechaFuncion = horarioDate.toLocaleDateString();
    const horaFuncion = horarioDate.getHours() + ':' + horarioDate.getMinutes();

    const fechaPago = fechaDeEmision.toDate().toLocaleDateString();
    const horaPago = formatoTiempo(fechaDeEmision.toDate());

    const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const backgroundStyle = {
        backgroundImage: `url(${backdropPath})`
    }

    return (
        <div className="userTicket">
            <div className="userTicket_left xs:text-md mlg:text-2xl">
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
                <span className='xs:text-sm uppercase font-semibold underline mb-3 userTicket_right-text'>Código para retirar en el cine</span>
                <div className='userTicket_right-qrCode'>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={codigoParaRetirar}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <span className='font-bowlby text-[#E85D04] mt-2 userTicket_right-text'>{codigoParaRetirar}</span>
            </div>

            {<div className="userTicket_bottom">
                <div className='userTicket_bottom-text uppercase xs:text-md px-5 flex flex-col'>
                    <span>Código de pago</span>
                    <span>{`(${fechaPago} - ${horaPago})`}</span>
                </div>

                <div className='userTicket_bottom-barcode hidden sm:flex'>
                    <Barcode
                        value={paymentId}
                        height={25}
                        width={1}
                        font='Albert Sans'
                        fontSize={15}
                    />
                </div>

                <div className='userTicket_bottom-barcode flex sm:hidden'>
                    <Barcode
                        value={paymentId}
                        height={15}
                        width={.6}
                        font='Albert Sans'
                        fontSize={5}
                    />
                </div>
            </div>}


        </div>
    )
}

export default UserTicket;