   // CODE FOR DARK MODE STARTS HERE
    
// PLEASE DO NOT EDIT
document.addEventListener("DOMContentLoaded", function () {
  const themeToggler = document.getElementById("themeToggler");
  const body = document.body;

  // Toggle between dark and light mode when the button is clicked
  themeToggler.addEventListener("click", function () {
    const isDarkMode = body.classList.contains("dark-mode");
    setTheme(!isDarkMode);
  });

  // Function to set the theme
  function setTheme(isDarkMode) {
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    themeToggler.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  }
  });
});


