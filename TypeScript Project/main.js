var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
var form = document.getElementById("task-form");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var taskTitle = document.getElementById("task-title");
        var taskState = document.getElementById("task-states");
        var taskStartDate = document.getElementById("task-start-date");
        var taskEndDate = document.getElementById("task-end-date");
        if (!taskTitle || !taskState || !taskStartDate || !taskEndDate)
            return;
        var taskId = parseInt(localStorage.getItem("ID") || "0", 10);
        var id = ++taskId;
        localStorage.setItem("ID", JSON.stringify(taskId));
        var newTask = {
            id: id,
            title: taskTitle.value.trim(),
            states: taskState.value,
            startDate: taskStartDate.value,
            endDate: taskEndDate.value
        };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        form.reset();
        displayTasks();
    });
}
function displayTasks() {
    var tasksList = document.getElementById("tasks-list");
    if (!tasksList)
        return;
    var tbody = tasksList.querySelector("tbody");
    if (tbody)
        tbody.innerHTML = "";
    tasks.forEach(function (task) {
        var row = document.createElement("tr");
        row.classList.add("task-item");
        row.innerHTML = "\n            <td class=\"task-title\">".concat(task.title, "</td>\n            <td>").concat(task.startDate, "</td>\n            <td>").concat(task.endDate, "</td>\n            <td>").concat(task.states, "</td>\n            <td>\n                <i class=\"far fa-check-circle complete-item mx-2 item-icon text-success\"></i>\n                <i class=\"far fa-edit edit-item mx-2 item-icon text-secondary\"></i>\n                <i class=\"far fa-times-circle delete-item item-icon text-danger\"></i>\n            </td>\n        ");
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
    });
}
document.addEventListener("click", function (event) {
    var target = event.target;
    var taskElement = target.closest(".task-item");
    if (!taskElement)
        return;
    var taskId = parseInt(taskElement.getAttribute("data-id") || "0", 10);
    if (target.classList.contains("delete-item")) {
        tasks = tasks.filter(function (task) { return task.id !== taskId; });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskElement.remove();
    }
});
displayTasks();
