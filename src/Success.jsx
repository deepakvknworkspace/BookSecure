import React from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
 const location = useLocation();
     const { name } = location.state || { name: "User" };
     console.log("name",location.state)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center relative">
      {/* Top Left Logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Book Secure Logo"
          className="w-40 md:w-52 drop-shadow-lg"
        />
      </div>

      {/* Top Right Verified Badge */}
      <div className="absolute top-6 right-6">
        <img
          src="/verified-badge.png"
          alt="Verified Badge"
          className="w-28 drop-shadow-md"
        />
      </div>

      {/* Center Box */}
      <main className="flex items-center justify-center flex-1 w-full px-6 py-12">
        <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 w-full max-w-6xl relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-green-100/30 blur-3xl -z-10"></div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Left - Book Cover */}
            <div className="flex-shrink-0 text-center">
              <div className="relative w-44 h-72 md:w-52 md:h-80 rounded-xl overflow-hidden shadow-xl mx-auto">
                <img
                  src="/book.jpg"
                  alt="Book Cover"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-4 font-medium">
                Version : 15
              </p>
            </div>

            {/* Center - Congratulations Message */}
            <div className="flex-1 text-center">
              {/* Decorative SVG Title */}
              <div className="relative mb-8">
                <svg
                  className="w-full h-32 mb-4"
                  viewBox="0 0 600 150"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <text
                    x="300"
                    y="100"
                    fontSize="50"
                    fontWeight="bold"
                    fontFamily="cursive"
                    fill="#1F2937"
                    textAnchor="middle"
                  >
                    Congratulations!
                  </text>
                </svg>
              </div>

              {/* Verified Reader Details */}
              <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                 {name}!
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                You’re the verified reader of
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                Ettavum Priyappetta Ennodu
              </h3>
              <p className="text-lg text-gray-700">by : Nimna Vijay</p>
            </div>


           
          </div>
        </div>
      </main>

      {/* Bottom Right Logo */}
      {/* Bottom Right Logo */}
<div className="absolute bottom-6 right-6">
  <div className="w-20 md:w-30 h-auto">
    <img
      src="/man.png"
      alt="Man Kind Logo"
      className="object-contain w-full h-auto drop-shadow-lg"
    />
  </div>
</div>

    </div>
  );
}
