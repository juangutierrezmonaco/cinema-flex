import { useEffect, useState } from "react";

const MovieScreeningSelect = ({ screenings, defaultSala = -1, defaultHorario = -1, setScreeningId }) => {

    /* Arreglos paralelos SALAS Y HORARIOS. Uno guarda las salas y el otro paralelamente guarda un arreglo por cada sala con los dias y horarios de esa sala. 
       Nota: Los días y horarios se guardan como un objeto con el formato { dia: string, horarios: [] }
    */
    
    // Recupero cuántas salas distintas hay
    let salas = [...new Set(screenings.map(s => s.sala))];
    const horarios = [];

    // Por cada sala agrego los días y horarios que tiene la misma (con el formato mencionado arriba)
    for (const sala of salas) {

        // Traigo todos los horarios de cada sala y los ordeno
        const horariosSala = screenings.filter(s => s.sala == sala).map(s => s.horario.toDate());
        horariosSala.sort( (h1, h2) => h1 - h2 )
        
        // Saco los días distintos que hay
        const dias = [...new Set(horariosSala.map(h => h.toLocaleDateString()))];

        // Recorro por día y acumulo los horarios del día en aux.
        const aux = []
        for (const dia of dias) {
            const horariosDelDia = horariosSala.filter(h => h.toLocaleDateString() == dia).map(h => h.getHours() + ':' + h.getMinutes());
            const obj = {dia: dia, horarios: horariosDelDia}
            aux.push(obj);
        }

        // Por último guardo en horarios el día y sus horarios con el formato: {dia: string, horarios: [horario1, horario2, ..., horarioN]}
        horarios.push(aux);
    }

    salas = [...new Set(screenings.map(s => `${s.sala} - ${s.tipo} (${s.lenguaje})`))];
    
    const [id, setId] = useState([defaultSala, defaultHorario]);
    useEffect(() => {
        // Setteo las funciones del segundo select si hay info del primero
        id[0] != -1 && setFunciones(horarios[parseInt(id[0])]);

        if (id[0] != -1 && id[1] != -1) {
            const idStr = id.join('');
            setScreeningId(idStr);
        }
    }, [id])

    /* Esto es para habilitar al segundo select cuando se activo el primero y que este tenga los horarios de ESA sala */
    const [funciones, setFunciones] = useState([]);
    
    /* Valores de selects */
    const [firstValue, setFirstValue] = useState(defaultSala);
    const firstHandler = (e) => {
        setFirstValue(e.target.value);
        setFunciones(horarios[parseInt(e.target.value)]);
        setId(prev => {
            const newState = [...prev];
            newState[0] = e.target.value;
            return newState;
        })
    }

    const [secondValue, setSecondValue] = useState(defaultHorario);
    const secondHandler = (e) => {
        setSecondValue(e.target.value);
        setId(prev => {
            const newState = [...prev];
            newState[1] = e.target.value;
            return newState;
        })
    }
    

    return (
        <div className="flex flex-col gap-3">
            <select className="select select-bordered w-full max-w-xs" value={firstValue} onChange={firstHandler}>
                <option disabled value={-1} readOnly>Sala</option>
                {salas.map((sala, index) => (
                    <option key={index} value={`${index}`}> {sala} </option>
                ))}
            </select>
            
            <select className={funciones.length > 0 ? 'select select-bordered w-full max-w-xs visible' : 'select select-bordered w-full max-w-xs invisible'} value={secondValue} onChange={secondHandler}>

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