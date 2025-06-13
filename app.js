let role = "";
async function login() {
  const key = document.getElementById("keyInput").value.trim();
  const res = await fetch("access.json");
  const access = await res.json();

  if (access[key]) {
    role = access[key];
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("roleTag").innerText = "Role: " + role;
    loadLogs();
    loadTools();
  } else {
    document.getElementById("loginError").innerText = "Invalid key.";
  }
}

async function loadLogs() {
  try {
    const res = await fetch("data/logs.json");
    const logs = await res.json();
    document.getElementById("logBox").innerText = logs.join("\n");
  } catch {
    document.getElementById("logBox").innerText = "No logs found.";
  }
}

function loadTools() {
  const container = document.getElementById("toolContainer");
  container.innerHTML = "";

  if (role === "Admin" || role === "Agent") {
    container.innerHTML += "<p>✔ Tool: Scan Users</p>";
  }

  if (role === "Admin") {
    container.innerHTML += "<p>✔ Admin: Manage Access</p>";
  }
}
