import React from 'react';
import { loadingLogo } from '../utils/imageData';

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      <div className="relative w-24 h-24">
        {/* Glowing Border Spinner */}
        <div className="absolute inset-0 w-full h-full animate-spin border-3 border-orange-400 border-t-transparent rounded-full shadow-md"></div>

        {/* Logo with Pulse and Glow */}
        <img
          src={loadingLogo}
          alt="Loader"
          className="absolute top-2 left-2 w-20 h-20 rounded-full object-cover animate-pulse shadow-[0_0_12px_#ff5f6d]"
        />
      </div>
    </div>
  );
};

export default Loader;
