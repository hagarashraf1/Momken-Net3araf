import { months, governorates, genders } from "./data-sets.js";
import { showToast } from "./toast.js";

const idValidationRegex =
  /^([2-3]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/;

// DOM Elements
const searchForm = document.querySelector(".search form");
const searchInput = document.querySelector(".search form input");
const clearSearch = document.querySelector(".search form .clear");

const resultsPlaceholder = document.querySelector(".search-result-placeholder");
const results = document.querySelector(".search-result");
const gender = document.querySelector(
  ".search-result .card.gender .card-body .value"
);
const governorate = document.querySelector(
  ".search-result .card.location .card-body .value"
);
const birthDate = document.querySelector(
  ".search-result .card.birth-date .card-body .value"
);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate Input
  if (!searchInput.value) return showToast("Please enter an ID");
  if (!idValidationRegex.test(searchInput.value))
    return showToast("Invalid ID");

  const centuryCode = searchInput.value[0];
  const yearCode = searchInput.value[1] + searchInput.value[2];
  const monthCode = searchInput.value[3] + searchInput.value[4];
  const dayCode = searchInput.value[5] + searchInput.value[6];
  const governorateCode = searchInput.value[7] + searchInput.value[8];
  const genderCode = searchInput.value[12] % 2;

  // Show Results
  resultsPlaceholder.classList.add("d-none");
  results.classList.remove("d-none");
  clearSearch.classList.remove("d-none");

  gender.textContent = genders[genderCode];
  governorate.textContent = governorates[governorateCode];
  birthDate.textContent = `${dayCode} ${months[monthCode - 1]} ${
    centuryCode === "2" ? "19" : "20"
  }${yearCode}`;
});

clearSearch.addEventListener("click", () => {
  resultsPlaceholder.classList.remove("d-none");
  results.classList.add("d-none");
  clearSearch.classList.add("d-none");
  searchInput.value = "";
});
