import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
  // const { name } = location.state || { name: "User" };

  const name = location.state?.name;

 
  useEffect(() => {
    if (!name || name.trim() === "") {
      navigate("/");
    }
  }, [name, navigate]);

  // Avoid rendering before redirect
  if (!name) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center px-4 py-8 md:py-12">

      {/* Brand Logo */}
      <img
        src="/logo.png"
        alt="SecureMyBook Logo"
        className="w-28 md:w-40 mb-8 md:mb-10"
      />

      {/* Main Card */}
      <div className="
        w-full max-w-md bg-white 
        rounded-2xl border border-slate-200 
        p-6 md:p-8 text-center shadow-sm
      ">

        {/* Book Image */}
       <div className="w-40 h-60 md:w-56 md:h-84 mx-auto rounded-lg overflow-hidden mb-6">
  <img
    src="/book.png"
    alt="Book Cover"
    className="w-full h-full object-cover"
  />
</div>


        {/* Version */}
        <p className="text-xs text-slate-500 mb-4 tracking-wide">Version : 15</p>

        {/* Congratulations Image */}
        <img
          src="/congrats.png"
          className="w-full max-w-xs mx-auto mb-6"
          alt="Congratulations"
        />

        {/* Content Section */}
        <div className="space-y-2 mb-6">
          {/* Reader Name */}
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
            {name}
          </h2>

          <p className="text-slate-600 text-sm">
            You're the verified reader of
          </p>

          {/* Book Name */}
          <h3 className="text-lg md:text-xl font-medium text-green-600 mb-1">
            Ettavum Priyappetta Ninnodu
          </h3>

          {/* Author */}
          <p className="text-slate-600 text-sm">by : Nimna Vijay</p>
        </div>

        {/* Verified Badge */}
        <img
          src="/verified-badge.png"
          className="w-16 mx-auto"
          alt="Verified Badge"
        />
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
