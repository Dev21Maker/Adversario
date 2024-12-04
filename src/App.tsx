import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthCheck } from './components/AuthCheck';
import { GameBoard } from './components/GameBoard';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        <Route
          path="/game/:roomId"
          element={
            <AuthCheck>
              <GameBoard />
            </AuthCheck>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;