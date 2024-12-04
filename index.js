const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const cors = require("cors"); // Import CORS

app.use(cors({ origin: "http://localhost:5173" }));

// Middleware
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(":memory:");

// Create table if it doesn't exist
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS forms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_name TEXT NOT NULL,
      form_data TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// API route to save a form
app.post("/api/forms/save", (req, res) => {
    const { title, form } = req.body;
    console.log(req.body);

    if (!title || !form) {
        return res
            .status(400)
            .json({ error: "Both title and form data are required" });
    }

    const formData = JSON.stringify(form);
    const query = `
    INSERT INTO forms (form_name, form_data, created_at, updated_at)
    VALUES (?, ?, datetime('now'), datetime('now'))
  `;

    db.run(query, [title, formData], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to save the form" });
        }

        console.log(formData);
        res.status(201).json({
            message: "Form saved successfully",
            id: this.lastID,
        });
    });
});

// Endpoint to retrieve a form by ID
app.get("/api/forms/:id", (req, res) => {
    const { id } = req.params;

    // SQL query to get the form by ID
    const query = `SELECT * FROM forms WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Failed to retrieve the form" });
        }

        if (!row) {
            return res.status(404).json({ error: "Form not found" });
        }

        // Parse form_data from JSON string to object before sending the response
        const form = {
            id: row.id,
            form_name: row.form_name,
            form_data: JSON.parse(row.form_data),
            created_at: row.created_at,
            updated_at: row.updated_at,
        };

        res.status(200).json(form);
    });
});

// Endpoint to update a form by ID
app.put("/api/forms/update/:id", (req, res) => {
    const { id } = req.params;
    const { title, form } = req.body;

    if (!title || !form) {
        return res
            .status(400)
            .json({ error: "Both title and form data are required" });
    }

    const formData = JSON.stringify(form);

    // SQL query to update the form by ID
    const query = `
      UPDATE forms
      SET form_name = ?, form_data = ?, updated_at = datetime('now')
      WHERE id = ?
    `;

    db.run(query, [title, formData, id], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to update the form" });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Form not found" });
        }

        res.status(200).json({ message: "Form updated successfully" });
    });
});

// Endpoint to retrieve all forms
app.get("/api/forms/list", (req, res) => {
    const query = "SELECT * FROM forms";

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to retrieve forms" });
        }

        // Format the response
        const forms = rows.map((row) => ({
            id: row.id,
            form_name: row.form_name,
            form_data: JSON.parse(row.form_data), // Parse the form data from JSON string
            created_at: row.created_at,
            updated_at: row.updated_at,
        }));

        res.status(200).json(forms);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
