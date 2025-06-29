import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-4">
      <h1 className="text-9xl font-extrabold tracking-wider">404</h1>
      <p className="text-2xl mt-4 mb-2 font-semibold">Page Not Found</p>
      <p className="text-sm mb-6 text-white/80">Sorry, the page you are looking for doesn’t exist or has been moved.</p>

      <Link
        to="/"
        className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-200"
      >
        Go Home
      </Link>

      {/* Optional Image or Icon */}
      <div className="mt-8">
        <svg className="w-32 h-32 opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75L6 6m12 0l-3.75 3.75M3 13.5l1.5 1.5a9 9 0 0014.992 1.5L21 13.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFoundPage;
