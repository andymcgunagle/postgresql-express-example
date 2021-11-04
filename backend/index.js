import express from 'express';
import PrettyError from 'pretty-error';
import pool from './todoDatabasePool.js';

const pe = new PrettyError();

const app = express();
const PORT = 8080

app.use(express.json());

// @route POST /todos
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(pe.render(error));
  };
});

// @route GET /todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo",
    );

    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(pe.render(error));
  };
});

// @route GET /todos/:id
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(
      "SELECT description FROM todo WHERE id = $1",
      [id]
    );

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(error.status).json(error.message);
    console.error(pe.render(error));
  };
});

// @route PUT /todos/:id
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const newTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
      [description, id],
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(pe.render(error));
  };
});

// @route DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const remainingTodos = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );

    res.status(200).json(remainingTodos.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(pe.render(error));
  };
});

app.listen(PORT, () => {
  console.log(`We're live on http://localhost:${PORT}/`);
});