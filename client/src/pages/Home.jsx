// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import DataModal from "../components/DataModal";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import NoteCard from "../components/NoteCard";
// import { toast } from "react-toastify";

// const Home = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [currentNote, setCurrentNote] = useState(null);
//   const [query, setQuery] = useState("");
//   const [filteredNotes, setFilteredNotes] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     } else {
//       fetchNotes();
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setFilteredNotes(
//       (notes || []).filter(
//         (note) =>
//           note.title?.toLowerCase().includes(query.toLowerCase()) ||
//           note.description?.toLowerCase().includes(query.toLowerCase())
//       )
//     );
//   }, [query, notes]);

//   const fetchNotes = async () => {
//     try {
//       const { data } = await axios.get("/api/note", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setNotes(data.notes || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setCurrentNote(null);
//   };

//   const onEdit = (note) => {
//     setCurrentNote(note);
//     setModalOpen(true);
//   };

//   // ✅ FIX: Create FormData in Home.jsx
//   const addNote = async ({ title, description, files, password }) => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("password", password);

//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       const res = await axios.post("/api/note/add", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.data.success) {
//         toast.success("Note added successfully!");
//         fetchNotes();
//         closeModal();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const editNote = async (id, { title, description, files, password }) => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("password", password);

//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       const res = await axios.put(`/api/note/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.data.success) {
//         toast.success("Note updated successfully!");
//         fetchNotes();
//         closeModal();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteNotes = async (id) => {
//     try {
//       const res = await axios.delete(`/api/note/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       if (res.data.success) {
//         toast.success("Note deleted");
//         fetchNotes();
//         closeModal();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar setQuery={setQuery} />
//       <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredNotes.length > 0 ? (
//           filteredNotes.map((note) => (
//             <NoteCard
//               key={note._id}
//               note={note}
//               onEdit={onEdit}
//               deleteNotes={deleteNotes}
//             />
//           ))
//         ) : (
//           <p>No Notes</p>
//         )}
//       </div>
//       <button
//         onClick={() => setModalOpen(true)}
//         className="fixed right-4 text-2xl bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full"
//       >
//         +
//       </button>
//       {isModalOpen && (
//         <DataModal
//           closeModal={closeModal}
//           addNote={addNote}
//           currentNote={currentNote}
//           editNote={editNote}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DataModal from "../components/DataModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";
import homeimg from "../assets/homeimg.jpg";
const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, [navigate]);

  useEffect(() => {
    setFilteredNotes(
      (notes || []).filter(
        (note) =>
          note.title?.toLowerCase().includes(query.toLowerCase()) ||
          note.description?.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  // const fetchNotes = async () => {
  //   try {
  //     const { data } = await axios.get("/api/note", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     });
  //     setNotes(data.notes || []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("/api/note", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setNotes(data.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentNote(null);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async ({ title, description, files, password }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("password", password);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.post("/api/note/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Note added successfully!");
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, { title, description, files, password }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("password", password);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.put(`/api/note/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Note updated successfully!");
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotes = async (id) => {
    try {
      const res = await axios.delete(`/api/note/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        toast.success("Note deleted");
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="px-10 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <NoteCard note={note} onEdit={onEdit} deleteNotes={deleteNotes} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-full text-gray-500 py-16">
  <div className="w-full max-w-4xl h-auto">
    <img
      src={homeimg}
      alt="No Notes Available"
      className="w-full max-h-[600px] object-contain rounded-3xl shadow-2xl opacity-90 hover:opacity-100 transition duration-700 ease-in-out"
    />
  </div>
  <p className="mt-10 text-2xl font-bold text-gray-700 text-center">
    No Notes Available
  </p>
</div>

        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white shadow-lg p-5 rounded-full text-4xl hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        +
      </button>

      {isModalOpen && (
        <DataModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
