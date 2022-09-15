import { glossary } from "./glossary.js";

// sort glossary in alphabetical order
const alphabeticalGlossary = glossary.sort((a, b) =>
  a.term.toLowerCase() > b.term.toLowerCase() ? 1 : -1
);

// ---> SEARCH BY INPUT FIELD <---
/* when "Enter" key is pressed in the input field or "search by term" is clicked...
1. if user inputs a matching term - show results
2. if user inputs a non-matching term - ask for another input
*/
const searchContainer = document.querySelector("#search-container");
const resultsContainer = document.querySelector("#results-container");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", filterGlossaryByTerm);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") filterGlossaryByTerm();
});

function filterGlossaryByTerm() {
  while (resultsContainer.firstChild) {
    resultsContainer.firstChild.remove();
  }

  let matchingTerm = glossary.filter(function (e) {
    if (e.term.toLowerCase() === searchInput.value.toLowerCase()) {
      return true;
    }
  });

  if (matchingTerm.length > 0) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${matchingTerm[0].term}</strong>: <em>${matchingTerm[0].definition}</em>`;
    resultsContainer.appendChild(li);
    searchInput.value = "";
    searchInput.placeholder = "enter another search term";
  } else {
    searchInput.value = "";
    searchInput.placeholder = "term not found. please try another";
  }
}

// ---> FILTER BY CLASS <---

// show/hide dropdown menu when "search by class" button is clicked
const searchByClassDropdown = document.querySelector("#dropdown-content-class");
const searchButtonClass = document
  .querySelector("#search-button-class")
  .addEventListener("click", toggleClassDropdown);

function toggleClassDropdown() {
  if (searchByClassDropdown.style.display === "block") {
    searchByClassDropdown.style.display = "none";
  } else {
    searchByClassDropdown.style.display = "block";
  }
}

// filter glossary by the class that is clicked
searchByClassDropdown.addEventListener("click", filterGlossaryByClass);

function filterGlossaryByClass(e) {
  while (resultsContainer.firstChild) {
    resultsContainer.firstChild.remove();
  }

  let targetClass = Number(e.target.innerHTML.split("")[6]);

  let header = document.createElement("h3");
  header.innerHTML = `<strong>Class ${targetClass} Terms</strong>`;
  resultsContainer.appendChild(header);

  let matchingClass = alphabeticalGlossary.filter(function (thisClass) {
    if (thisClass.class === targetClass) {
      let li = document.createElement("li");
      li.innerHTML = `<strong>${thisClass.term}</strong>: <em>${thisClass.definition}</em>`;
      resultsContainer.appendChild(li);
    }
  });
}

// --> FILTER BY TAG <---

const searchByTagButton = document
  .querySelector("#search-by-tag")
  .addEventListener("click", searchViaTags);

function searchViaTags() {
  while (resultsContainer.firstChild) {
    resultsContainer.firstChild.remove();
  }

  let checkedItems = document.querySelectorAll(".tags:checked");
  let checkedItemsArray = Array.from(checkedItems);

  checkedItemsArray.forEach((item) => {
    alphabeticalGlossary.forEach((a) => {
      if (a.tags.includes(item.name)) {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${a.term}</strong>: <em>${a.definition}</em>`;
        resultsContainer.appendChild(li);
      }
    });
  });

  // uncheck boxes once results are rendered
  checkedItemsArray.forEach((item) => (item.checked = false));
}
