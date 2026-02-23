// ================= CLOCK =================
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();


// ================= VARIABLES =================
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");

const sTotal = document.getElementById("sTotal");
const sAvg = document.getElementById("sAvg");
const sPasses = document.getElementById("sPasses");
const sFails = document.getElementById("sFails");

const successMsg = document.getElementById("successMsg");

let students = [];
let sortAsc = true;


// ================= GRADE FUNCTION =================
function getGrade(total) {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 40) return "D";
  return "Fail";
}


// ================= VALIDATION =================
function showError(input, msgId) {
  input.classList.add("error");
  document.getElementById(msgId).classList.add("show");
}

function clearError(input, msgId) {
  input.classList.remove("error");
  document.getElementById(msgId).classList.remove("show");
}


// ================= ADD STUDENT =================
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const reg = document.getElementById("reg");
  const cat = document.getElementById("cat");
  const exam = document.getElementById("exam");

  let valid = true;

  // Name validation
  if (!name.value.trim()) {
    showError(name, "nameErr");
    valid = false;
  } else clearError(name, "nameErr");

  // Reg validation
  if (!reg.value.trim()) {
    showError(reg, "regErr");
    valid = false;
  } else clearError(reg, "regErr");

  // CAT validation
  if (cat.value === "" || cat.value < 0 || cat.value > 30) {
    showError(cat, "catErr");
    valid = false;
  } else clearError(cat, "catErr");

  // Exam validation
  if (exam.value === "" || exam.value < 0 || exam.value > 70) {
    showError(exam, "examErr");
    valid = false;
  } else clearError(exam, "examErr");

  if (!valid) return;

  // Create student object
  const total = Number(cat.value) + Number(exam.value);
  const grade = getGrade(total);

  const student = {
    name: name.value,
    reg: reg.value,
    cat: cat.value,
    exam: exam.value,
    total,
    grade
  };

  students.push(student);

  renderTable();
  updateStats();

  // Success message
  successMsg.classList.add("show");
  setTimeout(() => successMsg.classList.remove("show"), 2000);

  form.reset();
});


// ================= RENDER TABLE =================
function renderTable() {
  tableBody.innerHTML = "";

  if (students.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="empty">No students added yet</td></tr>`;
    return;
  }

  // Find top score
  const max = Math.max(...students.map(s => s.total));

  students.forEach((s, index) => {
    const row = document.createElement("tr");

    if (s.total === max) row.classList.add("top-student");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.name}</td>
      <td>${s.reg}</td>
      <td>${s.cat}</td>
      <td>${s.exam}</td>
      <td>
        ${s.total}
        <span class="badge ${s.grade}">${s.grade}</span>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


// ================= UPDATE STATS =================
function updateStats() {
  sTotal.textContent = students.length;

  const totals = students.map(s => s.total);
  const avg = totals.reduce((a,b)=>a+b,0) / totals.length;

  sAvg.textContent = avg.toFixed(1);

  const passes = students.filter(s => s.total >= 40).length;
  const fails = students.filter(s => s.total < 40).length;

  sPasses.textContent = passes;
  sFails.textContent = fails;
}


// ================= SORT BUTTON =================
document.getElementById("sortBtn").addEventListener("click", () => {
  students.sort((a,b) => sortAsc ? a.total - b.total : b.total - a.total);
  sortAsc = !sortAsc;
  renderTable();
});
