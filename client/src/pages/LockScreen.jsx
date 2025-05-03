// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LockScreen = () => {
//   const navigate = useNavigate();
//   const [lockPassword, setLockPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [savedPassword, setSavedPassword] = useState(false);
//   const [userId, setUserId] = useState("");

//   const inputRef = useRef(null);

//   // useEffect(() => {
//   //   inputRef.current?.focus(); // Auto-focus input field on render

//   //   const token = localStorage.getItem("token");
//   //   if (!token) {
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   try {
//   //     const storedUserId = localStorage.getItem("userId");
//   //     if (storedUserId) {
//   //       setUserId(storedUserId);
//   //       fetchLockStatus(storedUserId);
//   //     } else {
//   //       alert("User ID not found. Please log in again.");
//   //       navigate("/login");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching user ID:", error);
//   //     navigate("/login");
//   //   }
//   // }, [navigate]);
//   useEffect(() => {
//     inputRef.current?.focus();
  
//     const token = localStorage.getItem("token");
//     const storedUserId = localStorage.getItem("userId");
  
//     if (!token || !storedUserId) {
//       alert("User ID missing. Please log in again.");
//       navigate("/login");
//       return;
//     }
  
//     setUserId(storedUserId);
//     fetchLockStatus(storedUserId);
//   }, [navigate]);
  

//   const fetchLockStatus = async (userId) => {
//     try {
//       const res = await axios.get(`/api/auth/get-lock-status/${userId}`);
//       if (res.data.hasLockPassword) {
//         setSavedPassword(true);
//       }
//     } catch (error) {
//       console.error("Error fetching lock status:", error);
//     }
//   };

  

//   const handleSetPassword = async () => {
//     console.log("User ID:", userId); // Debugging
  
//     if (!userId) {
//       alert("User ID is missing. Please log in again.");
//       return;
//     }
//     if (lockPassword.length < 4) {
//       alert("Password should be at least 4 characters long.");
//       return;
//     }
  
//     try {
//       const res = await axios.post("/api/auth/set-lock-password", {
//         userId,
//         lockPassword,
//       });
  
//       if (res.data.success) {
//         alert("Lock password set successfully!");
//         setSavedPassword(true);
//         setLockPassword(""); // Clear input field
//       } else {
//         alert("Failed to set lock password.");
//       }
//     } catch (error) {
//       console.error("Error setting lock password:", error);
//       alert("Error setting lock password.");
//     }
//   };
  

//   const handleUnlock = async () => {
//     if (!userId) {
//       alert("User ID is missing. Please log in again.");
//       return;
//     }
//     if (confirmPassword.trim() === "") {
//       alert("Please enter your lock password.");
//       return;
//     }

//     try {
//       const res = await axios.post("/api/auth/verify-lock-password", {
//         userId,
//         lockPassword: confirmPassword,
//       });

//       if (res.data.success) {
//         alert("Unlocked successfully!");
//         navigate("/"); // Unlock and navigate to home
//       } else {
//         alert("Incorrect password. Try again.");
//       }
//     } catch (error) {
//       console.error("Error verifying lock password:", error);
//       alert("Error verifying lock password.");
//     } finally {
//       setConfirmPassword(""); // Clear input field after attempt
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
//           Lock Screen
//         </h2>
//         {!savedPassword ? (
//           <>
//             <p className="text-center text-gray-600 mb-4">
//               Set a lock screen password:
//             </p>
//             <input
//               ref={inputRef}
//               type="password"
//               placeholder="Set Lock Password"
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={lockPassword}
//               onChange={(e) => setLockPassword(e.target.value)}
//             />
//             <button
//               onClick={handleSetPassword}
//               className="w-full mt-4 bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300"
//             >
//               Set Password
//             </button>
//           </>
//         ) : (
//           <>
//             <p className="text-center text-gray-600 mb-4">
//               Enter your lock password to continue:
//             </p>
//             <input
//               ref={inputRef}
//               type="password"
//               placeholder="Enter Lock Password"
//               className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <button
//               onClick={handleUnlock}
//               className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
//             >
//               Unlock
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LockScreen;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LockScreen = () => {
  const navigate = useNavigate();
  const [lockPassword, setLockPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState(false);
  const [userId, setUserId] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
  
    if (!token || !storedUserId) {
      alert("User ID missing. Please log in again.");
      navigate("/login");
      return;
    }
  
    setUserId(storedUserId);
    fetchLockStatus(storedUserId);
  }, [navigate]);

  const fetchLockStatus = async (userId) => {
    try {
      const res = await axios.get(`/api/auth/get-lock-status/${userId}`);
      if (res.data.hasLockPassword) {
        setSavedPassword(true);
      }
    } catch (error) {
      console.error("Error fetching lock status:", error);
    }
  };

  const handleSetPassword = async () => {
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }
    if (lockPassword.length < 4) {
      alert("Password should be at least 4 characters long.");
      return;
    }
  
    try {
      const res = await axios.post("/api/auth/set-lock-password", {
        userId,
        lockPassword,
      });
  
      if (res.data.success) {
        alert("Lock password set successfully!");
        setSavedPassword(true);
        setLockPassword(""); // Clear input field
      } else {
        alert("Failed to set lock password.");
      }
    } catch (error) {
      console.error("Error setting lock password:", error);
      alert("Error setting lock password.");
    }
  };

  const handleUnlock = async () => {
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }
    if (confirmPassword.trim() === "") {
      alert("Please enter your lock password.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/verify-lock-password", {
        userId,
        lockPassword: confirmPassword,
      });

      if (res.data.success) {
        alert("Unlocked successfully!");
        navigate("/"); // Unlock and navigate to home
      } else {
        alert("Incorrect password. Try again.");
      }
    } catch (error) {
      console.error("Error verifying lock password:", error);
      alert("Error verifying lock password.");
    } finally {
      setConfirmPassword(""); // Clear input field after attempt
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 backdrop-blur-md bg-opacity-90">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🔒 Lock Screen
        </h2>
        
        {!savedPassword ? (
          <>
            <p className="text-center text-gray-600 mb-6">
              Set a lock screen password:
            </p>
            <input
              ref={inputRef}
              type="password"
              placeholder="Set Lock Password"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
              value={lockPassword}
              onChange={(e) => setLockPassword(e.target.value)}
            />
            <button
              onClick={handleSetPassword}
              className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
            >
              ✅ Set Password
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-6">
              Enter your lock password to continue:
            </p>
            <input
              ref={inputRef}
              type="password"
              placeholder="Enter Lock Password"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleUnlock}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
            >
              🔓 Unlock
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LockScreen;
