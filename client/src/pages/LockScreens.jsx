// import React, { useState } from "react";
// import axios from "axios";

// const LockScreens = ({ noteId, onUnlockSuccess }) => {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleUnlock = async () => {
//     try {
//       const res = await axios.post(`/api/note/unlock/${noteId}`, {
//         password,
//       });

//       if (res.data.success) {
//         onUnlockSuccess();  // ✅ Unlock the note
//       } else {
//         setError("Incorrect password.");
//       }
//     } catch (error) {
//       console.error("Unlock error:", error);
//       setError("Server error.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h2 className="text-2xl font-bold">Enter Note Password</h2>
//       <input
//         type="password"
//         placeholder="Enter password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 mt-4 w-64"
//       />
//       <button
//         onClick={handleUnlock}
//         className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
//       >
//         Unlock
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default LockScreens;
import React, { useState } from "react";
import axios from "axios";

const LockScreens = ({ noteId, onUnlockSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = async () => {
    try {
      const res = await axios.post(`/api/note/unlock/${noteId}`, {
        password,
      });

      if (res.data.success) {
        onUnlockSuccess(); // ✅ Unlock the note
      } else {
        setError("Incorrect password.");
      }
    } catch (error) {
      console.error("Unlock error:", error);
      setError("Server error.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🔒 Enter Note Password
        </h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
        />

        <button
          onClick={handleUnlock}
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          ✅ Unlock
        </button>

        {error && (
          <p className="text-red-600 text-center mt-4 font-semibold">
            ⚠️ {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LockScreens;
