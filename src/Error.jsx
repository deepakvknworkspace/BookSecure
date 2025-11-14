import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div
        role="alert"
        aria-labelledby="unauth-title"
        aria-describedby="unauth-desc"
        className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 md:p-8 text-center"
      >
        {/* Illustration */}
        <div className="mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
          {/* simple lock icon SVG */}
          <svg
            className="w-16 h-16 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 6a2 2 0 114 0v2h-4V8z" />
          </svg>
        </div>

        <h1 id="unauth-title" className="text-2xl font-semibold text-gray-800 mb-2">
          401 — Unauthorized
        </h1>

        <p id="unauth-desc" className="text-sm text-gray-600 mb-6">
          You don’t have permission to access this resource. Please sign in with
          the correct account or contact support if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Sign in
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            Back to Home
          </button>
        </div>

        <button
          onClick={() => navigate("/support")}
          className="mt-4 text-xs text-gray-500 hover:text-gray-700"
        >
          Contact support
        </button>
      </div>
    </div>
  );
}
