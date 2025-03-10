interface Task {
    id: number;
    title: string;
    states: string;
    startDate: string;
    endDate: string;
}

let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

const form = document.getElementById("task-form") as HTMLFormElement | null;

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById("task-title") as HTMLInputElement | null;
        const taskState = document.getElementById("task-states") as HTMLSelectElement | null;
        const taskStartDate = document.getElementById("task-start-date") as HTMLInputElement | null;
        const taskEndDate = document.getElementById("task-end-date") as HTMLInputElement | null;

        if (!taskTitle || !taskState || !taskStartDate || !taskEndDate) return;
        let taskId = parseInt(localStorage.getItem("ID")||"0");
        let id = ++taskId;
        localStorage.setItem("ID", JSON.stringify(taskId));
        const title = taskTitle.value.trim();
        const states = taskState.value;
        const startDate = taskStartDate.value;
        const endDate = taskEndDate.value;

        const newTask: Task = {id, title, states, startDate, endDate};
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        form.reset();

        displayTasks();
    });
}

function displayTasks() {
    const tasksList = document.getElementById("tasks-list") as HTMLTableElement | null;

    if (!tasksList) return;

    const tbody = tasksList.querySelector("tbody");
    if (tbody) {
        tbody.innerHTML = "";
    }

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.classList.add("task-item");
        row.setAttribute("data-id", task.id.toString()); // إضافة data-id

        row.innerHTML = `
            <td class="task-title">${task.title}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate}</td>
            <td>${task.states}</td>
            <td>
                <i class="far fa-check-circle complete-item mx-2 item-icon text-success"></i>
                <i class="far fa-edit edit-item mx-2 item-icon text-secondary"></i>
                <i class="far fa-times-circle delete-item item-icon text-danger"></i>
            </td>
        `;
        tbody?.appendChild(row);
    });
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const taskElement = target.closest(".task-item") as HTMLElement | null;

    if (!taskElement) return;

    const taskId = parseInt(taskElement.getAttribute("data-id") || "0");

    // if (target.classList.contains("complete-item")) {
    //     taskElement.classList.toggle("completed");
    // }

    // if (target.classList.contains("edit-item")) {
    //     const taskTitle = taskElement.querySelector(".task-title") as HTMLElement;
    //     if (taskTitle) {
    //         const newTitle = prompt("Edit Task Title:", taskTitle.innerText);
    //         if (newTitle) {
    //             taskTitle.innerText = newTitle;
    //             const taskIndex = tasks.findIndex(task => task.id === taskId);
    //             if (taskIndex !== -1) {
    //                 tasks[taskIndex].title = newTitle;
    //                 localStorage.setItem("tasks", JSON.stringify(tasks));
    //             }
    //         }
    //     }
    // }

    if (target.classList.contains("delete-item")) {
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskElement.remove();
    }
});


displayTasks();