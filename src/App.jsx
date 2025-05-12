// App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Wishlist from './pages/wishlist';
import Login from './pages/login';
import Register from './pages/register';
import AllBooks from './pages/allBooks';
import BookDetail from './pages/bookDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  const NavLink = ({ to, label, protectedLink }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = location.pathname === to;

    const handleClick = (e) => {
      if (protectedLink && !isLoggedIn) {
        e.preventDefault();
        toast.info('Please login first');
      }
    };

    return (
      <Link
        to={to}
        onClick={handleClick}
        className={`px-5 py-2.5 rounded-lg text-xl font-medium tracking-wide transition duration-300 ease-in-out shadow-sm border ${
          isActive
            ? 'bg-gradient-to-r from-slate-600 to-slate-800 text-white border-slate-700'
            : 'text-slate-200 border-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-600 hover:border-transparent'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <Router>
      <div className="bg-gradient-to-br from-slate-950 to-slate-800  min-h-screen text-gray-300 font-sans">
       <nav className="bg-gradient-to-r from-teal-900 to-teal-600 shadow-xl sticky top-0 z-50">

          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <h1 className="text-5xl font-extrabold text-gray-200 flex items-center gap-3 ">
              BookVerse
            </h1>
            <div className="flex space-x-6 ">
              <NavLink to="/" label="Home" />
              <NavLink to="/wishlist" label="Wishlist" protectedLink />
               <NavLink to="/register" label="Register" />
              <NavLink to="/login" label="Login" />
             
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
