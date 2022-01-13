# PostgreSQL Notes

## PostgreSQL from the Command Line

- List all databases: `psql -l`

- There are three default databases already listed - **postgres**, **template0**, and **template1**

- Create a database: `createdb`

- Drop a database: `dropdb`

- Connect to a database from the command line: `psql name_of_db`

- Show all relations in database: `\d`

- Show all tables in database: `\dt`

- Show a table in the database: `SELECT * from table_name;`

- Exit psql database interface: `\q`

## SQLTools in Visual Studio Code

- Install SQLTools extension in Visual Studio Code

- Add new connection

- Give the connection a name (**name_of_db@localhost**, for example)

- Specify the database to connect to (created from the command line using `createdb`)

- Specify the user

- Use empty password (for now)

- Test connection, then connect - a new connectionName.session.sql file will be generated

- `--@block` will create blocks to run individual blocks of commands in your session.sql file

## SQL Commands

### General Reminders:

- SQL KEYWORDS UPPER CASE BY CONVENTION

- identifiers_lower_snake_case_by_convention

- Add a semicolon at the end of each command;

- (Don't, add, trailing, commas)

### Create a table:

- [PostgreSQL data types](https://www.postgresql.org/docs/current/datatype.html)

```sql
CREATE TABLE users (
  id SERIAl PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name TEXT,
  age INT,
  email TEXT UNIQUE NOT NULL
);
```

### Drop a table:

```sql
DROP TABLE users;
```

### Add a column:

```sql
ALTER TABLE users
ADD COLUMN age INT;
```

### Drop a column:

```sql
ALTER TABLE users
DROP COLUMN age;
```

### Insert values into a table:

```sql
INSERT INTO users (first_name, last_name, age, email)
VALUES ('Andy', 'McUser', 30, 'andy@mcuser.com');
```

### Select all data in all columns a table:

- [The FROM Clause](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-FROM): The FROM clause derives a table from one or more other tables given in a comma-separated table reference list.

```sql
SELECT *
FROM users;
```

### Select data from a few specific columns in a table:

- [The WHERE Clause](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-WHERE): If the WHERE clause is specified, all rows that do not satisfy the condition are eliminated from the output.

```sql
SELECT first_name, last_name
FROM users
WHERE id = 3
```

```sql
SELECT first_name, last_name
FROM users
WHERE (city_living_in = 'San Diego')
AND (city_from = 'Sonoma' OR city_from = 'San Luis Obispo');
```

### Select ordered data:

- [Sorting Rows](https://www.postgresql.org/docs/9.5/queries-order.html): If the ORDER BY clause is specified, the returned rows are sorted in the specified order. If ORDER BY is not given, the rows are returned in whatever order the system finds fastest to produce.

```sql
SELECT first_name
FROM users
ORDER BY first_name;
```

```sql
SELECT last_name
FROM users
ORDER BY last_name DESC;
```

### Eliminate duplicate rows from the result:

- [The DISTINCT Clause](https://www.postgresql.org/docs/13/sql-select.html#SQL-DISTINCT): If SELECT DISTINCT is specified, all duplicate rows are removed from the result set.

```sql
SELECT DISTINCT city_living_in
FROM users
ORDER BY city_living_in;
```

## PostgreSQL and express

### Initialize project and install [express](https://www.npmjs.com/package/express) and [pg](https://www.npmjs.com/package/pg)

`npm init -y`

`npm i express pg`

### Create database from terminal

`createdb todos_database`

### Create table from terminal (or SQLTools **session.sql** file)

```sql
CREATE TABLE todos(
  id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);
```

### Create pool to connect to database

```javascript
import pg from 'pg';

const pool = new pg.Pool({
  user: 'yourUserName',
  database: 'todos_database',
  host: 'localhost',
  port: 5432,
});

export default pool;
```

### Create server and routes that query database

```javascript
import express from 'express';
import PrettyError from 'pretty-error';
import pool from './todosDatabasePool.js';

const pe = new PrettyError();

const app = express();
const PORT = 8080;

app.use(express.json());

// @route POST /todos
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query('INSERT INTO todos (description) VALUES ($1) RETURNING *', [description]);

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route GET /todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todos');

    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route GET /todos/:id
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query('SELECT description FROM todos WHERE id = ($1)', [id]);

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route PUT /todos/:id
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const newTodo = await pool.query('UPDATE todos SET description = ($1) WHERE id = ($2) RETURNING *', [description, id]);

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const remainingTodos = await pool.query('DELETE FROM todos WHERE id = ($1) RETURNING *', [id]);

    res.status(200).json(remainingTodos.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`We're live on http://localhost:${PORT}/`);
});
```

## Resources

- [Installing postgresql with Homebrew](https://formulae.brew.sh/formula/postgresql)

- [How to completely uninstall and reinstall Homebrew Postgres](https://blog.testdouble.com/posts/2021-01-28-how-to-completely-uninstall-homebrew-postgres/)

- [SQL Tutorial for Beginners](https://www.youtube.com/watch?v=tp_5c6jaNQE)

- [SQL Syntax](https://en.wikipedia.org/wiki/SQL_syntax)

- [Build restful API with PostgreSQL and Express](https://www.youtube.com/watch?v=_Mun4eOOf2Q)

- [Learn PostgreSQL Tutorial - Full Course for Beginners](https://www.youtube.com/watch?v=qw--VYLpxG4)

- [Database Design Course - Learn how to design and plan a database for beginners](https://www.youtube.com/watch?v=ztHopE5Wnpc)
