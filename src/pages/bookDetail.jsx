import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [wishlistBookIds, setWishlistBookIds] = useState(new Set());
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError("Failed to fetch book details.");
        toast.error(err.response?.data?.message || "Failed to fetch book details.");
      }
    };

    const fetchWishlist = async () => {
      if (!token) return;
      try {
        const res = await API.get('/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ids = new Set(res.data.map(item => item.book.bookId));
        setWishlistBookIds(ids);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load your wishlist. Please try again.");
      }

    };

    fetchBook();
    fetchWishlist();
  }, [id, token]);

  const handleAddToWishlist = async () => {
    if (!token) {
      toast.info("Please login to add to wishlist");
      return;
    }
    try {
      await API.post(
        '/wishlist',
        { bookId: book.bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist!");
      setWishlistBookIds(prev => new Set(prev).add(book.bookId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
  if (!book) return <div className="p-6 text-white text-center">Loading...</div>;

  const isInWishlist = wishlistBookIds.has(book.bookId);

  return (
    <div className="bg-gradient-to-br from-slate-900 mt-30 via-slate-800 to-slate-900 p-8 text-white max-w-5xl mx-auto rounded-3xl shadow-xl border border-slate-700
                    ring-1 ring-teal-500 ring-opacity-20
                    animate-fadeIn"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Book Thumbnail */}
        <img
          src={book.thumbnail || "https://via.placeholder.com/200x280?text=No+Image"}
          alt={book.title}
          className="w-40 h-60 md:w-48 md:h-72 object-cover rounded-xl shadow-lg border border-slate-700 self-center md:self-center transition-transform duration-300 hover:scale-105 animate-fadeIn"
          loading="lazy"
        />

        {/* Details */}
        <div className="flex flex-col flex-grow justify-between animate-fadeIn delay-150">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-wide drop-shadow-md select-none relative group cursor-default">
              {book.title}
              <span className="block h-1 max-w-0 group-hover:max-w-full transition-all duration-500 bg-teal-400 rounded mt-1"></span>
            </h1>
            <p className="text-lg text-teal-400 italic mb-6 tracking-wide select-text">
              {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
            </p>

            <p className="text-base text-slate-300 leading-relaxed whitespace-pre-line max-h-[18rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-slate-900">
              {book.description || "No description available."}
            </p>
          </div>

          {/* Wishlist Actions */}
          <div className="mt-8 flex flex-col items-center md:items-start gap-4">
            {isLoggedIn && !isInWishlist && (
              <button
                onClick={handleAddToWishlist}
                className="w-full md:w-auto bg-gradient-to-r from-teal-700 to-teal-400 hover:from-teal-400 hover:to-teal-700 text-white px-8 py-3 rounded-xl text-xl font-bold shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 relative group"
                aria-label="Add to wishlist"
                title="Add to wishlist"
              >
                ❤️ Add to Wishlist
               
              </button>
            )}

            {!isLoggedIn && (
              <p className="text-yellow-400 font-semibold text-center md:text-left select-none">
                Please log in to add to wishlist.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
