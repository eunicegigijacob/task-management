const db = require("../config/database");

const addTask = async (title, description, due_date, status = "Pending") => {
  const query = `
        INSERT INTO tasks (title, description, due_date, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
  const values = [title, description, due_date, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getAllTasks = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query = `
        SELECT * FROM tasks
        ORDER BY due_date ASC
        LIMIT $1 OFFSET $2;
    `;
  const values = [limit, offset];
  const result = await db.query(query, values);

  const countQuery = "SELECT COUNT(*) FROM tasks;";
  const countResult = await db.query(countQuery);
  const totalTasks = parseInt(countResult.rows[0].count, 10);

  return {
    tasks: result.rows,
    pagination: {
      total: totalTasks,
      page,
      limit,
      totalPages: Math.ceil(totalTasks / limit),
    },
  };
};

const updateTask = async (id, fields) => {
  const updates = Object.keys(fields)
    .map((key, idx) => `${key}=$${idx + 2}`)
    .join(", ");
  const values = [id, ...Object.values(fields)];
  const query = `
        UPDATE tasks
        SET ${updates}
        WHERE id=$1
        RETURNING *;
    `;
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteTask = async (id) => {
  const query = "DELETE FROM tasks WHERE id=$1 RETURNING *;";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
