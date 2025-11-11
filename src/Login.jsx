import { VerificationForm } from "./components/verification";

export default function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-12 relative">
  
      {/* Center Box */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 w-full max-w-3xl relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-green-100/40 blur-3xl -z-10"></div>


<div className="w-full max-w-md text-center mb-8">
        <h1 className="text-xl md:text-2xl text-gray-800 mb-2 leading-relaxed">
          Every <span className="text-green-600 font-semibold">genuine</span> reader
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-800 leading-relaxed">
          writes a better <span className="text-green-600 font-semibold">story</span> for authors
        </h2>
      </div>

        {/* Logo and tagline */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Book Secure Logo"
              width={300}
              height={120}
              className="drop-shadow-lg"
            />
          </div>
         
        </div>

        {/* Verification form */}
        <div className="w-full">
          <VerificationForm />
        </div>
      </div>

      {/* Bottom Right Logo */}
      <div className="absolute bottom-6 right-6">
        <div className="w-20 md:w-28 h-auto">
          <img
            src="/verified-badge.png"
            alt="Man Kind Logo"
            className="object-contain w-full h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </main>
  );
}
