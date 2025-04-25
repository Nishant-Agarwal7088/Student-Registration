const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Functions for IF-condition-based validators
function isValidName(name) {
  for (let i = 0; i < name.length; i++) {
    const ch = name[i];
    if (!(ch >= "A" && ch <= "Z") && !(ch >= "a" && ch <= "z") && ch !== " ") {
      return false;
    }
  }
  return true;
}

function isDigitsOnly(input) {
  for (let i = 0; i < input.length; i++) {
    if (!(input[i] >= "0" && input[i] <= "9")) {
      return false;
    }
  }
  return true;
}

function isValidEmail(email) {
  if (email.includes("@") && email.includes(".")) {
    const at = email.indexOf("@");
    const dot = email.lastIndexOf(".");
    return at > 0 && dot > at + 1 && dot < email.length - 1;
    
    
  }
  return false;
}

// Render table
function renderStudents() {
  studentList.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td data-label="Name">${student.name}</td>
        <td data-label="ID">${student.id}</td>
        <td data-label="Email">${student.email}</td>
        <td data-label="Contact">${student.contact}</td>
        <td data-label="Actions">
          <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
    studentList.appendChild(row);
  });
}

//  Submit handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentID").value.trim();
  const email = document.getElementById("emailID").value.trim();
  const contact = document.getElementById("contactNo").value.trim();

  //  Validate with if conditions
  if (!name || !id || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!isValidName(name)) {
    alert("Name must contain only letters and spaces.");
    return;
  }

  if (!isDigitsOnly(id)) {
    alert("Student ID must contain only digits.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!isDigitsOnly(contact)) {
    alert("Contact number must contain only digits.");
    return;
  }

  const editingIndex = form.getAttribute("data-editing");
  if (editingIndex !== null) {
    students[editingIndex] = { name, id, email, contact };
    form.removeAttribute("data-editing");
  } else {
    students.push({ name, id, email, contact });
  }

  saveToStorage();
  renderStudents();
  form.reset();
});

//  Edit record
window.editStudent = function (index) {
  const student = students[index];
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentID").value = student.id;
  document.getElementById("emailID").value = student.email;
  document.getElementById("contactNo").value = student.contact;
  form.setAttribute("data-editing", index);
};

//  Delete record
window.deleteStudent = function (index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    saveToStorage();
    renderStudents();
  }
};

//  On load
renderStudents();
