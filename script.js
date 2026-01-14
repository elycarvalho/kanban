let digitado = document.querySelector("#task-input")

digitado.focus()

document.addEventListener("keyup", () => {    
    let tamanhoDigitado = digitado.value.length
    if (tamanhoDigitado >= 10) {
        createTask()
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const columns = document.querySelectorAll(".column");

    columns.forEach(column => {
        column.addEventListener("dragover", (event) => {
            event.preventDefault(); // Allows dropping
        });

        column.addEventListener("drop", (event) => {
            const taskId = event.dataTransfer.getData("text");
            const task = document.getElementById(taskId);
            if (task) column.appendChild(task); // Move task to new column
        });
    });
});

// Function to create a draggable task dynamically
function createTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = taskText;
    task.id = `task-${Date.now()}`;
    task.setAttribute("draggable", "true");

    // Attach drag event listener immediately after creating the task
    task.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.id);
    });

    document.getElementById("todo").querySelector(".task-list").appendChild(task);
    taskInput.value = ""; // Clear input field

    // Reapply drag event listeners to all tasks (including new ones)
    applyDragHandlers();
}

// Function to ensure all tasks (including newly created ones) are draggable
function applyDragHandlers() {
    document.querySelectorAll(".task").forEach(task => {
        task.setAttribute("draggable", "true");
        task.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });
}

// Ensure previously created tasks have drag functionality
document.addEventListener("DOMContentLoaded", applyDragHandlers);

