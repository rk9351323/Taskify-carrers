// Use event delegation because the header is loaded dynamically
document.addEventListener("click", function(event) {
  if (event.target && event.target.id === "icon") {
    document.body.classList.toggle("dark-mode");
    
    // Optional: Switch icon if you have a sun.png
    if(document.body.classList.contains("dark-mode")){
      event.target.src = "../assets/sun.png"; 
    } else {
      event.target.src = "../assets/moon.png";
    }
  }
});