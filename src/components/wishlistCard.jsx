import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/24/outline';

const WishlistCard = ({ item, onRemove }) => {
  const navigate = useNavigate();

  // Navigate to book details page
  const handleCardClick = () => {
    navigate(`/book/${item.book.bookId}`);
  };

  // Remove from wishlist without triggering navigation
  const removeFromWishlist = async (e) => {
    e.stopPropagation(); 
    const token = localStorage.getItem('token');
    try {
      await API.delete(`/wishlist/${item.book.bookId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Removed from wishlist");
      onRemove(item._id);
    } catch (err) {
      toast.error("Error removing from wishlist");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-gray-800 p-4 rounded-2xl shadow-lg text-white cursor-pointer hover:bg-gray-700 transition-colors duration-300 flex items-center gap-6"
      title="View book details"
    >
      {/* Thumbnail */}
      <img
        src={item.book.thumbnail || "https://via.placeholder.com/150x220?text=No+Image"}
        alt={item.book.title || "Book thumbnail"}
        className="w-20 h-30 rounded shadow-md object-cover flex-shrink-0"
      />

      {/* Text and button container */}
      <div className="flex flex-col flex-grow justify-between h-full">
        <h4 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {item.book.title}
        </h4>
        <p className="text-sm italic text-teal-300 mb-4 line-clamp-3">
          {Array.isArray(item.book.authors) ? item.book.authors.join(', ') : item.book.authors || 'Unknown Author'}
        </p>

        <button
          onClick={removeFromWishlist}
          className="self-end bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center justify-center w-max"
          type="button"
          aria-label="Remove from wishlist"
          title="Remove from wishlist"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
