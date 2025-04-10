import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ Add Note (POST)
// router.post("/add", middleware, upload.array("files", 5), async (req, res) => {
//   try {
//     const { title, description, password } = req.body;

//     const fileUrls = req.files.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     );

//     let hashedPassword = null;
//     let locked = false;

//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10); // ✅ Hash password
//       locked = true;
//     }

//     const newNote = new Note({
//       title,
//       description,
//       userId: req.user._id,
//       files: fileUrls,
//       locked,
//       password: hashedPassword,
//     });

//     await newNote.save();
//     res.status(200).json({
//       success: true,
//       message: "Note added successfully",
//       note: newNote,
//     });
//   } catch (error) {
//     console.error("Error adding note:", error);
//     res.status(500).json({ success: false, message: "Error adding note" });
//   }
// });

// // ✅ Get All Notes (GET)
// router.get("/", middleware, async (req, res) => {
//   try {
//     const notes = await Note.find({ userId: req.user._id });
//     res.status(200).json({ success: true, notes });
//   } catch (error) {
//     console.error("Error fetching notes:", error);
//     res.status(500).json({ success: false, message: "Error fetching notes" });
//   }
// });

// // ✅ Get Single Note (GET /:id)
// router.get("/:id", middleware, async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ success: false, message: "Invalid note ID" });
//   }

//   try {
//     const note = await Note.findOne({
//       _id: id,
//       userId: req.user._id,
//     });

//     if (!note) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Note not found for this user" });
//     }

//     // Ensure proper file URLs
//     const fileBaseUrl = `${req.protocol}://${req.get("host")}/uploads`;
//     const fullFileUrls = note.files.map((file) =>
//       file.startsWith("http") ? file : `${fileBaseUrl}/${file}`
//     );

//     res.status(200).json({
//       success: true,
//       note: { ...note._doc, files: fullFileUrls },
//     });
//   } catch (error) {
//     console.error("Error fetching note:", error);
//     res.status(500).json({ success: false, message: "Error fetching note" });
//   }
// });

// // ✅ Update Note (PUT /:id)
// router.put("/:id", middleware, upload.array("files", 5), async (req, res) => {
//   const { id } = req.params;
//   const { title, description, password } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ success: false, message: "Invalid note ID" });
//   }

//   try {
//     const note = await Note.findById(id);
//     if (!note) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Note not found" });
//     }

//     if (req.files && req.files.length > 0) {
//       const fileUrls = req.files.map(
//         (file) =>
//           `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//       );
//       note.files = fileUrls;
//     }

//     if (password) {
//       note.password = await bcrypt.hash(password, 10);
//       note.locked = true;
//     }

//     note.title = title || note.title;
//     note.description = description || note.description;

//     await note.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Note updated successfully", note });
//   } catch (error) {
//     console.error("Error updating note:", error);
//     res.status(500).json({ success: false, message: "Error updating note" });
//   }
// });

// // ✅ Delete Note (DELETE /:id)
// router.delete("/:id", middleware, async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ success: false, message: "Invalid note ID" });
//   }

//   try {
//     const deletedNote = await Note.findByIdAndDelete(id);
//     if (!deletedNote) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Note not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Note deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting note:", error);
//     res.status(500).json({ success: false, message: "Error deleting note" });
//   }
// });

// new one
router.post("/add", middleware, upload.array("files", 5), async (req, res) => {
  try {
    const { title, description, password } = req.body;

    const fileUrls = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    let hashedPassword = null;
    let locked = false;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      locked = true;
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,    // ✅ Attach the user's ID
      files: fileUrls,
      locked,
      password: hashedPassword,
    });

    await newNote.save();
    res.status(201).json({ success: true, message: "Note added", note: newNote });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ success: false, message: "Error adding note" });
  }
});

// ✅ Get User's Notes Only (GET)
router.get("/", middleware, async (req, res) => {
  try {
    // ✅ Fetch only notes for the logged-in user
    const notes = await Note.find({ userId: req.user.id });

    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Error fetching notes" });
  }
});

// ✅ Get Single Note by ID (GET /:id)
router.get("/:id", middleware, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    const note = await Note.findOne({
      _id: id,
      userId: req.user.id,    // ✅ Ensure the user owns the note
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ success: false, message: "Error fetching note" });
  }
});

// ✅ Update Note (PUT)
router.put("/:id", middleware, upload.array("files", 5), async (req, res) => {
  const { id } = req.params;
  const { title, description, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    const note = await Note.findOne({
      _id: id,
      userId: req.user.id,    // ✅ Ensure the user owns the note
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      note.files = fileUrls;
    }

    if (password) {
      note.password = await bcrypt.hash(password, 10);
      note.locked = true;
    }

    note.title = title || note.title;
    note.description = description || note.description;

    await note.save();

    res.status(200).json({ success: true, message: "Note updated", note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ success: false, message: "Error updating note" });
  }
});

// ✅ Delete Note (DELETE)
router.delete("/:id", middleware, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id,    // ✅ Ensure the user owns the note
    });

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, message: "Error deleting note" });
  }
});



// ✅ Check Note Lock Status (GET /status/:id)
router.get("/status/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, locked: !!note.password });
  } catch (error) {
    console.error("Error fetching note status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Unlock Note (POST /unlock/:id)
router.post("/unlock/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    if (note.password) {
      const isMatch = await bcrypt.compare(password, note.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error("Error unlocking note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
