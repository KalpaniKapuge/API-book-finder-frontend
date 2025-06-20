import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Wishlist from './pages/wishlist';
import Login from './pages/login';
import Register from './pages/register';
import AllBooks from './pages/allBooks';
import BookDetail from './pages/bookDetail';
import ProtectedRoute from './components/protectRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthContext, AuthProvider } from './context/authContext';

function App() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const NavLink = ({ to, label, protectedLink }) => {
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
        className={`px-4 py-2 rounded-md text-base font-medium tracking-wide transition duration-300 ease-in-out shadow-sm border ${
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
    <div className="bg-gradient-to-br from-slate-950 to-slate-800 min-h-screen text-gray-300 font-sans relative">
      <nav className="bg-gradient-to-r from-teal-900 to-teal-600 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-200 flex items-center gap-4 px-10">
            BookVerse
          </h1>
          <div className="flex space-x-4 items-center">
            <NavLink to="/" label="Home" />
            {isLoggedIn && <NavLink to="/wishlist" label="Wishlist" />}
            {!isLoggedIn && <NavLink to="/register" label="Register" />}
            {!isLoggedIn && <NavLink to="/login" label="Login" />}
            {isLoggedIn && (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-4 py-2 rounded-md text-base font-medium tracking-wide transition duration-300 ease-in-out shadow-sm border text-slate-200 border-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-600 hover:border-transparent"
                aria-label="Logout"
                title="Logout"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>

      <ToastContainer position="top-right" />

      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-slate-950 to-slate-800 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          aria-modal="true"
          role="dialog"
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          <div className="bg-slate-800/70 rounded-lg p-6 max-w-md w-full shadow-2xl text-white text-center transform transition-transform duration-300 ease-in-out animate-slideUp">
            <h2 id="logout-modal-title" className="text-2xl font-bold mb-3 select-none">
              Confirm Logout
            </h2>
            <p id="logout-modal-description" className="mb-5 text-base select-none">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-5 py-2 rounded-md font-semibold shadow-lg text-white bg-gradient-to-r from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-70 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Yes, Logout
              </button>

              <button
                onClick={handleLogoutCancel}
                className="px-5 py-2 rounded-md font-semibold shadow-lg text-white bg-gradient-to-r from-orange-800 to-orange-200 hover:from-orange-200 hover:to-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-70 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
