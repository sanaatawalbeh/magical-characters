const cardContainer = document.getElementById("characterContainer");
const filterSelect = document.getElementById("houseFilter");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let allCharacters = [];
let filteredCharacters = [];
let currentIndex = 0;
const charactersPerPage = 16;

function fetchData() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
      if (!response.ok) throw new Error("The response is not ok");
      return response.json();
    })
    .then((characters) => {
      allCharacters = characters;
      applyFilter(); //
    })
    .catch((error) => {
      console.log("Error caught here:", error);
    });
}

function renderData(characters) {
  characters.forEach((element) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src="${
        element.image ? element.image : "images/not-found.png"
      }" alt="${element.name}">
      <h2>${element.name}</h2>
      <p><strong>House:</strong> ${element.house || "Unknown"}</p>
      <p><strong>Birthdate:</strong> ${element.dateOfBirth || "Unknown"}</p>
      <p><strong>Wand:</strong> ${
        element.wand && element.wand.wood ? element.wand.wood : "Unknown"
      }</p>
    `;
    cardContainer.appendChild(card);
  });
}

function applyFilter() {
  const selectedHouse = filterSelect.value;

  if (selectedHouse === "all") {
    filteredCharacters = allCharacters;
  } else {
    filteredCharacters = allCharacters.filter(
      (char) => char.house === selectedHouse
    );
  }

  currentIndex = 0;
  cardContainer.innerHTML = "";
  renderNextBatch();
}

function renderNextBatch() {
  const nextBatch = filteredCharacters.slice(
    currentIndex,
    currentIndex + charactersPerPage
  );
  renderData(nextBatch);
  currentIndex += charactersPerPage;

  if (currentIndex >= filteredCharacters.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

filterSelect.addEventListener("change", applyFilter);
loadMoreBtn.addEventListener("click", renderNextBatch);

fetchData();
