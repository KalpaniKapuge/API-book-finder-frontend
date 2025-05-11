import API from '../api/api';

const WishlistCard = ({ item, onRemove }) => {
  const removeFromWishlist = async () => {
    try {
      await API.delete(`/wishlist/${item.book.bookId}`);
      alert("Removed from wishlist");
      onRemove(item._id);
    } catch (err) {
      alert("Error removing");
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded shadow text-white">
      <h4 className="text-md font-semibold text-purple-300">{item.book.title}</h4>
      <button
        onClick={removeFromWishlist}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistCard;