document.addEventListener("DOMContentLoaded", function() {
  // Load Header
  fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

  // Load Footer
  fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});


// Use event delegation for the dynamically loaded menu button
document.addEventListener("click", function(event) {
  // Check if click was on menuIcon or a child of menuIcon
  let target = event.target.closest('#menuIcon');
  if (target) {
    // Traverse up to find the nav element next to it or query it globally
    let nav = document.querySelector("nav");
    if (nav) {
      nav.classList.toggle("active");
    }
  }
});