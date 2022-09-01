import './App.min.css';
import NavBar from "./components/header/NavBar";
import ItemListContainer from './components/ItemListContainer';

function App() {

  return (
    <>
      <header>
        <NavBar/>
      </header>

      <main>
        <ItemListContainer greeting="Películas en cartelera"/>
      </main>
    </>
  );
}

export default App;