import './App.min.css';
import NavBar from "./components/NavBar";
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