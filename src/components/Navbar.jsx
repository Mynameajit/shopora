import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseAuthContext } from '../context/AuthProvider';
import { CgProfile } from "react-icons/cg";
import { UseProductContext } from '../context/ProductProvider';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login condition
  const { user } = UseAuthContext()
  const { cart, handleSearchProducts } = UseProductContext()||{}

  const [keyword, setKeyword] = useState("");

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'MyOrder', link: '/my-order' },
  ];


  const handleSearch = () => {
    if (!keyword) {
      return null
    }
    handleSearchProducts(keyword)

  }


  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-14">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={'/'} className="text-2xl font-bold cursor-pointer"> 🛍️ Shopora</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {menuItems.map((item, index) => {

              if (item.name === 'MyOrder' && !user) return null;
              return <Link
                key={index}
                to={item.link}
                className="text-white px-2 py-1.5 rounded-lg hover:bg-gray-100 hover:text-blue-700 cursor-pointer transition-colors font-medium"
              >
                {item.name}
              </Link>
            })

            }

            {/* Search */}
            <div className="relative border py-1 border-white-300 rounded-lg overflow-hidden">
              <input
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                type="text"
                placeholder="Search..."
                className="px-4 py-2 w-48 text-white focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
                <svg className="text-[#00cccc] w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Cart Icon */}
            <button className="relative hover:text-yellow-300 cursor-pointer">
              <Link to={"/add-card"}>
                <svg className=" w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h11L17 13H7z" />
                </svg>
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">{cart.length}</span>
              </Link>
            </button>

            {/* Login/Profile */}
            <div className="ml-4">
              {!user ? (
                <Link
                  to="/signup"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md font-semibold"
                >
                  Login
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md font-semibold"
                >
                  <CgProfile size={20} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

              )}
            </div>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden ">

            {/* Cart Icon */}
            <button className="relative hover:text-yellow-300 cursor-pointer mr-4">
              <Link to={"/add-card"}>
                <svg className=" w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h11L17 13H7z" />
                </svg>
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">3</span>
              </Link>
            </button>


            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none text-white cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-white text-gray-800 space-y-2">

          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 cursor-pointer font-medium"
            >
              {item.name}
            </Link>
          ))}

          {/* Search */}
          <div className="relative my-2 border border-gray-300 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-800 focus:outline-none"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}

            />
            <button
              onClick={handleSearch}

              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Login/Profile */}
          <div className="mt-3">
            {!user ? (
              <Link
                to="/signup"
                className="w-full block text-center bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/profile"
                className="w-full text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CgProfile size={20} />
                My Account
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
