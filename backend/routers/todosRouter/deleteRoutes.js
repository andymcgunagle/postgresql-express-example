import pool from './todosDatabasePool.js';

export const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const remainingTodos = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    res.status(200).json(remainingTodos.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  };
};