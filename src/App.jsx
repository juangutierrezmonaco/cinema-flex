import './App.min.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import NavBar from './components/header/NavBar';
import Footer from './components/footer/Footer';

import MovieCarouselContainer from './components/MovieCarousel/MovieCarouselContainer';
import MovieCardListContainer from './components/MovieCard/MovieCardListContainer';
import MovieDetailContainer from './components/MovieDetail/MovieDetailContainer';
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart';
import MovieCredits from './components/MovieCredits/MovieCredits';

function App() {   

    return (
        <CartProvider>
            <BrowserRouter>
                <NavBar/>
                <MovieCarouselContainer/>

                <Routes>                
                    <Route path='/' element={<main className='lg:px-24'><MovieCardListContainer greeting="Inicio"/></main>}></Route>

                    <Route path='/category/:categoryId' element={<main className='lg:px-24'><MovieCardListContainer greeting="Películas"/></main>}></Route>

                    <Route path='/movie/:movieId' element={<main className=''><MovieDetailContainer/></main>}></Route>

                    <Route path='/movie/:movieId/credits' element={<main className='mt-9 lg:px-12'><MovieCredits /></main>}></Route>

                    <Route path='/tickets' element={<main><Cart/></main>}></Route>
                    
                </Routes>
                
                <Footer/>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;