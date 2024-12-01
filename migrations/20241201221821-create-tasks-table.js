exports.up = function (db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      due_date DATE NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending'
    );
  `);
};

exports.down = function (db) {
  return db.runSql("DROP TABLE IF EXISTS tasks;");
};
