import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/api';
import BookCard from '../components/bookCard';
import { toast } from 'react-toastify';

const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      const res = await API.get(`/books/search?query=${encodeURIComponent(query)}&page=${page}`);
      setBooks(res.data.books || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load books.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, query]);

  const goToPage = (newPage) => {
    if (newPage < 1) return;
    setSearchParams({ query, page: newPage });
  };

  return (
    <div className="bg-slate-900 min-h-screen p-10 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 drop-shadow-lg">
        Dive into books about <span className="italic">"{query}"</span>
      </h2>

      {isLoading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : books.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-12">
            {page > 1 && (
              <button
                onClick={() => goToPage(page - 1)}
                className="bg-gradient-to-r cursor-pointer from-orange-800 to-orange-200 hover:from-orange-200 hover:to-orange-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Previous Page
              </button>
            )}
            {books.length === 9 && (
              <button
                onClick={() => goToPage(page + 1)}
                className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">No books found</p>
      )}
    </div>
  );
};

export default AllBooks;
