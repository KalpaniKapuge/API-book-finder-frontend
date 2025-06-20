import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/bookCard';
import API from '../api/api';
import { toast } from 'react-toastify';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await API.get(`/books/search?query=${encodeURIComponent(query)}&page=1`);
      setBooks(res.data.books);
      setTotalBooks(res.data.totalBooks);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error searching books");
    }
  };

  const goToAllBooks = () => {
    navigate(`/all-books?query=${encodeURIComponent(query)}&page=2`);
  };
  return (
    <div className="bg-gradient-to-br from-slate-950 to-slate-800 min-h-screen py-24 px-6">
      {/* Hero/Search Section */}
      <div className="relative w-full max-w-6xl mx-auto text-center bg-slate-800/50 p-12 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-slate-600 backdrop-blur-lg">

        <h2 className="text-6xl font-extrabold text-slate-300 mb-6 tracking-wide">
          Explore a World of Books Just for You!
        </h2>
        <p className="text-xl text-slate-400 mb-12">Search a wide range of books by title, author, or genre.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <input
            type="text"
            className="w-full sm:w-2/3 px-8 py-4 text-lg rounded-full border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            placeholder="Type a book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className=" cursor-pointer bg-gradient-to-r from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white px-8 py-4 rounded-full text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      {books.length > 0 && (
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {books.map((book) => <BookCard key={book.bookId} book={book} />)}
          </div>
          <div className="flex justify-center mt-10">
           <button
          onClick={goToAllBooks}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white text-2xl font-bold px-8 py-4 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Next Page 
        </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
