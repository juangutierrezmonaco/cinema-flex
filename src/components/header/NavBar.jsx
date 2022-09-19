import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CartWidget from './CartWidget'
import UserWidget from './UserWidget';

const NavBar = () => {

    /* Consigo todos los géneros disponibles para ponerlos en el navbar */
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=892e5b21eccd8afb7c43b48a426ac1e1&language=es-ES`)
            .then(res => res.json())
            .then(data => setGenres(data.genres))
            .catch(error => console.log(error));
    }, [])
    
    
    /* Abertura del nav en vista mobile*/
    const [openNav, setOpenNav] = useState(false);
    const closeNav = () => {    // Para cuando haga click en alguna opción se cierre el Navbar
        document.body.style.overflow = 'auto';
        setOpenNav(false);
    }; 

    const toggleButton = () => {    // Cambia el estado del openNav y deshabilita el scroll
        document.body.style.overflow = !openNav ? 'hidden' : 'auto';
        setOpenNav(!openNav);
    };

    /* Mostrar qué sección está seleccionada */
    const navLinkClass = (navData) => (navData.isActive ? 'nav-active hover:drop-shadow-mine ' : 'underline-hover hover:drop-shadow-mine'); 
    const btnStyles = 'btn btn-circle min-h-0 h-8 w-8 text-sm sm:text-xl sm:h-10 sm:w-10 xl:text-2xl xl:h-12 xl:w-12 nav-icon';

    /* Cerrar modal géneros */
    const closeModal = (e) => { 
        // De momento lo hago a lo Vanilla JS por falta de tiempo para cerrar el modal. 
        e.target.parentElement.parentElement.parentElement.querySelector("label").click();
    }
    
    /* Para que quede seleccionado Géneros cuando estoy en un género */
    const imInGenres = useLocation().pathname.replace(/\D/g, "") ? true : false;
    const genreNavItemClass = imInGenres ? 'nav-active hover:drop-shadow-mine ' : 'underline-hover hover:drop-shadow-mine';

    return (
        <header className="myNavbar flex justify-between items-center py-5 px-4 text-sm sm:text-xl sm:px-10 md:text-xl md:py-2 xl:text-2xl">
            <div className='flex items-center gap-3'> 

                <label className={`swap swap-rotate lg:hidden ${btnStyles}`} onChange={toggleButton}>
                    <input type="checkbox" checked={openNav} readOnly/>
                    <i className='swap-off fill-current fa-solid fa-bars'></i>
                    <i className='swap-on fill-current fa-solid fa-xmark'></i>
                </label>

                <Link to={'/'} className="p-3 flex items-center gap-3 nav-logo" onClick={closeNav}>
                    <i className="fa-solid fa-film "></i>
                    <span>CINEMAFLEX</span>
                </Link>
            </div>

            {/* Nav versión desktop  */}
            <nav>
                <ul className="uppercase hidden lg:flex gap-5 whitespace-nowrap" >
                    <li><NavLink to={'/category/cartelera'} className={navLinkClass}>Películas en cartel</NavLink></li>
                    <li><NavLink to={'/category/estrenos'} className={navLinkClass}>Próximos estrenos</NavLink></li>

                    <li>
                        <label htmlFor="my-modal-3" className={genreNavItemClass}>Géneros</label>

                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                        <label htmlFor="my-modal-3" className="modal cursor-pointer">
                            <div className="modal-box relative bg-white text-black cursor-pointer">
                                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Géneros</h3>
                                <ul className="menu dropdown-content p-2 bg-white text-black ">
                                        {genres.length > 0 ? (
                                            genres.map( g => 
                                                <li key={g.id} onClick={closeModal}>
                                                    <NavLink to={`./category/${g.id}`} className={`text-black`}>{g.name}</NavLink>
                                                </li> 
                                            )
                                        ) : (
                                            <li>Cargando...</li>
                                        )}
                                </ul>
                            </div>
                        </label>
                    </li>
                </ul>
            </nav>

            {/* Nav versión Mobile. Nota: El invisible es para que no se vea la animación en la carga de la página */}
            <nav className={openNav ? 'nav-overlay flex justify-center items-center lg:hidden slide-in-left' : `nav-overlay flex justify-center items-center lg:hidden slide-out-left invisible`}>
                <ul className="uppercase flex flex-col items-center lg:flex-row gap-5 whitespace-nowrap" >
                    <li><NavLink to={'/'} className={navLinkClass} onClick={closeNav}>Inicio</NavLink></li>
                    <li><NavLink to={'/category/cartelera'} className={navLinkClass} onClick={closeNav}>Películas en cartel</NavLink></li>
                    <li><NavLink to={'/category/estrenos'} className={navLinkClass} onClick={closeNav}>Próximos estrenos</NavLink></li>
                    
                    <li >
                        <label htmlFor="my-modal-3-mobile" className={genreNavItemClass}>Géneros</label>

                        <input type="checkbox" id="my-modal-3-mobile" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative bg-white text-black ">
                                <label htmlFor="my-modal-3-mobile" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Géneros</h3>
                                <ul className="menu dropdown-content p-2 bg-white text-black ">
                                        {genres.length > 0 ? (
                                            genres.map( g => 
                                                <li key={g.id}>
                                                    <NavLink to={`./category/${g.id}`} className={`text-black`} onClick={() => { closeModal(); closeNav();}}>{g.name}</NavLink>
                                                </li> 
                                            )
                                        ) : (
                                            <li>Cargando...</li>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>

            <ul className="flex items-center gap-2">
                <li className={btnStyles} onClick={closeNav}><button><i className="fa-solid fa-magnifying-glass"></i></button></li>
                <li onClick={closeNav}><UserWidget btnStyles={btnStyles}/></li>
                <li onClick={closeNav}><CartWidget btnStyles={btnStyles}/></li>
            </ul>
        </header>
    )
}

export default NavBar;