import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/24/outline';

const WishlistCard = ({ item, onRemove }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${item.book.bookId}`);
  };

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
      className="bg-gray-800 p-2 rounded-lg shadow text-white cursor-pointer hover:bg-gray-700 transition duration-200 flex items-center gap-3 w-full"
      title="View book details"
    >
      {/* Thumbnail */}
      <img
        src={item.book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image"}
        alt={item.book.title || "Book thumbnail"}
        className="w-12 h-16 rounded object-cover flex-shrink-0"
      />

      {/* Text and button container */}
      <div className="flex flex-col flex-grow justify-between h-full">
        <h4 className="text-xs font-medium text-white mb-1 line-clamp-2 leading-tight">
          {item.book.title}
        </h4>
        <p className="text-[10px] italic text-teal-300 mb-2 line-clamp-2 leading-tight">
          {Array.isArray(item.book.authors) ? item.book.authors.join(', ') : item.book.authors || 'Unknown Author'}
        </p>

        <button
          onClick={removeFromWishlist}
          className="self-end bg-red-800 hover:bg-red-700 text-white px-2 py-1 rounded text-[10px]  cursor-pointer flex items-center justify-center"
          type="button"
          aria-label="Remove from wishlist"
          title="Remove from wishlist"
        >
          <TrashIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
