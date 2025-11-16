// import { useState } from "react";
// import "../index.css";
// import { useNavigate, useParams } from "react-router-dom";

// export function VerificationForm() {
//   const [formData, setFormData] = useState({
//     contact: "",
//     captcha: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [name, setName] = useState("");
//   const navigate = useNavigate();
//   const { sl } = useParams(); // serial from URL
//   console.log("Serial from URL:", sl);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Prepare data to send
//       const payload = {
//        serialNumber: sl,
//         phoneNumber: formData.contact,
//         userName: name, // from the URL
//       };

//       const response = await fetch("https://api.securemybook.com/serials/verify-book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log("Backend response:", data);

//       if (response.ok && data.success) {
//         // ✅ Book verified successfully
//         navigate("/success", { state: { name } });
//       } else {
//         const error=data.message
//         // ❌ Verification failed
//         navigate("/failure", { state: { name ,error} });
//       }
//     } catch (error) {
//       console.error("Error verifying book:", error);
//       navigate("/failure");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Name Field */}
//       <div className="space-y-2">
//         <label htmlFor="name" className="text-sm font-semibold text-gray-700">
//           Name
//         </label>
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
//           required
//         />
//       </div>

//       {/* Contact Field */}
//       <div className="space-y-2">
//         <label htmlFor="contact" className="text-sm font-semibold text-gray-700">
//           Contact
//         </label>
//         <input
//           id="contact"
//           name="contact"
//           type="text"
//           placeholder="Enter your phone number"
//           value={formData.contact}
//           onChange={handleChange}
//           required
//           className="h-12 w-full px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
//         />
//       </div>

   

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isLoading}
//         className={`w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-full transition-all duration-200 flex items-center justify-center gap-2 mt-8 ${
//           isLoading ? "opacity-70 cursor-not-allowed" : ""
//         }`}
//       >
//         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//           <path
//             fillRule="evenodd"
//             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//             clipRule="evenodd"
//           />
//         </svg>
//         {isLoading ? "Verifying..." : "VERIFY NOW"}
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";

export function VerificationForm() {
  const [formData, setFormData] = useState({
    contact: "",
    captcha: "",
  });
  const [phoneError, setPhoneError] = useState(""); // <-- NEW
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { sl } = useParams();

  // 🔍 Phone Validation Function
  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/; 
    return phoneRegex.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Validate while typing
      if (!validatePhoneNumber(value)) {
        setPhoneError("Please enter a valid 10-digit mobile number");
      } else {
        setPhoneError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Stop submit if invalid
    if (!validatePhoneNumber(formData.contact)) {
      setPhoneError("Invalid phone number. Enter 10 digits.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        serialNumber: sl,
        phoneNumber: formData.contact,
        userName: name,
      };

      const response = await fetch("https://api.securemybook.com/serials/verify-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/success", { state: { name } });
      } else {
        const error = data.message;
        navigate("/failure", { state: { name, error } });
      }
    } catch (error) {
      console.error("Error verifying book:", error);
      navigate("/failure");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-1 border rounded-lg"
          required
        />
      </div>

      {/* Contact Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Contact</label>
        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="Enter your phone number"
          value={formData.contact}
          onChange={handleChange}
          required
          className={`h-12 w-full px-4 border rounded-lg outline-none transition-all
            ${phoneError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-200"}`}
        />

        {/* Error Message */}
        {phoneError && (
          <p className="text-red-500 text-sm">{phoneError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full mt-8 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Verifying..." : "VERIFY NOW"}
      </button>
    </form>
  );
}

