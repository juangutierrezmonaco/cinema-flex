import './App.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavBar from './components/header/NavBar';

import Cartelera from './components/section/Cartelera';
import Estrenos from './components/section/Estrenos';
import Combos from './components/section/Combos';
import Precios from './components/section/Precios';

import MovieCarouselContainer from './components/MovieCarousel/MovieCarouselContainer';
import MovieCardListContainer from './components/Movie/MovieCardListContainer';

function App() {

  return (
    <>
        <BrowserRouter>
            <NavBar/>
            <MovieCarouselContainer/>

            <Routes>                
                <Route path='/' element={<main className='container mt-9 '><MovieCardListContainer greeting="Películas en cartelera"/></main>}></Route>
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