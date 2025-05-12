import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/api';
import BookCard from '../components/bookCard';
import { toast } from 'react-toastify';

const AllBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page')) || 1;

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBooks = async () => {
    try {
      const res = await API.get(`/books/search?query=${encodeURIComponent(query)}&page=${page}`);
      setBooks(res.data.books);
      setTotalPages(Math.ceil(res.data.totalBooks / 9));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, query]);

  const goToPage = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  return (
    <div className="bg-slate-900 min-h-screen p-10 text-white">
    <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 drop-shadow-lg">
      Dive into books about <span className="italic">"{query}"</span>
    </h2>

      {books.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {books.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-6 mt-12">
            {page > 1 && (
            <button
            onClick={() => goToPage(page - 1)}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-800 to-orange-200 hover:from-orange-200 hover:to-orange-800 text-white text-2xl font-bold px-8 py-4 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
            Previous Page
            </button>

            )}
            {page < totalPages && (
              <button
                onClick={() => goToPage(page + 1)}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-800 to-teal-200 hover:from-teal-200 hover:to-teal-800 text-white text-2xl font-bold px-8 py-4 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
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
