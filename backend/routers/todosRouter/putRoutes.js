import pool from './todosDatabasePool.js';

export const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const newTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2 RETURNING *",
      [description, id],
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);

  };
};