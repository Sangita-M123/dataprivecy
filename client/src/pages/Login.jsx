// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/ContextProvider";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false); // Added loading state
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert("Please enter both email and password.");
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
  
//       if (res.data.success && res.data.user && res.data.user.id) {
//         login(res.data.user, res.data.token); 
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userId", res.data.user.id); // Ensure user ID is stored correctly
//         alert("Login successful! Set your lock screen password.");
//         navigate("/lockscreen");
//       } else {
//         alert("Login failed: " + (res.data.message || "Unexpected error"));
//       }
//     } catch (error) {
//       console.error("Login Error:", error.response?.data || error.message);
//       alert("Error logging in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
//           Sign In
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label
//               className="block text-gray-700 font-medium mb-1"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               className="block text-gray-700 font-medium mb-1"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-3 rounded-md text-lg font-semibold transition duration-300 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700"
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-4 text-lg">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-indigo-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://dataprivecy-2.onrender.com/api/auth/login", { email, password });

      if (res.data.success && res.data.user && res.data.user.id) {
        login(res.data.user, res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        alert("Login successful! Set your lock screen password.");
        navigate("/lockscreen");
      } else {
        alert("Login failed: " + (res.data.message || "Unexpected error"));
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          🚀 Sign In
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-5">
            <label
              className="block text-gray-700 font-medium mb-1 text-lg"
              htmlFor="email"
            >
              📧 Email
            </label>
            <input
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 text-lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label
              className="block text-gray-700 font-medium mb-1 text-lg"
              htmlFor="password"
            >
              🔒 Password
            </label>
            <input
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 text-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 transform hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "🔄 Logging in..." : "🚀 Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-700 mt-6 text-lg">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
