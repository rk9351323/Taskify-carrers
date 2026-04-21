document.addEventListener("DOMContentLoaded", function() {
  // Determine correct base path depending on current page location
  const basePath = window.location.pathname.includes('/pages/') ? '../' : './';

  // Load Header
  fetch(basePath + 'components/header.html')
    .then(response => response.text())
    .then(data => {
      // Fix relative paths in the loaded HTML based on the current page's depth
      document.getElementById('header').innerHTML = data.replace(/\.\.\//g, basePath);
    })
    .catch(error => console.error('Error loading header:', error));

  // Load Footer
  fetch(basePath + 'components/footer.html')
    .then(response => response.text())
    .then(data => {
      // Fix relative paths in the loaded HTML based on the current page's depth
      document.getElementById('footer').innerHTML = data.replace(/\.\.\//g, basePath);
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
    nav.addEventListener("click", function(e) {
      e.preventDefault();
    });
    if (nav) {
      nav.classList.toggle("active");
    }
  }
});