// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// const authContext = createContext();

// const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (user) => {
//     setUser(user);
//   };
//   const Logout=()=>{
//     localStorage.removeItem('token')  
//     setUser(null)  
// }
//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const res = await axios.get("/api/auth/verify", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (res.data.success) {
//           setUser(res.data.user);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     verifyUser();
//   }, []);

//   return (
//     <authContext.Provider value={{ user, setUser,Logout }}>
//       {children}
//     </authContext.Provider>
//   );
// };

// export const useAuth = () => useContext(authContext);

// export default ContextProvider;

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage on page reload
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user)); // Ensure user is stored
          setUser(res.data.user);
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("User verification failed:", error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    
    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, login, Logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default ContextProvider;
