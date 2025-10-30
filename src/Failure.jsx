import React from "react";

export default function Failure() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Top Left Logo */}
      <div className="absolute top-6 left-6">
        <img
          src="/logo.png"
          alt="Book Secure Logo"
          className="w-40 md:w-52 drop-shadow-lg"
        />
      </div>

      {/* Top Right Badge */}
      {/* <div className="absolute top-6 right-6 text-right">
        <img
          src="/verified-badge.png"
          alt="Get Verified Your Own Books"
          className="w-32 md:w-36 drop-shadow-md mx-auto"
        />
        <p className="text-xs md:text-sm text-gray-800 mt-1 font-medium">
          GET VERIFIED<br />YOUR OWN BOOKS
        </p>
      </div> */}

      {/* Warning Box */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 max-w-4xl w-full text-center border border-red-100">
        {/* Danger Icon */}
        <div className="flex justify-center mb-8">
          <img
            src="/danger.png"
            alt="Danger Icon"
            className="w-24 md:w-28"
          />
        </div>

        {/* Main Warning Text */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          This copy of the book may be a pirated version.
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Please ensure that you obtain and read only the genuine, original edition.
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Book piracy is a punishable offence under copyright law.<br />
          It harms authors, publishers, and the literary community.
        </p>

        {/* Emphasis Line */}
        <p className="text-lg font-medium text-red-600 mt-6">
          Be a responsible reader — support original works.
        </p>
        {/* Try Again Button */}
      </div>

      {/* Bottom Right Logo */}
      <div className="absolute bottom-6 right-6">
        <div className="w-28 md:w-32 h-auto">
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
