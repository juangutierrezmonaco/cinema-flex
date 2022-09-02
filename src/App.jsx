import './App.min.css';
import { useState } from 'react';
import NavBar from "./components/header/NavBar";
import ItemListContainer from './components/movie/ItemListContainer';
import ThemeButton from './components/header/ThemeButton';
import Footer from './components/footer/Footer';
import Loader from './components/Loader';

function App() {

  return (
    <>
      <header>
        <ThemeButton/>
        <NavBar/>
      </header>

      <main>
        <ItemListContainer greeting="Películas en cartelera"/>
      </main>

      <Footer/>

    </>
  );
}

export default App;