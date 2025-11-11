import React, { useState, useEffect } from "react";
import "./App.css"; // import file CSS terpisah

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  // Ambil semua catatan dari API
  const getNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error GET:", err.message);
    }
  };

  // Jalankan saat komponen pertama kali muncul
  useEffect(() => {
    getNotes();
  }, []);

  // Simpan catatan baru
  const addNote = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Judul dan isi catatan wajib diisi!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan catatan");

      const newNote = await res.json();
      setNotes((prev) => [...prev, newNote]);
      setForm({ title: "", content: "" });
    } catch (err) {
      console.error("Error POST:", err.message);
      alert("Gagal menyimpan catatan! Pastikan server backend aktif.");
    }
  };

  return (
    <div className="app-container">
      <h1>CatatanKu </h1>

      {/* Form Input */}
      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          placeholder="Judul catatan..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="note-input"
        />
        <textarea
          placeholder="Isi catatan..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="note-textarea"
        ></textarea>
        <button type="submit" className="save-button">
          Simpan Catatan
        </button>
      </form>

      {/* Daftar Catatan */}
      <h2>Daftar Catatan:</h2>
      {notes.length === 0 ? (
        <p>Belum ada catatan.</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>Dibuat: {new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
