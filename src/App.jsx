import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Wishlist from './pages/wishlist';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';

function App() {
  const NavLink = ({ to, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
       <Link
      to={to}
      className={`px-5 py-2.5 rounded-lg text-xl font-medium tracking-wide transition duration-300 ease-in-out shadow-sm border ${
        isActive
          ? 'bg-gradient-to-r from-slate-600 to-slate-800 text-white border-slate-700'
          : 'text-slate-700 border-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-600 hover:border-transparent'
      }`}
    >
      {label}
    </Link>
    );
  };

  return (
    <Router>
      <div className="bg-gradient-to-tl from-slate-100 via-slate-300 to-slate-800 min-h-screen text-gray-800 font-sans">
        <nav className="bg-blue shadow-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <h1 className="text-5xl font-extrabold text-gray-200 flex items-center gap-3 animate-pulse">
              📚 BookVerse
            </h1>
            <div className="flex space-x-6">
              <NavLink to="/" label="Home" />
              <NavLink to="/wishlist" label="Wishlist" />
              <NavLink to="/login" label="Login" />
              <NavLink to="/register" label="Register" />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;