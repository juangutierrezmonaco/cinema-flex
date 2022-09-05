import './App.min.css';
import ItemListContainer from './components/movie/ItemListContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavBar from './components/header/NavBar';

import Cartelera from './components/section/Cartelera';
import Estrenos from './components/section/Estrenos';
import Combos from './components/section/Combos';
import Precios from './components/section/Precios';

function App() {

  return (
    <>
        <BrowserRouter>
            <NavBar/>

            <Routes>                
                <Route path='/' element={<main><ItemListContainer greeting="Películas en cartelera"/></main>}></Route>
                {/* <Route path='/movies' element={<Movies/>}></Route>
                <Route path='/movie/:movieId' element={<Movie/>}></Route> */}
                {/* <Route path='/category/:categoryId' element={<MoviesListContainer/>}></Route> */}

                <Route path='/cartelera' element={<Cartelera/>}></Route>
                <Route path='/estrenos' element={<Estrenos/>}></Route>
                <Route path='/combos' element={<Combos/>}></Route>
                <Route path='/precios' element={<Precios/>}></Route>
                

            </Routes>
            
            <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;