import React from 'react';

const Footer = ({ footer = true }) => {
  return (
    <footer
      style={{ display: footer ? 'block' : 'none' }}
      className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-10 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Shopora</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for everything trendy, affordable, and delivered to your door.
            </p>
            <p className="mt-3 text-xs text-white/80">📧 project154321@gmail.com</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline hover:text-white/90">Home</a></li>
              <li><a href="#" className="hover:underline hover:text-white/90">Shop</a></li>
              <li><a href="#" className="hover:underline hover:text-white/90">Deals</a></li>
              <li><a href="#" className="hover:underline hover:text-white/90">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline hover:text-white/90">FAQs</a></li>
              <li><a href="#" className="hover:underline hover:text-white/90">Shipping & Returns</a></li>
              <li><a href="#" className="hover:underline hover:text-white/90">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline hover:text-white/90">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">Stay Updated</h4>
            <p className="text-sm mb-2">Subscribe to our newsletter</p>
            <form className="flex flex-col sm:flex-row items-center gap-2 mt-2">
              <input
                type="email"
                placeholder="your email"
                className="w-full px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs text-white/80">
          &copy; {new Date().getFullYear()} <strong>Shopora</strong>. All rights reserved. |
          Built with 💖 by <a href="mailto:project154321@gmail.com" className="underline ml-1 hover:text-white">project154321@gmail.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
