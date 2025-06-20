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
    if (!isLoggedIn) {
      toast.info("Please login to add to wishlist");
      return;
    }
    const token = localStorage.getItem("token");
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
      className="cursor-pointer bg-gradient-to-br from-slate-800 to-slate-500 border-2 border-teal-700 rounded-3xl shadow-xl p-4 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:from-slate-500 hover:to-slate-800 w-full max-w-[320px] mx-auto"
    >
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-32 h-44 object-cover mb-3 rounded-xl shadow-md border border-teal-600"
      />
      <h3 className="text-base font-semibold text-slate-100 mb-1 line-clamp-2">
        {book.title}
      </h3>
      <p className="text-xs text-teal-400 italic mb-2 line-clamp-1">
        {book.authors}
      </p>
      <p className="text-xs text-slate-300 mb-3 line-clamp-3">
        {book.description}
      </p>

      {isLoggedIn ? (
        <button
          type="button"
          onClick={addToWishlist}
          className="cursor-pointer mt-auto border-2 border-teal-700 bg-slate-700 hover:bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          ❤️ Add To Wishlist
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toast.info("Please login to add to wishlist");
          }}
          className="cursor-not-allowed mt-auto border-2 border-teal-700 bg-gray-400 text-gray-700 px-4 py-1 rounded-full text-xs font-semibold shadow-lg"
          disabled
        >
          ❤️ Add To Wishlist
        </button>
      )}
    </div>
  );
};

export default BookCard;
