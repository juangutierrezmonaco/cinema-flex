const CartWidget = ({ btnStyles }) => {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className={btnStyles}>
                <button className={'indicator'}>
                    <i className="fa-solid fa-ticket"></i>
                    <span className="badge badge-sm badge-primary indicator-item">8</span>
                </button>
            </label>

            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow text-black">
                <div className="card-body">
                    <span className="font-bold text-lg text-center">8 Entradas</span>
                    <div className="card-actions">
                        <button className="btn btn-primary btn-block">View cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartWidget;

/**
 * Nota: Como la página vende entradas, me parecía más acertado que en vez de un carrito haya un ticket para señalar las entradas (productos).
 */