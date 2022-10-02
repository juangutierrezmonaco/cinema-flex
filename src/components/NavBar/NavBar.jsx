import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CartWidget from './CartWidget'
import GenresDropdown from './GenresDropdown';
import SearchWidget from './SearchWidget';
import UserWidget from './UserWidget';

const NavBar = () => {

    /* Consigo todos los géneros disponibles para ponerlos en el navbar */
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
            .then(res => res.json())
            .then(data => {
                // Ordeno los géneros antes de asignarlo
                data.genres.sort((g1, g2) => {
                    if (g1.name > g2.name) {
                        return 1;
                    } else if (g1.name < g2.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                setGenres(data.genres);
            })
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
    const btnStyles = 'btn btn-circle min-h-0 text-xs h-8 w-8 sm:h-10 sm:w-10 sm:text-lg lg:text-base 2xl:h-12 2xl:w-12 2xl:text-xl nav-icon';

    /* Cerrar modal géneros */
    const closeModal = (e) => { 
        e.target.parentElement.parentElement.parentElement.querySelector("label").click();
    }
    
    /* Para que quede seleccionado Géneros cuando estoy en un género */
    const imInGenres = (useLocation().pathname.includes('category') &&  useLocation().pathname.replace(/\D/g, "")) ? true : false;
    const genreNavItemClass = imInGenres ? 'nav-active hover:drop-shadow-mine cursor-pointer' : 'underline-hover hover:drop-shadow-mine cursor-pointer';

    return (
        <header className="myNavbar flex justify-between items-center py-5 px-4 text-xs sm:text-lg md:py-2 lg:text-sm xl:text-base	2xl:text-xl">
            <div className='flex items-center gap-3'> 

                <label className={`swap swap-rotate lg:hidden ${btnStyles}`} onChange={toggleButton}>
                    <input type="checkbox" checked={openNav} readOnly/>
                    <i className='swap-off fill-current fa-solid fa-bars'></i>
                    <i className='swap-on fill-current fa-solid fa-xmark'></i>
                </label>

                <Link to={'/'} className="xs:p-3 flex items-center gap-3 nav-logo" onClick={closeNav}>
                    <i className="fa-solid fa-film "></i>
                    <span>CINEMAFLEX</span>
                </Link>
            </div>

            {/* Nav versión desktop  */}
            <nav>
                <ul className="uppercase hidden lg:flex gap-5 whitespace-nowrap" >
                    <li><NavLink to={'/category/cartelera'} className={navLinkClass}>Películas en cartelera</NavLink></li>
                    <li><NavLink to={'/category/estrenos'} className={navLinkClass}>Próximos estrenos</NavLink></li>

                    <li>
                        <label htmlFor="my-modal-3" className={genreNavItemClass}>Géneros</label>

                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                        <label htmlFor="my-modal-3" className="modal">
                            <div className="modal-box relative bg-white text-black font-albert">
                                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Géneros</h3>
                                <GenresDropdown genres={genres} close={closeModal}/>
                            </div>
                        </label>
                    </li>
                </ul>
            </nav>

            {/* Nav versión Mobile. Nota: El invisible es para que no se vea la animación en la carga de la página */}
            <nav className={openNav ? 'nav-overlay flex justify-center items-center lg:hidden slide-in-left' : `nav-overlay flex justify-center items-center lg:hidden slide-out-left invisible`}>
                <ul className="uppercase flex flex-col items-center lg:flex-row gap-5 whitespace-nowrap" >
                    <li><NavLink to={'/'} className={navLinkClass} onClick={closeNav}>Inicio</NavLink></li>
                    <li><NavLink to={'/category/cartelera'} className={navLinkClass} onClick={closeNav}>Películas en cartelera</NavLink></li>
                    <li><NavLink to={'/category/estrenos'} className={navLinkClass} onClick={closeNav}>Próximos estrenos</NavLink></li>
                    
                    <li >
                        <label htmlFor="my-modal-3-mobile" className={genreNavItemClass}>Géneros</label>

                        <input type="checkbox" id="my-modal-3-mobile" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative bg-white text-black font-albert">
                                <label htmlFor="my-modal-3-mobile" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 className="text-lg font-bold">Géneros</h3>                                
                                <GenresDropdown genres={genres} close={closeModal}/>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>

            <ul className="flex items-center gap-2">
                <li onClick={closeNav}><SearchWidget btnStyles={btnStyles}/></li>
                <li onClick={closeNav}><UserWidget btnStyles={btnStyles}/></li>
                <li onClick={closeNav}><CartWidget btnStyles={btnStyles}/></li>
            </ul>
        </header>
    )
}

export default NavBar;