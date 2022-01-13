import pool from './todosDatabasePool.js';

export const postNewTodo = async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);

  };
};