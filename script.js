const API_URL = "http://127.0.0.1:8000";

const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", handleFormSubmit);

async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks/`);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error loading tasks:", error);
        taskList.innerHTML = `<p class="empty-message">Could not connect to server</p>`;
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `<p class="empty-message">No tasks yet. Add one above!</p>`;
        return;
    }

    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = task.completed ? "task-item completed" : "task-item";

        taskDiv.innerHTML = `
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description ? task.description : ""}</div>
            </div>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleComplete(${task.id}, ${task.completed})">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const newTask = {
        title: titleInput.value,
        description: descriptionInput.value,
        completed: false
    };

    try {
        await fetch(`${API_URL}/tasks/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        titleInput.value = "";
        descriptionInput.value = "";

        loadTasks();
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

async function toggleComplete(taskId, currentStatus) {
    try {
        await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !currentStatus })
        });

        loadTasks();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

async function deleteTask(taskId) {
    try {
        await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "DELETE"
        });

        loadTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}
