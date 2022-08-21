const NavBar = () => {
  return (
    <div className="navbar">
        <a href="">
          <i class="fa-solid fa-film"></i>
          <h2>CINEMAFLEX</h2>
        </a>

        <ul className="navbar__menu">
            <li><a href="">PELÍCULAS EN CARTEL</a></li>
            <li><a href="">HORARIOS</a></li>
            <li><a href="">PRÓXIMOS ESTRENOS</a></li>
            <li><a href="">COMBOS</a></li>
            <li><a href="">PRECIOS</a></li>
        </ul>

        <ul className="navbar__icons">
          <li><button><i className="fa-regular fa-user"></i></button></li>
          <li><button><i className="fa-solid fa-magnifying-glass"></i></button></li>
        </ul>
    </div>
  )
}

export default NavBar;