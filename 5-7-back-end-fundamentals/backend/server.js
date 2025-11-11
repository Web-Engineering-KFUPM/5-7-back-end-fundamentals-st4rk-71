import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// parse JSON bodies
app.use(express.json());

// allow the Vite frontend (default http://localhost:5173)
app.use(cors({ origin: "http://localhost:5173" }));

// ---- in-memory data (no DB) ----
let students = [
  { id: 1, name: "Aisha" },
  { id: 2, name: "Hasan" }
];

// ---- routes ----

// GET all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// POST create a student
app.post("/api/students", (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newStudent = { id: Date.now(), name: name.trim() };
  students = [newStudent, ...students];
  res.status(201).json(newStudent);
});

// (optional) health check / root message
app.get("/", (_req, res) => {
  res.send("✅ Students API is running");
});

// start server
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
