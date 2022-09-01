import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <div className="navbar">
      <a href="" className='navbar__logo'>
        <i class="fa-solid fa-film"></i>
        <h2>CINEMAFLEX</h2>
      </a>

      <nav>
        <ul className="navbar__menu">
            <li><a href="">Películas en cartel</a></li>
            <li><a href="">Horarios</a></li>
            <li><a href="">Próximos estrenos</a></li>
            <li><a href="">Combos</a></li>
            <li><a href="">Precios</a></li>
        </ul>
      </nav>

      <ul className="navbar__icons">
        <li><button><i className="fa-regular fa-user"></i></button></li>
        <li><button><i className="fa-solid fa-magnifying-glass"></i></button></li>
        <CartWidget/>
      </ul>
    </div>
  )
}

export default NavBar;