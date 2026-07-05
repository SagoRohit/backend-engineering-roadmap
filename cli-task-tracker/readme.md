# CLI Task Tracker

A simple command-line Task Tracker built with **TypeScript** and **Node.js**.

This project was built by following the backend engineering roadmap from roadmap.sh, but instead of simply completing the project, the goal was to **learn backend engineering concepts by implementing everything from scratch**.

No frameworks were used. Everything was implemented manually for educational purposes.

---

# Project Goals

This project focuses on learning:

- TypeScript
- Node.js
- Layered Architecture
- Separation of Concerns
- Repository Pattern
- Service Layer
- Dependency Injection
- Asynchronous File I/O
- JSON-based persistence
- CLI application development
- npm executable (bin) packages

The objective was **not** to build the most feature-rich task manager, but to understand how backend applications are structured.

---

# Features

- Add Task
- Update Task
- Delete Task
- List All Tasks
- List Tasks by Status
- Mark Task as In Progress
- Mark Task as Done
- Persistent Storage using JSON

---

# Project Structure

```
src
│
├── cli
│   └── CommandHandler.ts
│
├── models
│   └── Task.ts
│
├── repositories
│   └── TaskRepository.ts
│
├── services
│   └── TaskService.ts
│
├── types
│   └── TaskTypes.ts
│
└── index.ts

data
└── tasks.json
```

---

# Architecture

```
User
   │
   ▼
Command Line (CLI)
   │
   ▼
CommandHandler
   │
   ▼
TaskService
   │
   ▼
TaskRepository
   │
   ▼
tasks.json
```

Each layer has a single responsibility.

---

# Layer Responsibilities

## CommandHandler

Responsible for:

- Reading command-line arguments
- Parsing commands
- Calling the appropriate service methods
- Printing results

It contains **no business logic**.

---

## TaskService

Responsible for:

- Business logic
- Input validation
- Task creation
- Status changes
- ID generation
- Calling repository methods

The service knows nothing about files or the CLI.

---

## TaskRepository

Responsible for:

- Reading tasks from disk
- Writing tasks to disk
- Finding tasks
- Updating tasks
- Deleting tasks

The repository knows nothing about business rules.

---

## Model

Represents a Task.

```
Task
├── id
├── description
├── status
├── createdAt
└── updatedAt
```

---

# Technologies Used

- TypeScript
- Node.js
- fs/promises
- path
- process

No external frameworks were used.

---

# Why No Framework?

The purpose of this project was to understand how backend applications work underneath frameworks such as:

- Express
- NestJS
- Fastify

After completing this project, moving to Express becomes much easier because the architecture remains almost identical.

---

# Concepts Learned

## TypeScript

- Interfaces
- Type Aliases
- Classes
- Access Modifiers
- Async/Await
- Promises
- ReadonlyArray
- Partial<T>

---

## Node.js

- process.argv
- process.cwd()
- path.join()
- path.dirname()
- fs.promises.readFile()
- fs.promises.writeFile()
- fs.promises.mkdir()

---

## Backend Concepts

- Layered Architecture
- Separation of Concerns
- Dependency Injection
- Repository Pattern
- Service Layer
- Persistence
- CLI Controller

---

## File Persistence

Instead of storing everything in memory,

Tasks are stored inside

```
data/tasks.json
```

Every repository operation

```
Read File
↓

Modify Data

↓

Write File
```

ensuring data persists between program executions.

---

# Task Lifecycle

```
Create
   │
   ▼
Todo
   │
   ▼
In Progress
   │
   ▼
Done
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/SagoRohit/backend-engineering-roadmap/tree/main/cli-task-tracker
```

Go inside the project

```bash
cd cli-task-tracker
```

Install dependencies

```bash
npm install
```

---

# Development

Run using tsx

```bash
npm run dev -- add "Buy groceries"

npm run dev -- list

npm run dev -- update 1 "Buy groceries and cook"

npm run dev -- delete 1

npm run dev -- mark-done 1

npm run dev -- mark-in-progress 1

npm run dev -- list done
```

---

# Build

Compile TypeScript

```bash
npm run build
```

---

# Run Compiled Version

```bash
npm start -- add "Buy groceries"
```

---

# Create CLI Command

After building

```bash
npm run build
```

Link the package

```bash
npm link
```

Now the application can be executed globally.

Example

```bash
task-cli add "Buy groceries"

task-cli list

task-cli update 1 "Cook dinner"

task-cli mark-done 1

task-cli delete 1
```

---

# Supported Commands

## Add Task

```bash
task-cli add "Buy groceries"
```

---

## List All Tasks

```bash
task-cli list
```

---

## List Tasks by Status

```bash
task-cli list todo

task-cli list in-progress

task-cli list done
```

---

## Update Task

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

---

## Delete Task

```bash
task-cli delete 1
```

---

## Mark Task In Progress

```bash
task-cli mark-in-progress 1
```

---

## Mark Task Done

```bash
task-cli mark-done 1
```

---

# Design Decisions

## Why Repository Pattern?

To isolate data persistence from business logic.

If JSON storage is replaced with PostgreSQL, MongoDB, or SQLite, only the repository changes.

---

## Why Service Layer?

Business rules belong in the service.

Examples:

- Description validation
- Status changes
- ID generation

The repository simply stores data.

---

## Why Dependency Injection?

Dependencies are injected through constructors.

Example

```
CommandHandler
        ↓
TaskService
        ↓
TaskRepository
```

This keeps components loosely coupled and easier to test or replace.

---

## Why Async File Operations?

Node.js is asynchronous by design.

Using

```
fs.promises
```

prevents blocking the event loop during file operations.

---

## Why JSON Storage?

A JSON file is sufficient for learning backend architecture while avoiding the complexity of setting up a database.

The storage layer can later be replaced by:

- PostgreSQL
- MySQL
- SQLite
- MongoDB

without changing the service layer.

---

# Future Improvements

Possible extensions include:

- Express REST API
- SQLite or PostgreSQL integration
- UUID-based task IDs
- Better CLI output formatting
- Unit tests
- Input validation utilities
- Command handler refactoring
- Docker support
- Logging
- Search tasks
- Due dates
- Task priorities
- Sorting
- Pagination

---

# Lessons Learned

Building this project helped reinforce several backend engineering principles:

- Keep each layer focused on a single responsibility.
- Separate business logic from persistence.
- Use dependency injection to reduce coupling.
- Prefer asynchronous I/O in Node.js.
- Design around abstractions rather than implementations.
- Build small, maintainable components instead of one large script.

---

# Backend Learning Journey

This project is part of a broader backend engineering learning journey. The emphasis is on understanding the underlying concepts first, implementing them manually, and only then moving on to frameworks like Express and databases such as PostgreSQL.

The goal is not just to make the application work, but to understand *why* it is structured this way.

---

# License

This project is intended for educational purposes.