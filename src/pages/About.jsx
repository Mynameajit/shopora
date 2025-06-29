// About.jsx
import { Users, ShieldCheck, Rocket, Sparkles } from 'lucide-react';
import AppLayout from '../layout/AppLayout';

const About = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">About Shopora</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            Elevating your online shopping experience with style, simplicity, and satisfaction.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4 mx-auto">
                <Sparkles className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-indigo-600 mb-2">Our Vision</h2>
              <p className="text-gray-600">Creating a smarter way to shop — with trust, convenience, and joy.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
                <ShieldCheck className="text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-purple-600 mb-2">Trusted Quality</h2>
              <p className="text-gray-600">Every product is carefully curated and quality-checked for your satisfaction.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4 mx-auto">
                <Rocket className="text-pink-500" />
              </div>
              <h2 className="text-xl font-bold text-pink-500 mb-2">Fast Delivery</h2>
              <p className="text-gray-600">Quick, safe, and reliable delivery service to your doorstep.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4 mx-auto">
                <Users className="text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-yellow-600 mb-2">Customer First</h2>
              <p className="text-gray-600">We put you at the centre with 24/7 support and easy returns.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
