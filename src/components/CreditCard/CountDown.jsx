import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const CountDown = ({ initialMinutes = 5, initialSeconds = 0, close }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [color, setColor] = useState('text-green-700');
    
    const onTimeUp = () => {
        Swal.fire({
            icon: 'error',
            text: 'Se acabó el tiempo. Intente nuevamente.',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary mr-3'
            }
        }).then(() => {
            close();
        })
    }

    useEffect(() => {
        switch (true) {
            case (minutes == 2 && seconds == 59):
                setColor('text-yellow-600');
                break;

                case (minutes == 0 && seconds == 59):
                setColor('text-red-600');
                break;
        }

        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    onTimeUp();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)

        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div className={`font-bowlby ${color}`}>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">

                <div className="flex flex-col p-2 rounded-box">
                    <span className="countdown">
                        <span style={{ "--value": minutes }}></span>
                    </span>
                </div>

                <div className="flex flex-col p-2 rounded-box">
                    <span className="countdown">
                        <span style={{ "--value": seconds }}></span>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default CountDown;