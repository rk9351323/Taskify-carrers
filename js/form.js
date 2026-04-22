// Multi-step form with LocalStorage
const form = document.getElementById("jobForm");
const steps = document.querySelectorAll(".form-step");
const progress = document.getElementById("progress");
let stepIndex = 0;

// Load saved data
if (localStorage.getItem("jobForm")) {
  const saved = JSON.parse(localStorage.getItem("jobForm"));
  for (const [key, value] of Object.entries(saved)) {
    const input = form.elements[key];
    if (input) input.value = value;
  }
}

// Show step
function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle("active", i === index));
  progress.style.width = `${((index + 1) / steps.length) * 100}%`;
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    stepIndex = Math.min(stepIndex + 1, steps.length - 1);
    showStep(stepIndex);
    saveForm();
    if (stepIndex === steps.length - 1) populateReview();
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    stepIndex = Math.max(stepIndex - 1, 0);
    showStep(stepIndex);
  });
});

// Save to localStorage
function saveForm() {
  const data = {};
  Array.from(form.elements).forEach(el => {
    if (el.name) data[el.name] = el.value;
  });
  localStorage.setItem("jobForm", JSON.stringify(data));
}

// Populate review step
function populateReview() {
  const data = JSON.parse(localStorage.getItem("jobForm"));
  const review = document.getElementById("review");
  review.innerHTML = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Experience:</strong> ${data.experience} years</p>
    <p><strong>Skills:</strong> ${data.skills}</p>
    <p><strong>Resume:</strong> ${form.resume.value}</p>
  `;
}

// validation for leadership experience
let showLeadership = document.getElementById("showleaderShip");
form.experience.addEventListener("input", function() {
  if (this.value >= 5) {
    showLeadership.style.display = "block";
  } else {
    showLeadership.style.display = "none";
  }
 

});

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let experience = document.getElementById("experience").value.trim();
  let skills = document.getElementById("skills").value.trim();
  let file = document.getElementById("resume").files[0];
  if(name === ""){
    alert("Please enter your name.");
    return;
  }
  let nameRegex = /^[A-Za-z ]{3,30}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^[6-9]\d{9}$/;

  // Name validation
  if (!nameRegex.test(name)) {
    alert("Invalid Name (only letters, min 3 chars)");
    return;
  }
  // Email validation
  if (!emailRegex.test(email)) {
    alert("Invalid Email");
    return;
  }
  // Phone validation
  if (!phoneRegex.test(phone)) {
    alert("Invalid Phone Number ");
    return;
  }
  // Experience validation
  if ( experience < 0) {
    alert("Invalid Experience (must be a positive number)");
    return;
  }

  //leadership role
  if (showLeadership.value.trim() === "" && experience >= 5) {
    alert("Please enter your leadership experience and role.");
    return ;
  }
  if (showLeadership.value.trim().length < 20  && showLeadership.value.trim() !== "") {
    alert("Please provide more details about your leadership experience (at least 20 characters).");
    return ;
  }
    

  // Skills validation
  if (skills === "") {
    alert("Please enter your skills.");
    return;
  }
  if (file.size > 1 * 1024 * 1024) {
    alert("Resume file size must be less than 1MB.");
    return;
  }


  localStorage.removeItem("jobForm");
  window.location.href = "pages/thankyou.html";
});

showStep(stepIndex);