import { useEffect, useState, Suspense, lazy } from 'react';
import { UseProductContext } from '../context/ProductProvider';
import AppLayout from '../layout/AppLayout';
import { Link } from 'react-router-dom';
import { UseAuthContext } from '../context/AuthProvider';
import { ShoppingCart } from "lucide-react";

// ✅ Lazy Load Components
const CartItem = lazy(() => import('../components/CartItem'));
const EmptyCart = lazy(() => import('../components/EmptyCart '));

const Cart = () => {
  const {
    cart,
    removeFromCart,
    getTotalAmount,
    decreaseQuantity,
    increaseQuantity,
  } = UseProductContext() || {};

  const { user } = UseAuthContext() || {};

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 lg:py-6 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500">
            🛒 Your Cart
          </h1>

          {cart?.length === 0 ? (
            <Suspense fallback={<p className="text-center py-8">Loading your cart...</p>}>
              <EmptyCart />
            </Suspense>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 sm:gap-6">
              {/* 🧺 Cart Items Section */}
              <div className="lg:col-span-2 grid grid-cols-1 gap-6 py-4 px-3">
                <Suspense fallback={<p>Loading items...</p>}>
                  {cart?.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </Suspense>
              </div>

              {/* 💳 Checkout Summary Section */}
              <div className="bg-white/80 backdrop-blur-md shadow-2xl 
                  fixed bottom-0 left-1/2 -translate-x-1/2 z-20 
                  w-full max-w-md px-4 py-8 lg:h-fit
                  sm:rounded-t-3xl sm:px-6 sm:py-8
                  lg:static lg:sticky lg:top-56 lg:translate-x-0 
                  lg:rounded-2xl lg:shadow-md lg:w-[400px] lg:mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-pink-500" />
                    Total Amount
                  </h2>
                  <p className="text-2xl sm:text-3xl text-pink-600 font-extrabold">
                    ₹{getTotalAmount ? getTotalAmount() : ""}
                  </p>
                </div>

                <Link
                  to={
                    user?.addresses?.length > 0
                      ? "/order-summary"
                      : "/shipping-details"
                  }
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full py-2.5 rounded-xl font-semibold text-center 
                    hover:scale-102 transition-transform duration-300 shadow-md flex items-center justify-center gap-3 lg:mt-8"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Cart;
