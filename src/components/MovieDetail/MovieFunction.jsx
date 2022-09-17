const MovieFunction = ({ title, options } ) => {
    return (
        <select className="select select-bordered w-full max-w-xs">
            <option disabled value='selected' >{title}</option>
            {   options.map( (o, i) => <option key={i}>{o}</option> )}
        </select>
    )
}

export default MovieFunction;