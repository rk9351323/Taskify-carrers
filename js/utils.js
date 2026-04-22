// Use event delegation because the header is loaded dynamically
document.addEventListener("click", function(event) {
  if (event.target && event.target.id === "icon") {
    // Ensure this doesn't trigger other parent click events
    event.stopPropagation();

    document.body.classList.toggle("dark-mode");
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    
    //  Switch icon i  have a sun.png
    if(document.body.classList.contains("dark-mode")){
      event.target.src = basePath + "assets/sun.png"; 
      localStorage.setItem("theme", "dark");
    } else {
      event.target.src = basePath + "assets/moon.png";
      localStorage.setItem("theme", "light");
    }
  }
});

window.onload = function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    
    // Wait for the dynamically loaded header
    setTimeout(function() {
      const icon = document.getElementById("icon");
      if (icon) {
        const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
        icon.src = basePath + "assets/sun.png";
      }
    }, 100);
  }
}
// faq
    function toggleAnswer(id) {
        var x = document.getElementById(id);
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            // Pehle baaki sab band karne ke liye (Optional)
            document.querySelectorAll('.answer-box').forEach(el => el.style.display = 'none');
            x.style.display = "block";
        }
    }