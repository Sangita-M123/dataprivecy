// import React, { useState, useEffect } from "react";

// const DataModal = ({ closeModal, addNote, currentNote, editNote }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [files, setFiles] = useState([]);
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (currentNote) {
//       setTitle(currentNote.title);
//       setDescription(currentNote.description);
//     }
//   }, [currentNote]);

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const noteData = {
//       title,
//       description,
//       files,
//       password,
//     };

//     if (currentNote) {
//       editNote(currentNote._id, noteData);
//     } else {
//       addNote(noteData);
//     }

//     closeModal();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
//       <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
//         <h2 className="text-xl font-bold mb-4">
//           {currentNote ? "Edit Note" : "Add New Data"}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title"
//             className="border p-2 w-full mb-4"
//             required
//           />

//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             className="border p-2 w-full mb-4"
//             required
//           />

//           <input
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             className="border p-2 w-full mb-4"
//           />

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Set Note Password (Optional)"
//             className="border p-2 w-full mb-4"
//           />

//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
//           >
//             {currentNote ? "Update" : "Add"}
//           </button>
//         </form>

//         <button
//           className="mt-4 text-red-500 hover:text-red-600 transition"
//           onClick={closeModal}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DataModal;
import React, { useState, useEffect } from "react";
import { FaFileUpload, FaLock, FaTimes, FaSave } from "react-icons/fa";

const DataModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteData = {
      title,
      description,
      files,
      password,
    };

    if (currentNote) {
      editNote(currentNote._id, noteData);
    } else {
      addNote(noteData);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#fefaf2] rounded-xl shadow-lg w-full max-w-3xl 
                      transform transition-all duration-300 scale-105 border-4 border-[#d4af37] 
                      flex flex-col justify-between relative max-h-[90vh] overflow-hidden">

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[80vh] p-4">

          {/* Diary Header */}
          <div className="bg-[#d4af37] text-white rounded-t-xl px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wide">
              {currentNote ? "Edit Diary Entry" : "Add New Diary Entry"}
            </h2>
            <button 
              onClick={closeModal} 
              className="text-white hover:text-red-500 transition-all"
            >
              <FaTimes size={22} />
            </button>
          </div>

          {/* Diary Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Title Input */}
            <div>
              <label className="block text-lg font-semibold text-[#5b4838]">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Diary title..."
                className="w-full px-4 py-3 rounded-lg bg-[#fef7e0] border border-[#c6a27e] 
                          focus:outline-none focus:ring-4 focus:ring-[#d4af37] transition duration-300"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-lg font-semibold text-[#5b4838]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Pen down your thoughts..."
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-[#fef7e0] border border-[#c6a27e] 
                          focus:outline-none focus:ring-4 focus:ring-[#d4af37] transition duration-300"
                required
              />
            </div>

            {/* File Upload */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2 text-lg font-semibold text-[#5b4838]">
                <FaFileUpload />
                Attach Files
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-[#fef7e0] border border-[#c6a27e] rounded-lg
                          focus:outline-none focus:ring-4 focus:ring-[#d4af37] transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2 text-lg font-semibold text-[#5b4838]">
                <FaLock />
                Password (Optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Protect your entry..."
                className="w-full px-4 py-3 bg-[#fef7e0] border border-[#c6a27e] rounded-lg
                          focus:outline-none focus:ring-4 focus:ring-[#d4af37] transition duration-300"
              />
            </div>
          </form>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#fefaf2] border-t border-[#d4af37]">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 px-6 
                      rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <FaSave /> {currentNote ? "Update" : "Add"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white font-bold py-3 px-6 
                      rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default DataModal;
