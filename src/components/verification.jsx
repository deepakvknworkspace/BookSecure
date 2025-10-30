import { useEffect, useState } from "react"
import "../index.css";
import { useNavigate, useParams } from "react-router-dom";

export function VerificationForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    captcha: "",
  })
  const [isLoading, setIsLoading] = useState(false)
   const [urlSerial, setUrlSerial] = useState(null);
    const [name, setName] = useState("");
  const navigate = useNavigate();
     const { sl } = useParams(); 
      console.log('sl is',sl)




  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Predefined / hardcoded serial number
    const predefinedSerial = "123456";

    // Compare the one from the URL with the hardcoded one
    if (sl === predefinedSerial) {
        console.log('virify name is ',name)
      //Match → Navigate to Success page
         navigate("/success", { state: { name } });
    } else {
      // → Show error
      navigate("/failure");
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Contact Field */}
      <div className="space-y-2">
        <label htmlFor="contact" className="text-sm font-semibold text-gray-700">
          Contact
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="Enter your email or phone"
          value={formData.contact}
          onChange={handleChange}
          required
          className="h-12 w-full px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
      </div>

      {/* CAPTCHA Field */}
      <div className="space-y-2">
        <label htmlFor="captcha" className="text-sm font-semibold text-gray-700">
          CAPTCHA
        </label>
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-gray-100 rounded-lg p-3 border-2 border-gray-300">
            <div className="font-mono text-lg font-bold text-gray-700 tracking-widest select-none">BIMKABR</div>
          </div>
          <input
            id="captcha"
            name="captcha"
            type="text"
            placeholder="Enter text"
            value={formData.captcha}
            onChange={handleChange}
            required
            className="h-12 flex-1 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
        className={`w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-full transition-all duration-200 flex items-center justify-center gap-2 mt-8 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {isLoading ? "Verifying..." : "VERIFY NOW"}
      </button>
    </form>
  )
}
