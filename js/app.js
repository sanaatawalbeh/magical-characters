const cardContainer = document.getElementById("characterContainer");

let allCharacters = [];

function fetchData() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
      if (!response.ok) throw new Error("The response is not ok");
      return response.json();
    })
    .then((characters) => {
      allCharacters = characters;
      renderData(allCharacters.slice(0, 16)); // عرض أول 16 عند البداية
    })
    .catch((error) => {
      console.log("Error caught here:", error);
    });
}
function renderData(characters) {
  cardContainer.innerHTML = ""; // مسح القديم

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

        
      `;
    cardContainer.appendChild(card);
  });
}
const filterSelect = document.getElementById("houseFilter");

filterSelect.addEventListener("change", () => {
  const selectedHouse = filterSelect.value;
  let filteredCharacters = [];

  if (selectedHouse === "all") {
    filteredCharacters = allCharacters;
  } else {
    filteredCharacters = allCharacters.filter(
      (char) => char.house === selectedHouse
    );
  }

  renderData(filteredCharacters.slice(0, 16)); // عرض أول 16 من النتيجة
});
  
fetchData();
