import "./index.css";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockScreen from "./pages/LockScreen";
import NoteDetails from "./pages/NoteDetails"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/lockscreen" element={<LockScreen />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/note/:id" element={<NoteDetails />} ></Route>
        <Route path="/register" element={<Signup />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
