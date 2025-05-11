import { useEffect, useState } from 'react';
import API from '../api/api';
import WishlistCard from '../components/wishlistCard';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    API.get('/wishlist').then(res => setWishlist(res.data));
  }, []);

  const handleRemove = (id) => {
    setWishlist(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlist.map(item => (
          <WishlistCard key={item._id} item={item} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
