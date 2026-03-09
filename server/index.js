import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/mountains", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mountains ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "gagal mengambil data" });
  }
});

app.post("/api/mountains", async (req, res) => {
  try {
    const { name, location, altitude, difficulty_level, description } =
      req.body;

    const newMountain = await pool.query(
      "INSERT INTO mountains (name, location, altitude, difficulty_level, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, location, altitude, difficulty_level, description],
    );
    res.json(newMountain.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "gagal menambahkan data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
