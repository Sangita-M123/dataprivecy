// import React, { useState } from "react";
// import axios from "axios";
// import {Link} from 'react-router-dom'
// import {useNavigate} from "react-router-dom"

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate=useNavigate();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "api/auth/register",
//         {
//           name,
//           email,
//           password,
//         }
//       );
//       if(res.data.success){

//         navigate('/login')
//   }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
//           Sign Up
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label
//               className="block text-gray-700 font-medium mb-1"
//               htmlFor="name"
//             >
//               Name
//             </label>
//             <input
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               className="block text-gray-700 font-medium mb-1"
//               htmlFor="email"
//             >
//               Email{" "}
//             </label>
//             <input
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl"
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
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
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Create a password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
//           >
//             Create Account
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-4 text-2xl">
//           Already have an account?{" "}
//           <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://dataprivecy-2.onrender.com/api/auth/register", { name, email, password });
      
      if (res.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-8">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-lg w-full transition-transform transform hover:scale-105">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🚀 Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 hover:shadow-lg transition duration-300"
          >
            ✅ Create Account
          </button>
        </form>

        {/* Navigation to Login */}
        <p className="text-center text-gray-700 mt-6 text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline transition duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
