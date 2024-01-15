document.addEventListener("DOMContentLoaded", function () {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const submitButton = document.querySelector(".submit-button");
  const resultYear = document.querySelector(".result-year");
  const resultMonth = document.querySelector(".result-month");
  const resultDay = document.querySelector(".result-day");
  const themeToggler = document.getElementById("themeToggler");

  // Function to calculate age
  function calculateAge() {
    const currentDate = new Date();
    const inputDate = new Date(
      `${yearInput.value}-${monthInput.value}-${dayInput.value}`
    );

    const ageInMilliseconds = currentDate - inputDate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = Math.floor((ageInDays % 365) % 30);

    // Display the result
    resultYear.textContent = years;
    resultMonth.textContent = months;
    resultDay.textContent = days;

    // Store the result in local storage
    const ageResult = {
      years,
      months,
      days,
    };
    localStorage.setItem("ageResult", JSON.stringify(ageResult));
  }

  // Function to toggle dark mode
 // function toggleDarkMode() {
    //document.body.classList.toggle("dark-mode");
//  }

  // Event listener for submit button
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    calculateAge();
  });

  // Event listener for theme toggler
  themeToggler.addEventListener("click", toggleDarkMode);

  // Load age result from local storage on page load
  document.addEventListener("DOMContentLoaded", function () {
    const storedResult = localStorage.getItem("ageResult");
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      resultYear.textContent = parsedResult.years;
      resultMonth.textContent = parsedResult.months;
      resultDay.textContent = parsedResult.days;
    }
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


