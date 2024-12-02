# Tasks Management API

## Overview

The **Tasks Management API** is a backend application designed for managing tasks with features like adding, updating, retrieving, and deleting tasks. It includes robust error handling, request validation using `Zod`, and a structured architecture.

The project uses **Express.js** as the framework, **PostgreSQL** as the database, and **db-migrate** for database migrations.

---

## Features

- **CRUD Operations**: Manage tasks (Create, Read, Update, Delete).
- **Validation**: Request validation with Zod schemas.
- **Pagination**: Efficiently retrieve tasks with pagination.
- **Error Handling**: Centralized error-handling middleware.
- **Database Migrations**: Manage database schema changes using `db-migrate`.

---

## Installation

### Prerequisites

1.  **Node.js** (v14 or higher).
2.  **PostgreSQL** installed and running.
3.  **NPM** or **Yarn** for managing dependencies.

### Setup

1.  Clone the repository:

    ```
    git clone <repository-url>
    cd tasks-management

    ```

2.  Install dependencies:

    ```
    npm install

    ```

3.  Create a `.env` file based on the example provided in `.env.example`:

    ```
    PORT=3000
    DATABASE_URL=postgres://username:password@localhost:5432/tasksdb
    JWT_SECRET=your_jwt_secret

    ```

4.  Ensure your PostgreSQL database is running and matches the connection details in the `.env` file.

---

## Running the Application

Start the server:

```
npm start

```

The server will run on the port specified in the `.env` file (default: `3000`).

### Health Check

Verify that the server is running by accessing:

```
GET /health
Response: { "message": "Server up" }

```

---

## Database Migrations

This project uses **db-migrate** to manage database schema changes.

### Available Commands

1.  **Run Migrations**:

    ```
    npm run migrate

    ```

    This applies all pending migrations.

2.  **Rollback Migrations**:

    ```
    npm run migrate:rollback

    ```

    This reverts the last applied migration.

3.  **Create a New Migration**:

    ```
    npm run migrate:new

    ```

    This creates a new migration file. Provide a meaningful name using the `--name` option:

    ```
    npm run migrate:create:with_name --name=add-tasks-table

    ```

4.  **Run Migrations for Production**: Update the `DATABASE_URL` in `.env` to point to the production database and then run:

    ```
    NODE_ENV=production npm run migrate

    ```

### Example Migration File

A typical migration file in the `migrations` folder might look like this:

```
"use strict";

exports.up = async function (db) {
  return db.createTable("tasks", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    title: { type: "string", notNull: true },
    description: { type: "string" },
    due_date: { type: "date", notNull: true },
    status: { type: "string", notNull: true, defaultValue: "Pending" },
    created_at: { type: "timestamp", defaultValue: new String("CURRENT_TIMESTAMP") },
  });
};

exports.down = async function (db) {
  return db.dropTable("tasks");
};

```

---

## Project Structure

```plaintext


├── migrations/            # Contains database migration files
├── src/                   # Application source code
│   ├── config/            # Configuration files
│   │   └── database.js    # Database connection setup
│   ├── controllers/       # Application controllers
│   │   └── task.controller.js  # Task controller logic
│   ├── middleware/        # Middleware logic
│   │   ├── auth.middleware.js  # Authentication middleware
│   │   └── errorHandler.middleware.js  # Error handling middleware
│   ├── repository/        # Repository layer for database queries
│   │   └── task.repository.js
│   ├── routes/            # Application routes
│   │   └── task.routes.js # Task-related routes
│   ├── schemas/           # Validation schemas (e.g., Zod)
│   │   └── task.schema.js # Task validation schema
│   ├── app.js             # Express app configuration
│   └── server.js          # Application entry point
├── .env                   # Environment variables file
├── .gitignore             # Files/folders to ignore in version control
├── database.json          # Database configuration for db-migrate
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Locked dependency versions
└── README.md              # Documentation
```

---

## Testing

1.  Ensure the application is running.
2.  Use tools like **Postman** or **cURL** to interact with the endpoints.

## API Endpoints

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| POST   | /tasks     | Create a new task       |
| GET    | /tasks     | Retrieve all tasks      |
| GET    | /tasks/:id | Retrieve a task by ID   |
| PUT    | /tasks/:id | Update an existing task |
| DELETE | /tasks/:id | Delete a task           |

---

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature:

    ```
    git checkout -b feature-name

    ```

3.  Commit your changes and push to your branch:

    ```
    git push origin feature-name

    ```

4.  Open a pull request on GitHub.

---

---

## Contact

For issues or questions, reach out to:

- **Author**: Eunice Jacob
- **Email**: jacobeunice40@gmail.com, eunice.gigij@gmail.com
- **GitHub**: https://github.com/eunicegigijacob

---
