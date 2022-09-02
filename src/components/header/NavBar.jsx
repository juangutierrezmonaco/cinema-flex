import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <div className="navbarMio">
      <a href="" className='navbarMio__logo'>
        <i className="fa-solid fa-film"></i>
        <h2>CINEMAFLEX</h2>
      </a>

      <nav>
        <ul className="navbarMio__menu">
            <li><a href="">Películas en cartel</a></li>
            <li><a href="">Horarios</a></li>
            <li><a href="">Próximos estrenos</a></li>
            <li><a href="">Combos</a></li>
            <li><a href="">Precios</a></li>
        </ul>
      </nav>

      <ul className="navbarMio__icons">
        <li><button><i className="fa-regular fa-user"></i></button></li>
        <li><button><i className="fa-solid fa-magnifying-glass"></i></button></li>
        <CartWidget/>
      </ul>
    </div>
  )
}

export default NavBar;