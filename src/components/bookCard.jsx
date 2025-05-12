import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleCardClick = () => {
    navigate(`/book/${book.bookId || book._id}`);
  };

  const addToWishlist = async (e) => {
    e.stopPropagation(); 
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please login to add to wishlist");
      return;
    }
    try {
      await axios.post(
        'http://localhost:3000/api/wishlist',
        { bookId: book.bookId || book._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to wishlist");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-gradient-to-br from-slate-400 to-slate-200 border border-slate-300 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:from-slate-200 hover:to-slate-400"
    >
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-40 h-56 object-cover mb-4 rounded-xl shadow-md border border-slate-400"
      />
      <h3 className="text-2xl font-semibold text-slate-800 mb-1">{book.title}</h3>
      <p className="text-sm text-slate-600 italic mb-2">{book.authors}</p>
      <p className="text-sm text-slate-700 mb-4 line-clamp-4">{book.description}</p>
      <button
        type="button"
        onClick={addToWishlist}
        className="cursor-pointer mt-auto bg-slate-700 hover:bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform transform hover:scale-105"
      >
        ❤️ Add to Wishlist
      </button>
    </div>
  );
};

export default BookCard;
