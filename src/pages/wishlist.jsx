import { useEffect, useState } from 'react';
import API from '../api/api';
import WishlistCard from '../components/wishlistCard';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.info('Please login first');
      return;
    }
    API.get('/wishlist', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setWishlist(res.data))
      .catch(() => toast.error('Failed to load wishlist'));
  }, []);

  const handleRemove = (id) => {
    setWishlist(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="p-8 text-white max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-900 to-teal-400 drop-shadow-lg select-none tracking-wide">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-lg text-teal-300 italic mt-16 max-w-xl mx-auto leading-relaxed">
          Your wishlist is currently empty. Explore books and add your favorites here to keep track of what you want to read next!
        </p>
      ) : (
        <>
          <p className="text-center mb-10 text-teal-400 font-semibold tracking-wide">
            You have <span className="text-white">{wishlist.length}</span> {wishlist.length === 1 ? 'book' : 'books'} in your wishlist.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {wishlist.map(item => (
              <WishlistCard key={item._id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
