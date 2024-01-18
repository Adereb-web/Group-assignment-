document.addEventListener("DOMContentLoaded", function () {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const submitButton = document.querySelector(".submit-button");
  const resultYear = document.querySelector(".result-year");
  const resultMonth = document.querySelector(".result-month");
  const resultDay = document.querySelector(".result-day");
  const wrongDay = document.querySelector(".error.day");
  const wrongMonth = document.querySelector(".error.month");
  const wrongYear = document.querySelector(".error.year");

  let date = new Date();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1; // Months are zero-based
  let currentYear = date.getFullYear();

  function findDay() {
    if (parseInt(dayInput.value) <= 31) {
      resultDay.textContent = Math.abs(parseInt(dayInput.value) - currentDay);
      wrongDay.textContent = "";
    } else if (dayInput.value === "") {
      wrongDay.textContent = "This field is required";
    } else {
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
      wrongDay.textContent = "Must be a valid Day";
    }
  }

  function findMonth() {
    if (parseInt(monthInput.value) >= 1 && parseInt(monthInput.value) <= 12) {
      const monthDifference = currentMonth - parseInt(monthInput.value);
      resultMonth.textContent =
        monthDifference >= 0 ? monthDifference : 12 + monthDifference;
      wrongMonth.textContent = "";
    } else if (monthInput.value === "") {
      wrongMonth.textContent = "This field is required";
    } else {
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
      wrongMonth.textContent = "Must be a valid Month";
    }
  }

  function findYear() {
    if (
      parseInt(yearInput.value) <= currentYear &&
      parseInt(yearInput.value) > 1900
    ) {
      resultYear.textContent =
        Math.abs(parseInt(yearInput.value) - currentYear) - 1;
      wrongYear.textContent = "";
    } else if (yearInput.value === "") {
      wrongYear.textContent = "This field is required";
    } else if (parseInt(yearInput.value) > currentYear) {
      wrongYear.textContent = "Must be in the past";
    } else {
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
      wrongYear.textContent = "Must be a valid Year";
    }
  }

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    findDay();
    findMonth();
    findYear();
    storeResultInLocalStorage();
  });

  function storeResultInLocalStorage() {
    const ageResult = {
      years: parseInt(resultYear.textContent),
      months: parseInt(resultMonth.textContent),
      days: parseInt(resultDay.textContent),
    };
    localStorage.setItem("ageResult", JSON.stringify(ageResult));
  }

  // Load age result from local storage on page load
  const storedResult = localStorage.getItem("ageResult");
  if (storedResult) {
    const parsedResult = JSON.parse(storedResult);
    resultYear.textContent = parsedResult.years;
    resultMonth.textContent = parsedResult.months;
    resultDay.textContent = parsedResult.days;
  }
});

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
