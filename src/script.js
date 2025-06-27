import { messagesPredefinis } from "./messages.js";
import { upgrades } from "./classes/Upgrades.js";
import { Player } from "./classes/Player.js";
import { savePlayer, loadPlayer } from "./save.js";

let player = loadPlayer();

let currentMessageIndex = 0;
let currentMessageText = messagesPredefinis[currentMessageIndex];
let currentTypedText = "";

// --- PARAMÈTRES ---
let charsPerClick = 1;
let lovePerSecond = 0;
let lovePerMessage = 5;
let moneyPerWork = 10;
let researchCost = 5;

// --- ELEMENTS DU DOM ---
const charactersEl = document.getElementById("characters");
const loveEl = document.getElementById("love");
const moneyEl = document.getElementById("money");
const researchEl = document.getElementById("research");
const loveBelovedEl = document.getElementById("loveBeloved");
const hungerEl = document.getElementById("hunger");
const sleepEl = document.getElementById("sleep");
const happinessEl = document.getElementById("happiness");

const writeBtn = document.getElementById("writeBtn");
const workBtn = document.getElementById("workBtn");
const researchBtn = document.getElementById("researchBtn");
const saveQuitBtn = document.getElementById("saveQuitBtn");

// --- FONCTIONS ---
function updateDisplay() {
  console.log("updateDisplay", {
    ...player,
  });
  charactersEl.textContent = player.characters;
  loveEl.textContent = Math.floor(player.love);
  moneyEl.textContent = player.money;
  researchEl.textContent = player.researchPoints;
  loveBelovedEl.textContent = Math.floor(player.loveFromBeloved);
  hungerEl.textContent = Math.floor(player.hunger);
  sleepEl.textContent = Math.floor(player.sleep);
  happinessEl.textContent = Math.floor(player.happiness);
}

function writeCharacter() {
  console.log("writeCharacter called", {
    currentTypedText,
    currentMessageText,
  });
  if (currentTypedText.length >= currentMessageText.length) return;

  player.characters += charsPerClick;

  // Ajouter un caractère du message actuel à la zone visible
  let nextChar = currentMessageText[currentTypedText.length] || " ";
  currentTypedText += nextChar;
  document.getElementById("currentMessage").textContent = currentTypedText;

  if (currentTypedText.length >= currentMessageText.length) {
    console.log("Message terminé, checkMessageSent");
    checkMessageSent(); // si on a fini d’écrire le message
  }

  updateDisplay();
}

function checkMessageSent() {
  console.log("checkMessageSent", {
    characters: player.characters,
    currentTypedText,
  });
  if (player.characters >= currentTypedText.length) {
    player.characters -= currentTypedText.length; // On retire les caractères écrits
    player.love += lovePerMessage;

    // Choisir un message aléatoire différent du précédent
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * messagesPredefinis.length);
    } while (newIndex === currentMessageIndex && messagesPredefinis.length > 1);

    currentMessageIndex = newIndex;
    currentMessageText = messagesPredefinis[currentMessageIndex];
    currentTypedText = "";

    document.getElementById("currentMessage").textContent =
      "💌 Nouveau message...";
    console.log("Nouveau message choisi", currentMessageText);
  }
}

function work() {
  console.log("work called", { love: player.love, money: player.money });
  if (player.love >= 1) {
    player.money += moneyPerWork;
    player.love -= 1; // Travailler coûte de l'amour
    updateDisplay();
  } else {
    alert("Tu es trop triste pour travailler 😢");
  }
}

function doResearch() {
  console.log("doResearch called", {
    money: player.money,
    researchPoints: player.researchPoints,
  });
  if (player.money >= researchCost) {
    player.money -= researchCost;
    player.researchPoints += 1;
    updateDisplay();
  } else {
    alert("Pas assez d'argent pour faire de la recherche !");
  }
}

const upgradesListEl = document.getElementById("upgrades-list");

function renderUpgrades() {
  upgradesListEl.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const div = document.createElement("div");
    div.className = "upgrade-item";

    const nameDesc = document.createElement("div");
    nameDesc.innerHTML = `<strong>${upgrade.name}</strong><br><small>${upgrade.description}</small>`;

    const btn = document.createElement("button");
    btn.textContent = upgrade.bought
      ? "✅ Acheté"
      : `Acheter (${upgrade.costMoney}💸, ${upgrade.costResearch}🔬)`;
    btn.disabled =
      upgrade.bought ||
      player.money < upgrade.costMoney ||
      player.researchPoints < upgrade.costResearch;

    btn.addEventListener("click", () => buyUpgrade(upgrade.id));

    div.appendChild(nameDesc);
    div.appendChild(btn);
    upgradesListEl.appendChild(div);
  });
}

function buyUpgrade(id) {
  console.log("buyUpgrade called", { id });
  const upgrade = upgrades.find((u) => u.id === id);
  if (!upgrade) {
    console.log("Upgrade introuvable", id);
    return;
  }

  if (
    player.money >= upgrade.costMoney &&
    player.researchPoints >= upgrade.costResearch &&
    !upgrade.bought
  ) {
    player.money -= upgrade.costMoney;
    player.researchPoints -= upgrade.costResearch;
    upgrade.bought = true;

    // Mettre à jour stats
    if (upgrade.charactersPerClick > charsPerClick) {
      charsPerClick = upgrade.charactersPerClick;
    }
    lovePerSecond += upgrade.lovePerSecond;

    updateDisplay();
    renderUpgrades();
    console.log("Upgrade acheté", upgrade);
  } else {
    alert("Tu n’as pas assez d'argent ou de recherche !");
  }
}
setInterval(() => {
  player.love += lovePerSecond;
  updateDisplay();
}, 1000);

// --- ÉVÉNEMENTS ---
writeBtn.addEventListener("click", writeCharacter);
workBtn.addEventListener("click", work);
researchBtn.addEventListener("click", doResearch);
saveQuitBtn.addEventListener("click", () => {
  savePlayer(player);
  alert("Partie sauvegardée ! À bientôt 👋");
  window.location.href = "https://www.google.com"; // ou ferme la page selon ton besoin
});

// --- INIT ---
console.log("Script chargé, initialisation...");
updateDisplay();
renderUpgrades();
