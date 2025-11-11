import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Note from "./models/Note.js";

const app = express();
app.use(express.json());
app.use(cors());

// ===============================
// KONEKSI MONGODB ATLAS
// ===============================
mongoose
  .connect("mongodb+srv://admin:Admin123@cluster0.5tb1ljz.mongodb.net/catatanku?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===============================
// ROUTES
// ===============================
app.get("/", (req, res) => {
  res.send("Server CatatanKu aktif!");
});

// GET semua catatan
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // urutkan dari terbaru
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah catatan
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title dan content wajib diisi!" });
  }

  try {
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
