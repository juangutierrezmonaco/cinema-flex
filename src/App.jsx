import './App.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/footer/Footer';
import MovieCarouselContainer from './components/MovieCarousel/MovieCarouselContainer';
import MovieCardListContainer from './components/MovieCard/MovieCardListContainer';
import MovieDetailContainer from './components/MovieDetail/MovieDetailContainer';
import Cart from './components/Cart/Cart';
import MovieCredits from './components/MovieCredits/MovieCredits';
import UserTickets from './components/UserTickets/UserTickets';

import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'

function App() {
    const mainLayout = 'overflow-hidden px-5 lg:px-20 '

    return (
        <UserProvider>
            <CartProvider>
                <BrowserRouter>
                    <NavBar />
                    <MovieCarouselContainer />

                    <Routes>
                        <Route path='/' element={<main className={mainLayout}><MovieCardListContainer /></main>}></Route>

                        <Route path='/category/:categoryId' element={<main className={mainLayout}><MovieCardListContainer /></main>}></Route>

                        <Route path='/movie/:movieId' element={<main className=''><MovieDetailContainer /></main>}></Route>

                        <Route path='/movie/:movieId/credits' element={<main className={mainLayout}><MovieCredits /></main>}></Route>

                        <Route path='/tickets' element={<main className={mainLayout}><Cart /></main>}></Route>

                        <Route path='/user/tickets' element={<main className={mainLayout}><UserTickets /></main>}></Route>

                    </Routes>

                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </UserProvider>
    );
}

export default App;