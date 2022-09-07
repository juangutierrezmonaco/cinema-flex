import { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import CartWidget from './CartWidget'

const NavBar = () => {
    
    /* Abertura del nav en vista mobile*/
    const [openNav, setOpenNav] = useState(false);
    const closeNav = () => {setOpenNav(false)}; // Para cuando haga click en alguna opción se cierre el Navbar

    const toggleButton = () => {    // Cambia el estado del openNav y deshabilita el scroll
        document.body.style.overflow = !openNav ? 'hidden' : 'auto';
        setOpenNav(!openNav);
    };

    /* Mostrar qué sección está seleccionada */
    const navLinkClass = (navData) => (navData.isActive ? 'nav-active  hover:drop-shadow-mine ' : 'underline-hover hover:drop-shadow-mine ');  
    
    return (
        <header className="myNavbar flex justify-between items-center py-5 px-10">
            <div className='flex gap-3'> 

                <label className='btn btn-circle swap swap-rotate lg:hidden' onChange={toggleButton}>
                    <input type="checkbox" checked={openNav} readOnly/>
                    <i className='swap-off fill-current fa-solid fa-bars text-2xl'></i>
                    <i className='swap-on fill-current fa-solid fa-xmark text-2xl'></i>
                </label>

                <Link to={'/'} className="p-3 text-xl flex items-center gap-3 nav-logo" onClick={closeNav}>
                    <i className="fa-solid fa-film"></i>
                    <span>CINEMAFLEX</span>
                </Link>
            </div>

            <nav>
                <ul className="uppercase hidden lg:flex gap-5 text-xl whitespace-nowrap" >
                    <li><NavLink to={'/cartelera'} className={navLinkClass}>Películas en cartel</NavLink></li>
                    <li><NavLink to={'/estrenos'} className={navLinkClass}>Próximos estrenos</NavLink></li>
                    <li><NavLink to={'/combos'} className={navLinkClass}>Combos</NavLink></li>
                    <li><NavLink to={'/precios'} className={navLinkClass}>Precios</NavLink></li>
                </ul>
            </nav>

            {/* Nota: El invisible es para que no se vea la animación en la carga de la página */}
            <nav className={openNav ? 'nav-overlay lg:hidden slide-in-left' : `nav-overlay lg:hidden slide-out-left invisible`}>
                <ul className="uppercase flex flex-col lg:flex-row gap-5 text-xl whitespace-nowrap" >
                    <li><NavLink to={'/'} className={navLinkClass} onClick={closeNav}>Inicio</NavLink></li>
                    <li><NavLink to={'/cartelera'} className={navLinkClass} onClick={closeNav}>Películas en cartel</NavLink></li>
                    <li><NavLink to={'/estrenos'} className={navLinkClass} onClick={closeNav}>Próximos estrenos</NavLink></li>
                    <li><NavLink to={'/combos'} className={navLinkClass} onClick={closeNav}>Combos</NavLink></li>
                    <li><NavLink to={'/precios'} className={navLinkClass} onClick={closeNav}>Precios</NavLink></li>
                </ul>
            </nav>

            <ul className="flex items-center gap-5 text-2xl nav-icons">
                <li onClick={closeNav}><button><i className="fa-regular fa-user"></i></button></li>
                <li onClick={closeNav}><button><i className="fa-solid fa-magnifying-glass"></i></button></li>
                <li onClick={closeNav}><CartWidget/></li>
            </ul>
        </header>
    )
}

export default NavBar;