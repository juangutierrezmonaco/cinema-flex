import { useEffect, useState } from "react";

const MovieScreeningSelect = ({ screenings, defaultSala = -1, defaultHorario = -1, setScreeningId }) => {

    /* Arreglos paralelos. Uno guarda las salas y el otro paralelamente guarda un arreglo por cada sala con los dias y horarios de esa sala*/
    const salas = []
    const horarios = [];

    for (const sala of screenings) {
        salas.push(sala.sala);  /* Guardo la sala */

        const aux = [];
        for (const func of sala.funciones) {
            aux.push(func);
        }
        horarios.push(aux); /* Guardo el arreglo de horarios */
    }
    
    /* Esto es para habilitar al segundo select cuando se activo el primero y que este tenga los horarios de ESA sala */
    const [funciones, setFunciones] = useState([]);
    const handleFirstSelect = (e) => {
        e.target.value != -1 && setFunciones(horarios[parseInt(e.target.value)]);
        
        const segundoSelectValue = document.querySelector("#selectHorario").value;
        segundoSelectValue >= 0 && setScreeningId(e.target.value + segundoSelectValue);
    }

    const handleSecondSelect = (e) => {
        const primerSelectValue = document.querySelector("#selectSala").value;
        e.target.value != -1 && setScreeningId(primerSelectValue + e.target.value);
    }

    /* Por último, si el primero está activado ya en el primer render tendría que activarse el segundo */
    useEffect(() => {
        const primerSelectValue = document.querySelector("#selectSala").value;
        primerSelectValue >= 0 && setFunciones(horarios[parseInt(defaultSala)]);

        const segundoSelectValue = document.querySelector("#selectHorario").value;
        segundoSelectValue >= 0 && setScreeningId(primerSelectValue + segundoSelectValue);
    }, []);

    const [initialValue, setInitialValue] = useState(defaultHorario);
    const handler = (e) => {
        setInitialValue(e.target.value);
        const primerSelectValue = document.querySelector("#selectSala").value;
        e.target.value != -1 && setScreeningId(primerSelectValue + e.target.value);
    }

    return (
        <div className="flex flex-col gap-3 ">
            <select className="select select-bordered w-full max-w-xs" defaultValue={defaultSala} id='selectSala' onChange={handleFirstSelect}>
                <option disabled value={-1} readOnly>Sala</option>
                {salas.map((sala, index) => (
                    <option key={index} value={`${index}`}> {sala} </option>
                ))}
            </select>

            <select className={funciones.length > 0 ? 'select select-bordered w-full max-w-xs visible' : 'select select-bordered w-full max-w-xs invisible'} id='selectHorario' onChange={handler} value={initialValue}>
                <option disabled value={-1} readOnly>Horario</option>

                {funciones.map((func, i) => (
                    <optgroup label={func.dia} key={i}>
                        {func.horarios.map((horario, j) => (
                            <option key={j} value={`${i}${j}`}> {`${func.dia} ${horario}`} </option>
                        ))}
                    </optgroup>

                ))}
            </select>

        </div>
    )
}

export default MovieScreeningSelect;