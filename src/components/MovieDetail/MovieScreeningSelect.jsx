import { useEffect, useState } from "react";

const MovieScreeningSelect = ({ screenings, defaultSalaIndex, defaultDiaIndex, delfaultHorarioIndex, setHorario, setSala}) => {

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

    /* Valores por default para los select */
    const defaultSala = defaultSalaIndex != undefined ? defaultSalaIndex : -1;
    let defaultHorario;
    if (defaultDiaIndex == undefined && delfaultHorarioIndex == undefined) {    // No se pasó nada por parámetro o se pasó mal
        defaultHorario = -1;
    } else {
        defaultHorario = `${defaultDiaIndex}${delfaultHorarioIndex}`;
    }

    /* Esto es para habilitar al segundo select cuando se activo el primero y que este tenga los horarios de esa sala */
    const [funciones, setFunciones] = useState([]);
    const toggleSecondSelect = (e) => {
        e.target.value >= 0 && setFunciones(horarios[e.target.value]);
        setSala(e.target.value);
    }

    /* Por último, si el primero está activado ya en el primer render tendría que activarse el segundo */
    useEffect(() => {
        const valuePrimerSelect = document.querySelector("#selectSala").value;
        valuePrimerSelect != -1 && setFunciones(horarios[valuePrimerSelect]);
    }, []);

    const changeHandler = (e) => {
        setHorario(e.target.value);
    }

    return (
        <div className="flex flex-col gap-3 ">
            <select className="select select-bordered w-full max-w-xs" defaultValue={defaultSala} onChange={toggleSecondSelect} id='selectSala'>
                <option disabled value={-1} readOnly>Sala</option>
                {salas.map((sala, index) => (
                    <option key={index} value={`${index}`}> {sala} </option>
                ))}
            </select>

            {funciones.length > 0 &&
                <select className="select select-bordered w-full max-w-xs" defaultValue={defaultHorario} onChange={changeHandler}>
                    <option disabled value={-1} readOnly>Horario</option>

                    {funciones.map((func, i) => (
                        <optgroup label={func.dia} key={i}>
                            {func.horarios.map((horario, j) => (
                                <option key={j} value={`${i}${j}`}> {`${func.dia} ${horario}`} </option>
                            ))}
                        </optgroup>

                    ))}
                </select>
            }

        </div>
    )
}

export default MovieScreeningSelect;