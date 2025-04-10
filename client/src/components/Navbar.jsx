// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/ContextProvider";

// const Navbar = ({ setQuery }) => {
//   const { user, Logout } = useAuth();

//   return (
//     <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
//       <div className="text-xl font-bold">
//         <Link to="/">DataSecurity</Link>
//       </div>
//       <input
//         type="text"
//         placeholder="Search Data.."
//         className="bg-gray-600 px-4 py-2 rounded"
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <div>
//         {user ? (
//           <>
//             <span className="mr-4">{user.name}</span>
//             <button onClick={Logout} className="bg-red-500 px-4 py-2 rounded">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
//               Login
//             </Link>
//             <Link to="/register" className="bg-green-500 px-4 py-2 rounded">
//               Signup
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, Logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-5 text-white flex justify-between items-center">
      
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wide hover:scale-105 transition duration-300">
        <Link to="/" className="hover:text-yellow-300 transition">DataSecurity</Link>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Data..."
        className="w-72 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none transition"
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* User Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium text-lg">{user.name}</span>
            <button
              onClick={Logout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
