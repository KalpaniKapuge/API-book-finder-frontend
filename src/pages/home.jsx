import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/bookCard';
import API from '../api/api';
import { toast } from 'react-toastify';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.info("Please enter a search term.");
      return;
    }
    try {
      const res = await API.get(`/books/search?query=${encodeURIComponent(query)}&page=1`);
      setBooks(res.data.books);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error searching books");
    }
  };

  const goToAllBooks = () => {
    if (!query.trim()) {
      toast.info("Please enter a search term.");
      return;
    }
    navigate(`/all-books?query=${encodeURIComponent(query)}&page=1`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 to-slate-800 min-h-screen py-16 px-4">
      <div className="relative w-full max-w-4xl mx-auto text-center bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-600 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-slate-300 mb-4">
          Explore a World of Books Just for You!
        </h2>
        <p className="text-base text-slate-400 mb-8">
          Search a wide range of books by title, author, or genre.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            className="w-full sm:w-2/3 px-5 py-3 rounded-full border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Type a book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') handleSearch(); }}
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r cursor-pointer from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white px-6 py-3 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Search
          </button>
        </div>
      </div>

      {books.length > 0 && (
        <div className="mt-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={goToAllBooks}
              className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              See More Books
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
