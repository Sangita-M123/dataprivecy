// import React from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const NoteCard = ({ note, onEdit, deleteNotes }) => {
//   const navigate = useNavigate();

//   // ✅ Handle navigation with click prevention on edit/delete buttons
//   const handleCardClick = (e) => {
//     // Prevent navigation when clicking edit or delete
//     if (e.target.closest("button")) return;
//     navigate(`/note/${note._id}`);
//   };

//   return (
//     <div
//       className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
//       onClick={handleCardClick}
//     >
//       <h2 className="text-xl font-bold">{note.title}</h2>
//       <p className="text-gray-700">{note.description}</p>

//       {/* ✅ Display attachments if available */}
//       {note.files && note.files.length > 0 && (
//         <div className="mt-2">
//           <h3 className="font-bold">Attachments:</h3>
//           {note.files.map((file, index) => (
//             <a
//               key={index}
//               href={file.startsWith("http") ? file : `/${file}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 block hover:underline"
//             >
//               {file.split("/").pop()}
//             </a>
//           ))}
//         </div>
//       )}

//       {/* ✅ Edit and Delete buttons */}
//       <div className="flex justify-end mt-2">
//         <button
//           className="text-blue-500 mr-2 hover:text-blue-700 transition"
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent navigation on button click
//             onEdit(note);
//           }}
//         >
//           <FaEdit />
//         </button>
//         <button
//           className="text-red-500 hover:text-red-700 transition"
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent navigation on button click
//             deleteNotes(note._id);
//           }}
//         >
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note, onEdit, deleteNotes }) => {
  const navigate = useNavigate();

  // ✅ Handle navigation with click prevention on edit/delete buttons
  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;  // Prevent navigation on button click
    navigate(`/note/${note._id}`);
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform transition duration-300 ease-in-out cursor-pointer hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* ✅ Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition">
        {note.title}
      </h2>

      {/* ✅ Description */}
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {note.description}
      </p>

      {/* ✅ Display Attachments */}
      {note.files && note.files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Attachments:</h3>
          <div className="flex flex-wrap gap-2">
            {note.files.map((file, index) => (
              <a
                key={index}
                href={file.startsWith("http") ? file : `/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 bg-gray-100 px-3 py-1 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
              >
                📎 {file.split("/").pop()}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Edit and Delete Buttons */}
      <div className="flex justify-end items-center mt-4 space-x-4">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(note);
          }}
        >
          <FaEdit className="mr-1" /> Edit
        </button>

        <button
          className="flex items-center text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            deleteNotes(note._id);
          }}
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
