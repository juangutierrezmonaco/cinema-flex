import './App.min.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavBar from './components/header/NavBar';

import MovieCarouselContainer from './components/MovieCarousel/MovieCarouselContainer';
import MovieCardListContainer from './components/MovieCard/MovieCardListContainer';
import MovieDetailContainer from './components/MovieDetail/MovieDetailContainer';

function App() {   

    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <MovieCarouselContainer/>

                <Routes>                
                    <Route path='/' element={<main className='lg:px-24'><MovieCardListContainer greeting="Películas"/></main>}></Route>

                    <Route path='/category/:categoryId' element={<main className='lg:px-24'><MovieCardListContainer greeting="Películas"/></main>}></Route>

                    <Route path='/movie/:movieId' element={<main className='mt-9 lg:px-12'><MovieDetailContainer/></main>}></Route>
                </Routes>
                
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default App;