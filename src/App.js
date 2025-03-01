import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import MovieListing from './pages/MovieListing';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
  return (
    <Router>
      <MovieProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<MovieListing />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </MovieProvider>
    </Router>
  );
}

export default App;
