import React from 'react';
import { MdRemoveShoppingCart } from 'react-icons/md';

const EmptyProducts = () => {
  return (
   <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  text-white">
  <MdRemoveShoppingCart className="text-7xl sm:text-8xl mb-4 text-purple-400 drop-shadow-lg" />
  
  <h2 className="text-2xl text-purple-900 sm:text-3xl font-bold mb-2">
    No Products Found
  </h2>
  
  <p className="text-base sm:text-lg text-purple-700/80 max-w-md">
    Looks like our store is taking a break right now. Please check back later for exciting new products!
  </p>
</div>
  );
};

export default EmptyProducts;
