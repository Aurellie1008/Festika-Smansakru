let tasks = [];

// === Fungsi Kirim ke Google Sheet ===
function sendToGoogleSheet(task) {
    fetch("YOUR_WEB_APP_URL", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
}

function addTask() {
    let name = document.getElementById("taskName").value;
    let deadline = document.getElementById("taskDeadline").value;
    let priority = document.getElementById("taskPriority").value;

    if (!name || !deadline) {
        alert("Isi semua data tugas!");
        return;
    }

    let newTask = { 
        taskName: name, 
        deadline: deadline, 
        priority: priority 
    };

    tasks.push(newTask);
    renderTasks();

    // === Kirim ke Google Sheet ===
    sendToGoogleSheet(newTask);
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((t, i) => {
        list.innerHTML += `
            <li>
                <span>${t.taskName} - ${t.deadline} - ${t.priority}</span>
                <div>
                    <button onclick="toggleDone(${i})">â</button>
                    <button onclick="deleteTask(${i})" style="background:red">â</button>
                </div>
            </li>`;
    });
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function sortByDeadline() {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    renderTasks();
}

function sortByPriority() {
    const order = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    renderTasks();
}

function getAiSuggestion() {
    let input = document.getElementById("aiInput").value;
    if (!input.trim()) {
        alert("Masukkan data tugas!");
        return;
    }

    document.getElementById("aiResult").innerText = "(Contoh AI) Prioritaskan tugas dengan deadline terdekat dan tingkat kesulitan tertinggi.";
}
