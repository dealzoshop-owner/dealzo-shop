import Image from "next/image";
import { Search } from "lucide-react";

export default function ComingSoon() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Dealzo
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-2">
              India’s Smartest Price Comparison Engine
            </p>
          </div>

          {/* Big Search Bar (Fake but looks real) */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Paste Amazon / Flipkart link or search product..."
                className="w-full px-6 py-5 pr-16 text-lg rounded-2xl shadow-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                disabled
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Countdown Style Message */}
          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-semibold text-gray-800">
              Launching in a few hours...
            </p>
            <p className="text-xl text-gray-600">
              Get ready for the lowest prices on Amazon, Flipkart, Myntra & 50+ stores
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-gray-600">
                <span className="text-2xl font-bold text-green-600">100%</span><br />
                Genuine Products
              </div>
              <div className="text-gray-600">
                <span className="text-2xl font-bold text-blue-600">Real-time</span><br />
                Price Tracking
              </div>
              <div className="text-gray-600">
                <span className="text-2xl font-bold text-amber-600">Best Deals</span><br />
                Guaranteed
              </div>
            </div>

            <p className="mt-16 text-sm text-gray-500">
              © 2025 Dealzo • Made in India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
