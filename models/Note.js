import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  files: [{ type: String }],
  locked: { type: Boolean, default: false },         // ✅ New field to indicate if the note is locked
  password: { type: String, default: null }  
});

const Note = mongoose.model("Note", NoteSchema);
export default Note;
