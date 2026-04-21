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

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  localStorage.removeItem("jobForm");
  window.location.href = "pages/thankyou.html";
});

showStep(stepIndex);