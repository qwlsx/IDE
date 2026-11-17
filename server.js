const express = require("express");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const app = express();
const port = 3000;
const database = new DatabaseSync(path.join(__dirname, "database.db"));

database.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/tasks", (request, response) => {
  const tasks = database
    .prepare("SELECT id, text, completed FROM tasks ORDER BY id")
    .all();

  response.json(tasks);
});

app.post("/api/tasks", (request, response) => {
  const text = request.body.text?.trim();

  if (!text) {
    return response.status(400).json({ error: "Task text is required." });
  }

  const result = database
    .prepare("INSERT INTO tasks (text) VALUES (?)")
    .run(text);
  const task = database
    .prepare("SELECT id, text, completed FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  response.status(201).json(task);
});

app.patch("/api/tasks/:id", (request, response) => {
  const completed = request.body.completed ? 1 : 0;
  const result = database
    .prepare("UPDATE tasks SET completed = ? WHERE id = ?")
    .run(completed, request.params.id);

  if (result.changes === 0) {
    return response.status(404).json({ error: "Task not found." });
  }

  const task = database
    .prepare("SELECT id, text, completed FROM tasks WHERE id = ?")
    .get(request.params.id);

  response.json(task);
});

app.delete("/api/tasks/:id", (request, response) => {
  const result = database
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(request.params.id);

  if (result.changes === 0) {
    return response.status(404).json({ error: "Task not found." });
  }

  response.status(204).end();
});

app.listen(port, () => {
  console.log(`Task List is running at http://localhost:${port}`);
});
