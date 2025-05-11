import { useState } from 'react';
import API from '../api/api';
import BookCard from '../components/BookCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to search books.");
      return;
    }

    try {
      const res = await API.get(`/books/search?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      alert("Error searching books");
      console.error("Search error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen py-24 px-6">
    <div className="max-w-6xl mx-auto text-center bg-white/50 p-12 rounded-3xl shadow-xl border border-white/20 backdrop-blur-lg transition duration-300 hover:shadow-2xl  hover:scale-105">


        <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-800 mb-6">
          Discover Your Next Favorite Book 📖
        </h2>
        <p className="text-xl text-slate-600 mb-12">
          Search a wide range of books by title, author, or genre.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
          <input
            type="text"
            className="w-full sm:w-2/3 px-8 py-4 text-lg rounded-full border border-slate-400 bg-slate-300 focus:ring-4 focus:ring-slate-300 focus:outline-2 focus:border-slate-500 shadow-md transition-all duration-300"
            placeholder="Type a book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg transition transform hover:scale-105 duration-300"
          >
            🔍 Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
