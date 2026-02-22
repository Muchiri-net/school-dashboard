"use strict"; // Enforces better coding practices

// 1.0 Data Storage (Part A)
const students = [];

// 2.0 Timer Feature (Part E: Live Clock)
setInterval(() => {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString();
}, 1000);

// 3.0 Form Selection
const studentForm = document.getElementById('studentForm');

// 4.0 Event Listener for Form Submission
studentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Requirement A.4: Prevent page reload

    // Capture Values
    const name = document.getElementById('fullName').value;
    const regNo = document.getElementById('regNo').value;
    const cat = parseFloat(document.getElementById('catMarks').value);
    const exam = parseFloat(document.getElementById('examMarks').value);

    // Part A: Validation logic (redundancy for HTML5 validation)
    if (cat < 0 || cat > 30 || exam < 0 || exam > 70) {
        alert("Invalid marks range!");
        return;
    }

    // Part B: Grade Calculation
    const total = cat + exam;
    let grade = "";

    if (total >= 70) grade = "A";
    else if (total >= 60) grade = "B";
    else if (total >= 50) grade = "C";
    else if (total >= 40) grade = "D";
    else grade = "Fail";

    // Store in Array as Object
    const studentObj = { name, regNo, cat, exam, total, grade };
    students.push(studentObj);

    // Update UI
    updateUI();
    studentForm.reset();
});

// 5.0 DOM Manipulation (Part C)
function updateUI() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; // Clear existing rows

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.regNo}</td>
            <td>${student.total}</td>
            <td><strong>${student.grade}</strong></td>
            <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    calculateStats();
}

// 6.0 Dashboard Features (Part D: Stats & Delete)
function calculateStats() {
    if (students.length === 0) return;

    const totalSum = students.reduce((sum, s) => sum + s.total, 0);
    const avg = (totalSum / students.length).toFixed(2);
    const passes = students.filter(s => s.grade !== "Fail").length;

    document.getElementById('classAverage').innerText = avg;
    document.getElementById('passCount').innerText = passes;
}

// Global function for the delete button
window.deleteStudent = function(index) {
    students.splice(index, 1);
    updateUI();
};