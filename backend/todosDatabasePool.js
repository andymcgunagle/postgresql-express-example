import pg from 'pg';

const pool = new pg.Pool({
  "user": "andrewmcgunagle",
  "database": "todos_database",
  "host": "localhost",
  "port": 5432
});

export default pool;