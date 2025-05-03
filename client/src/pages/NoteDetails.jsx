// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import LockScreen from "./LockScreens"; // ✅ Correct component import

// const NoteDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [note, setNote] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isLocked, setIsLocked] = useState(true); // ✅ Lock by default

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const response = await axios.get(`/api/note/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (!response.data.success) {
//           throw new Error("Note not found");
//         }

//         setNote(response.data.note);
//         setIsLocked(!!response.data.note.password); // ✅ Lock if password exists
//       } catch (error) {
//         console.error("Error fetching note:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNote();
//   }, [id]);

//   const handleUnlockSuccess = () => {
//     setIsLocked(false); // ✅ Unlock the note on success
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!note) return <p>Note not found.</p>;

//   return (
//     <div className="p-8">
//       <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
//         ← Back
//       </button>

//       {/* ✅ Lock screen handling */}
//       {isLocked ? (
//         <LockScreen noteId={id} onUnlockSuccess={handleUnlockSuccess} />
//       ) : (
//         <div>
//           <h1 className="text-2xl font-bold">{note.title}</h1>
//           <p className="text-gray-700">{note.description}</p>

//           {note.files && note.files.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-bold">Files:</h3>
//               {note.files.map((file, index) => (
//                 <div key={index} className="mt-2">
//                   <a
//                     href={file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 underline"
//                   >
//                     {file.split("/").pop()}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteDetails;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LockScreen from "./LockScreens"; // ✅ Correct component import

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true); // ✅ Lock by default

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`https://dataprivecy-4.onrender.com/api/note/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.data.success) {
          throw new Error("Note not found");
        }

        setNote(response.data.note);
        setIsLocked(!!response.data.note.password); // ✅ Lock if password exists
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUnlockSuccess = () => {
    setIsLocked(false); // ✅ Unlock the note on success
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl text-red-500 font-bold">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-10">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 transition-transform transform hover:scale-105">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          ← Back
        </button>

        {/* Lock Screen or Note Content */}
        {isLocked ? (
          <div className="text-center">
            <LockScreen noteId={id} onUnlockSuccess={handleUnlockSuccess} />
          </div>
        ) : (
          <div>
            {/* Note Title */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              📝 {note.title}
            </h1>

            {/* Note Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {note.description}
            </p>

            {/* Files Section */}
            {note.files && note.files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">📁 Files:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {note.files.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {file.split("/").pop()}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
