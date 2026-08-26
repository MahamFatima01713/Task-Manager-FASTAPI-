# Task Manager API

A simple CRUD (Create, Read, Update, Delete) Task Manager built with **FastAPI** and **SQLite**, with a vanilla HTML/CSS/JS frontend.

Built as a Week 1-2 learning project to practice FastAPI + database fundamentals.

## Tech Stack

**Backend:**
- FastAPI — Python web framework
- SQLAlchemy — ORM for database operations
- SQLite — lightweight file-based database
- Pydantic — data validation
- Uvicorn — ASGI server

**Frontend:**
- HTML, CSS, JavaScript (vanilla, no frameworks)
- Fetch API for communicating with the backend

## Project Structure

```
task_manager/
├── backend/
│   ├── main.py          # FastAPI app + all routes
│   ├── models.py        # SQLAlchemy database table definition
│   ├── schemas.py       # Pydantic request/response validation
│   ├── crud.py          # Database operations (create/read/update/delete)
│   ├── database.py      # Database connection setup
│   └── requirements.txt # Python dependencies
└── frontend/
    ├── index.html        # Page structure
    ├── style.css         # Styling
    └── script.js         # Connects frontend to backend API
```

## How to Run

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will run at `http://127.0.0.1:8000`

Interactive API docs available at `http://127.0.0.1:8000/docs`

### 2. Frontend Setup

Simply open `frontend/index.html` in your browser (double-click the file, or use a tool like VS Code's "Live Server" extension).

Make sure the backend server is running first, or the frontend won't be able to fetch/save tasks.

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|-----------------------|
| GET    | `/`                | Health check          |
| POST   | `/tasks/`          | Create a new task     |
| GET    | `/tasks/`          | Get all tasks         |
| GET    | `/tasks/{task_id}` | Get a single task     |
| PUT    | `/tasks/{task_id}` | Update a task         |
| DELETE | `/tasks/{task_id}` | Delete a task         |

## Features

- Full CRUD functionality
- Data validation using Pydantic schemas
- Proper error handling (404 responses for missing tasks)
- CORS enabled for frontend-backend communication
- Clean separation of concerns (routes / database logic / validation)
- Simple, responsive UI

## Learning Notes

This project uses SQLite instead of PostgreSQL for simplicity during local development. Since SQLAlchemy is used as the ORM, switching to PostgreSQL later only requires changing the database URL in `database.py` and installing `psycopg2`.
