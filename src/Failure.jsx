

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function Success() {
  const location = useLocation();
const navigate = useNavigate();

  const { name, error } = location.state || {};

  // If no state, redirect to /page
  useEffect(() => {
    if (!name && !error) {
      navigate("/");
    }
  }, [name, error, navigate]);
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center px-4 py-8 md:py-12">

      {/* Brand Logo */}
      <img
        src="/logo.png"
        alt="SecureMyBook Logo"
        className="w-28 md:w-40 mb-8 md:mb-10"
      />

      {/* Main Card */}
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
  {error
    ? error                   // Show error if available
    : "This copy of the book may be a pirated version."}  {/* Fallback text */}
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

      {/* Footer */}
      <div className="mt-10 md:mt-12 flex flex-col items-center">
        <img
          src="/man.png"
          alt="Man Kind Logo"
          className="w-20 mb-3"
        />

        <p className="text-sm text-slate-700 font-semibold">
          SECUREMYBOOK.com
        </p>

        <p className="text-xs text-slate-500 mt-2 text-center max-w-xs">
          Every genuine reader writes a better story for authors
        </p>
      </div>

    </div>
  );
}
