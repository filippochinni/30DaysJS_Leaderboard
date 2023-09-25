/* DEFINIZIONE DI ELEMENTI */

const scoreIncrement = 5;
const scoreDecrement = 5;

const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const countryInput = document.querySelector("#countryInput");
const scoreInput = document.querySelector("#scoreInput");
const submitButton = document.querySelector("#submitButton");

const feedback = document.querySelector("#feedback");

const leaderboardDiv = document.querySelector("#leaderboardDiv");



/* FUNZIONI */

function funzioneMaster() {
    const name = nameInput.value;
    const surname = surnameInput.value;
    const country = countryInput.value;
    const score = Number(scoreInput.value);
    
    if(score > 100 || score < 0 || isNaN(score)) {
        feedback.textContent = "Inserire un Numero Valido per lo Score";
        return;
    }

    if(!(score) || !(surname) || !(country) || !(score)) {
        feedback.textContent = "Tutti i Campi sono obbligatori";
        return;
    }

    feedback.textContent = "";

    nameInput.value = "";
    surnameInput.value = "";
    countryInput.value = "";
    scoreInput.value = "";

    creaPlayerBox(name, surname, country, score);
}

function creaPlayerBox(name, surname, country, score) {
    const leaderboardBox = creaLeaderboardBox(name, surname, country, score);
    leaderboardDiv.appendChild(leaderboardBox);

    sortLeaderboard();
    salvaLeaderboard();
}

function creaLeaderboardBox(name, surname, country, score) {
    const leaderboardBox = document.createElement("div");
    leaderboardBox.classList.add("leaderboardBox");

    const nameDiv = creaNameDiv(name, surname);
    const countryP = creaCountryP(country);
    const scoreP = creaScoreP(score);
    const scoreButtonsDiv = creaScoreButtonsDiv();

    leaderboardBox.appendChild(nameDiv);
    leaderboardBox.appendChild(countryP);
    leaderboardBox.appendChild(scoreP);
    leaderboardBox.appendChild(scoreButtonsDiv);

    return leaderboardBox;
}

function creaNameDiv(name, surname) {
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("leaderboardBoxElement");
    nameDiv.classList.add("nameDiv");

    const fullNameP = document.createElement("p");
    fullNameP.classList.add("fullNameP");
    fullNameP.textContent = `${name.toUpperCase()} ${surname.toUpperCase()}`;
    nameDiv.appendChild(fullNameP);

    const creationTimeP = document.createElement("p");
    creationTimeP.classList.add("creationTimeP");
    const tempDate = new Date();
    creationTimeP.textContent = `${tempDate.toLocaleDateString()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    nameDiv.appendChild(creationTimeP);

    return nameDiv;
}

function creaCountryP(country) {
    const countryP = document.createElement("p");
    countryP.classList.add("leaderboardBoxElement");
    countryP.classList.add("countryP");
    countryP.textContent = country.toUpperCase();

    return countryP;
}

function creaScoreP(score) {
    const scoreP = document.createElement("p");
    scoreP.classList.add("leaderboardBoxElement");
    scoreP.classList.add("scoreP");
    scoreP.textContent = score;

    return scoreP;
}

function creaScoreButtonsDiv() {
    const scoreButtonsDiv = document.createElement("p");
    scoreButtonsDiv.classList.add("leaderboardBoxElement");
    scoreButtonsDiv.classList.add("scoreButtonsDiv");

    const deleteButton = creaScoreButton("🗑", eliminaPlayerBox);
    deleteButton.classList.add("deleteButton");

    const addButton = creaScoreButton(`+${scoreIncrement}`, incrementaScore);
    addButton.classList.add("addButton");

    const minusButton = creaScoreButton(`-${scoreDecrement}`, decrementaScore);
    minusButton.classList.add("minusButton");

    scoreButtonsDiv.appendChild(deleteButton);
    scoreButtonsDiv.appendChild(addButton);
    scoreButtonsDiv.appendChild(minusButton);

    return scoreButtonsDiv;
}

function creaScoreButton(label, onclickFunction) {
    const button = document.createElement("button");
    button.classList.add("scoreButton");

    button.textContent = label;
    button.onclick = onclickFunction;

    return button;
}

function incrementaScore(event) {
    const leaderboardBox = event.target.closest(".leaderboardBox");
    const scoreElement = leaderboardBox.querySelector(".scoreP");
    const score = +(scoreElement.textContent);

    if(score <= 95)     scoreElement.textContent = score + scoreIncrement;

    sortLeaderboard();
    salvaLeaderboard();
}

function decrementaScore(event) {
    const leaderboardBox = event.target.closest(".leaderboardBox");
    const scoreElement = leaderboardBox.querySelector(".scoreP");
    const score = +(scoreElement.textContent);

    if(score >= 5)     scoreElement.textContent = score - scoreIncrement;

    sortLeaderboard();
    salvaLeaderboard();
}

function eliminaPlayerBox(event) {
    const leaderboardBox = event.target.closest(".leaderboardBox");
    leaderboardBox.remove();

    sortLeaderboard();
    salvaLeaderboard();
}

function sortLeaderboard() {
    const leaderboardBoxes = Array.from(document.querySelectorAll(".leaderboardBox"));
  
    leaderboardBoxes.sort((a, b) => {
        const scoreA = parseInt(a.querySelector(".scoreP").textContent);
        const scoreB = parseInt(b.querySelector(".scoreP").textContent);
        return (scoreB - scoreA);
    });
  
    leaderboardDiv.innerHTML = "";
    leaderboardBoxes.forEach((leaderboardBox) => leaderboardDiv.appendChild(leaderboardBox));
}

function salvaLeaderboard() {
    const leaderboardDiv = document.querySelector("#leaderboardDiv");
    const leaderboardHTML = leaderboardDiv.innerHTML;
    localStorage.setItem("leaderboardData", leaderboardHTML);
}

function caricaLeaderboard() {
    const leaderboardDiv = document.querySelector("#leaderboardDiv");
    const leaderboardHTML = localStorage.getItem("leaderboardData");
    
    if (leaderboardHTML) {
        leaderboardDiv.innerHTML = leaderboardHTML;
    }
    else {
        alert("I dati precedentemente salvati sono Scaduti o andati persi.");
    }
}


/* ESECUZIONE */

submitButton.onclick = funzioneMaster;

document.addEventListener("DOMContentLoaded", caricaLeaderboard);











  