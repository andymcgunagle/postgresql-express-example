import pool from './todosDatabasePool.js';

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todos",
    );

    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(400).json(error.message);

  };
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(
      "SELECT description FROM todos WHERE id = $1",
      [id]
    );

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(error.status).json(error.message);

  };
};