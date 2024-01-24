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
  const clearButton = document.querySelector(".clear-button");

  let date = new Date();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1; // Months are zero-based
  let currentYear = date.getFullYear();
  let inputValid = true;

  const isLeapYear = (day, month, year) => {
    month = month - 1;
    fullDate = new Date(year, month, day);
    return (
      day == fullDate.getDate() &&
      month == fullDate.getMonth() &&
      year == fullDate.getFullYear()
    );
  };

  const subtractAge = () => {
    dayInput.addEventListener("input", clearBorder);
    monthInput.addEventListener("input", clearBorder);
    yearInput.addEventListener("input", clearBorder);

    function clearBorder() {
      wrongDay.textContent = "";
      wrongMonth.textContent = "";
      wrongYear.textContent = "";
      dayInput.style.borderColor = "var(--Light-grey)";
      monthInput.style.borderColor = "var(--Light-grey)";
      yearInput.style.borderColor = "var(--Light-grey)";
    }

    // Input validation for day
    if (parseInt(dayInput.value) >= 1 && parseInt(dayInput.value) <= 31) {
      resultDay.textContent = Math.abs(parseInt(dayInput.value) - currentDay);
      wrongDay.textContent = "";
    } else if (dayInput.value === "") {
      wrongDay.textContent = "This field is required";
      dayInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    } else {
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
      wrongDay.textContent = "Must be a valid Day";
      dayInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    }

    const lastDayOfMonth = new Date(
      yearInput.value,
      monthInput.value,
      0
    ).getDate();

    if (dayInput.value > lastDayOfMonth) {
      wrongDay.textContent = "Must be a valid day.";
      dayInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    }

    // Input validation for month
    if (parseInt(monthInput.value) >= 1 && parseInt(monthInput.value) <= 12) {
      const monthDifference = currentMonth - parseInt(monthInput.value);
      resultMonth.textContent =
        monthDifference >= 0 ? monthDifference : 12 + monthDifference;
      wrongMonth.textContent = "";
    } else if (monthInput.value === "") {
      wrongMonth.textContent = "This field is required";
      monthInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    } else {
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
      wrongMonth.textContent = "Must be a valid Month";
      monthInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    }

    // Input validation for year
    if (
      parseInt(yearInput.value) <= currentYear &&
      parseInt(yearInput.value) > 1900
    ) {
      if (
        parseInt(yearInput.value) === currentYear &&
        parseInt(monthInput.value) >= currentMonth
      ) {
        wrongYear.textContent = "Must be in the past";
        yearInput.style.borderColor = "var(--Light-red)";
        inputValid = false;
      } else {
        resultYear.textContent =
          Math.abs(parseInt(yearInput.value) - currentYear) - 1;
        wrongYear.textContent = "";
      }
    } else if (yearInput.value === "") {
      wrongYear.textContent = "This field is required";
      yearInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    } else if (parseInt(yearInput.value) > currentYear) {
      wrongYear.textContent = "Must be in the past";
      yearInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    } else {
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
      wrongYear.textContent = "Must be a valid Year";
      yearInput.style.borderColor = "var(--Light-red)";
      inputValid = false;
    }

    // Calculate age only if input is valid
    if (inputValid) {
      let newYear = Math.abs(currentYear - parseInt(yearInput.value));

      let newMonth = 0;
      if (currentMonth >= parseInt(monthInput.value)) {
        newMonth = currentMonth - parseInt(monthInput.value);
      } else {
        newYear--;
        newMonth = 12 + currentMonth - parseInt(monthInput.value);
      }

      let newDay = 0;
      if (currentDay >= parseInt(dayInput.value)) {
        newDay = currentDay - parseInt(dayInput.value);
      } else {
        newMonth--;
        if (
          isLeapYear(
            parseInt(dayInput.value),
            parseInt(monthInput.value),
            parseInt(yearInput.value)
          )
        ) {
          newDay = 30 + currentDay - parseInt(dayInput.value);
        } else {
          newDay = currentDay - parseInt(dayInput.value);
        }

        if (newMonth < 0) {
          newMonth = 11;
          newYear--;
        }
        if (newMonth < currentMonth) {
          newDay++;
        }
      }

      resultYear.textContent = newYear;
      resultMonth.textContent = newMonth;
      resultDay.textContent = newDay;
    }
  };

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    inputValid = true;

    // findDay();
    // findMonth();
    // findYear();

    subtractAge();

    //checks if input is valid before calculating
    if (inputValid) {
      storeResultInLocalStorage();
    } else {
      // Clear result if input is invalid
      resultDay.textContent = "--";
      resultMonth.textContent = "--";
      resultYear.textContent = "--";
    }
  });

  // store age in local storage
  function storeResultInLocalStorage() {
    const ageResult = {
      years: parseInt(resultYear.textContent),
      months: parseInt(resultMonth.textContent),
      days: parseInt(resultDay.textContent),
    };
    localStorage.setItem("ageResult", JSON.stringify(ageResult));

    // clear input after saving
    dayInput.value = "";
    monthInput.value = "";
    yearInput.value = "";

    dayInput.style.borderColor = "var(--Light-grey)";
    monthInput.style.borderColor = "var(--Light-grey)";
    yearInput.style.borderColor = "var(--Light-grey)";
  }

  // Load age result from local storage on page load
  const storedResult = localStorage.getItem("ageResult");
  if (storedResult) {
    const parsedResult = JSON.parse(storedResult);
    resultYear.textContent = parsedResult.years;
    resultMonth.textContent = parsedResult.months;
    resultDay.textContent = parsedResult.days;
  }

  //setting clear button
  clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("ageResult");
    resultDay.textContent = "--";
    resultMonth.textContent = "--";
    resultYear.textContent = "--";
  });
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
