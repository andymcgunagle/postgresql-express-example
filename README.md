# PostgreSQL Notes

## PostgreSQL from the Command Line

List all databases: `psql -l`

There are three default databases already listed - postgres, template0, and template1

Create a database: `createdb`

Drop a database: `dropdb`

Enter a database from the command line: `psql name_of_db`

Show all relations in database: `\d`

Show all tables in database: `dt`

Show a table in the database: `SELECT * from table_name;`

Exit psql database interface: `\q`

## SQLTools in Visual Studio Code

Add new connection

Give the connection a name (name_of_db@localhost, for example)

Specify the database to connect to (created from the command line using createdb)

Specify the user

Use empty password (for now)

Test connection, then connect - a new connectionName.session.sql file will be generated

--@block will create blocks to run individual blocks of commands in your session.sql file

## SQL commands

### General Reminders:

SQL KEYWORDS UPPER CASE BY CONVENTION

identifiers_lower_snake_case_by_convention

Add a semicolon at the end of each command;

(Don't, add, trailing, commas)

### Create a table:

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

### Insert values into a table:

```sql
INSERT INTO users (first_name, last_name, age, email)
VALUES ('Andy', 'McUser', 30, 'andy@mcuser.com');
```

### Select all data in all columns a table:

```sql
SELECT *
FROM users;
```

### Select data from a few specific columns in a table:

```sql
SELECT first_name,
  last_name
FROM users;
```

### Drop a column:

```sql
ALTER TABLE users DROP COLUMN age;
```

### Add a column:

```sql
ALTER TABLE users
ADD COLUMN age INT;
```

## PostgreSQL and Express

### Install Express and pg

`npm i express pg`

### Create database from terminal

`createdb todo_database`

### Create table from terminal (or SQLTools file)

```sql
CREATE TABLE todo(id SERIAL PRIMARY KEY, description VARCHAR(255));
```

### Create pool to connect to database

```javascript
import pg from 'pg';

const pool = new pg.Pool({
  user: 'yourUserName',
  database: 'todo_database',
  host: 'localhost',
  port: 5432,
});

export default pool;
```

### Create server and routes that query database

```javascript
import express from 'express';
import PrettyError from 'pretty-error';
import pool from './todoDatabasePool.js';

const pe = new PrettyError();

const app = express();
const PORT = 8080;

app.use(express.json());

// @route POST /post-todo
app.post('/post-todo', async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route GET /get-todos
app.get('/get-todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');

    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route GET /get-todo/:id
app.get('/get-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query('SELECT description FROM todo WHERE id = ($1)', [id]);

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route PUT /update-todo/:id
app.put('/update-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const newTodo = await pool.query('UPDATE todo SET description = ($1) WHERE id = ($2) RETURNING *', [description, id]);

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.error(error);
  }
});

// @route DELETE /delete-todo/:id
app.delete('/delete-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const remainingTodos = await pool.query('DELETE FROM todo WHERE id = ($1) RETURNING *', [id]);

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

### Installing postgresql with Homebrew

https://formulae.brew.sh/formula/postgresql

### How to completely uninstall and reinstall Homebrew Postgres

https://blog.testdouble.com/posts/2021-01-28-how-to-completely-uninstall-homebrew-postgres/

### SQL Tutorial for Beginners

https://www.youtube.com/watch?v=tp_5c6jaNQE

### SQL Syntax

https://en.wikipedia.org/wiki/SQL_syntax

### Build restful API with PostgreSQL and Express

https://www.youtube.com/watch?v=_Mun4eOOf2Q
