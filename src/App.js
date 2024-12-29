import './css/App.css';
import NavBar from './components/navbar';
import Favorites from './pages/favorites';
import Home from './pages/main';
import {Routes,Route} from "react-router-dom";
import { MovieProvider } from './contexts/MovieContext';
function App() {
  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path='/movie-app' element={<Home/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
