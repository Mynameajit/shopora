import React from 'react';

const Footer = ({ footer=true }) => {
 
  
  return (
    <footer style={{ display: footer ? "block" : "none" }} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">ShopEase</h3>
            <p className="text-sm">Your one-stop shop for everything trendy and affordable.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">Deals</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-2">Subscribe</h4>
            <form className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="px-3 py-2 rounded-md text-gray focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 text-center text-sm border-t border-white/30 pt-4">
          &copy; {new Date().getFullYear()} Shopora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
