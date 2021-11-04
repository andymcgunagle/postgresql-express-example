import express from 'express';
import PrettyError from 'pretty-error';
import pool from './todoDatabasePool.js';

const pe = new PrettyError();

const app = express();
const PORT = 8080

app.use(express.json());

// @route POST /post-todo
app.post('/post-todo', async (req, res) => {
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

// @route GET /get-todos
app.get('/get-todos', async (req, res) => {
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

// @route GET /get-todo/:id
app.get('/get-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(
      "SELECT description FROM todo WHERE id = ($1)",
      [id]
    );

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(error.status).json(error.message);
    console.error(pe.render(error));
  };
});

// @route PUT /update-todo/:id
app.put('/update-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const newTodo = await pool.query(
      "UPDATE todo SET description = ($1) WHERE id = ($2) RETURNING *",
      [description, id],
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(pe.render(error));
  };
});

// @route DELETE /delete-todo/:id
app.delete('/delete-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const remainingTodos = await pool.query(
      "DELETE FROM todo WHERE id = ($1) RETURNING *",
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