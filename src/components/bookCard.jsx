import React from 'react';
import axios from 'axios';

const BookCard = ({ book }) => {
  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        'http://localhost:3000/api/wishlist',
        {
          bookId: book._id,
          title: book.title,
          authors: book.authors,
          description: book.description,
          thumbnail: book.thumbnail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added to wishlist:", response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-400 to-slate-200 border border-slate-300 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:from-slate-200 hover:to-slate-400">
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-40 h-56 object-cover mb-4 rounded-xl shadow-md border border-slate-400"
      />
      <h3 className="text-2xl font-semibold text-slate-800 mb-1">{book.title}</h3>
      <p className="text-sm text-slate-600 italic mb-2">{book.authors}</p>
      <p className="text-sm text-slate-700 mb-4 line-clamp-4">{book.description}</p>
      <button
        onClick={addToWishlist}
        className="mt-auto bg-slate-700 hover:bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform transform hover:scale-105"
      >
        ❤️ Add to Wishlist
      </button>
    </div>
  );
};

export default BookCard;
