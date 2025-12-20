import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../src/Slice/adminAuthSlice";
import { useDispatch } from "react-redux";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://api.securemybook.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

     dispatch(
    loginSuccess({
      user: data.user,   // { id, name }
      token: data.token, // JWT token
    })
  );

      // ✅ Navigate to dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-12 relative">
      
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 w-full max-w-2xl relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/40 blur-3xl -z-10"></div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Admin <span className="text-purple-600">Login</span>
          </h1>
          <p className="text-gray-500">
            Secure access for administrators only
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img
            src="/logo.png"
            alt="Book Secure Logo"
            width={260}
            className="drop-shadow-lg"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium shadow-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>

      <div className="absolute bottom-6 right-6">
        <img
          src="/verified-badge.png"
          alt="Secure Admin"
          className="w-20 md:w-28 drop-shadow-lg"
        />
      </div>
    </main>
  );
}
