// Use event delegation because the header is loaded dynamically
document.addEventListener("click", function(event) {
  if (event.target && event.target.id === "icon") {
    // Ensure this doesn't trigger other parent click events
    event.stopPropagation();

    document.body.classList.toggle("dark-mode");
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    
    // Optional: Switch icon if you have a sun.png
    if(document.body.classList.contains("dark-mode")){
      event.target.src = basePath + "assets/sun.png"; 
    } else {
      event.target.src = basePath + "assets/moon.png";
    }
  }
});