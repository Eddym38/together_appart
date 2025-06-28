import { upgrades } from "../classes/Upgrades.js";
import * as gameLogic from "./gameLogic.js";

// --- ELEMENTS DU DOM ---
export const charactersEl = document.getElementById("characters");
export const loveEl = document.getElementById("love");
export const moneyEl = document.getElementById("money");
export const researchEl = document.getElementById("research");
export const loveBelovedEl = document.getElementById("loveBeloved");
export const hungerEl = document.getElementById("hunger");
export const sleepEl = document.getElementById("sleep");
export const happinessEl = document.getElementById("happiness");
export const startBtn = document.getElementById("startBtn");
export const loadBtn = document.getElementById("loadBtn");
export const menuEl = document.getElementById("menu");
export const bouttonActionsEl = document.getElementById("bouttonActions");
export const saveQuitBtn = document.getElementById("saveQuitBtn");
export const settingsBtn = document.getElementById("settingsBtn");
export const resetBtn = document.getElementById("resetBtn");
export const toggleStatsBtn = document.getElementById("toggleStatsBtn");
export const pageLayoutEl = document.querySelector(".page-layout");
export const writeBtn = document.getElementById("writeBtn");
export const workBtn = document.getElementById("workBtn");
export const researchBtn = document.getElementById("researchBtn");
export const upgradesListEl = document.getElementById("upgrades-list");
export const creditsBtnEl = document.getElementById("creditsBtn");
export const creditsModal = document.getElementById("creditsModal");
export const closeCreditsBtn = document.getElementById("closeCreditsBtn");
export const rulesBtn = document.getElementById("rulesBtn");
export const rulesModal = document.getElementById("rulesModal");
export const closeRulesBtn = document.getElementById("closeRulesBtn");

// --- FONCTIONS ---

export function updateDisplay(player, upgrades, buyUpgrade) {
  console.log("updateDisplay", {
    player,
  });
  if (!Array.isArray(upgrades)) {
    console.error("upgrades n'est pas un tableau :", upgrades);
    return;
  }
  charactersEl.textContent = player.characters;
  loveEl.textContent = Math.floor(player.love);
  moneyEl.textContent = player.money;
  researchEl.textContent = player.researchPoints;
  loveBelovedEl.textContent = Math.floor(player.loveFromBeloved);
  hungerEl.textContent = Math.floor(player.hunger);
  sleepEl.textContent = Math.floor(player.sleep);
  happinessEl.textContent = Math.floor(player.happiness);
  renderDynamicStats(player, upgrades);
  //Met à jour les upgrades
  renderUpgrades(upgrades, player, (id) => buyUpgrade(player, id));
}

export function renderUpgrades(upgrades, player, buyUpgradeCallback) {
  upgradesListEl.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const div = document.createElement("div");
    div.className = "upgrade-item";
    // Désactive     le clic si pas assez de ressources
    if (
      player.money < upgrade.currentCostMoney ||
      player.researchPoints < upgrade.currentCostResearch ||
      upgrade.level >= upgrade.maxLevel
    ) {
      div.classList.add("disabled");
    }

    // Affichage du nom, description et quantité possédée
    const nameDesc = document.createElement("div");
    nameDesc.innerHTML = `
      <strong>${upgrade.name}</strong><br>
      <div class="upgrade-costs">
        <span>Niveau : ${upgrade.level}</span>
        <span>💸 ${formatNumber(upgrade.currentCostMoney)}</span>
        <span>🔬 ${formatNumber(upgrade.currentCostResearch)}</span>
      </div>
    `;

    div.appendChild(nameDesc);

    // Clique sur toute la case
    if (!div.classList.contains("disabled")) {
      div.addEventListener("click", () => buyUpgradeCallback(upgrade.id));
      div.style.cursor = "pointer";
    } else {
      div.style.cursor = "not-allowed";
    }

    upgradesListEl.appendChild(div);
  });
}

export function renderStats(player) {
  const stats = {
    characters: player.characters,
    love: Math.floor(player.love),
    money: player.money,
    researchPoints: player.researchPoints,
    loveFromBeloved: Math.floor(player.loveFromBeloved),
    hunger: Math.floor(player.hunger),
    sleep: Math.floor(player.sleep),
    happiness: Math.floor(player.happiness),
  };

  Object.entries(stats).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = formatNumber(value);
    }
  });
}

export function computeDynamicStats(player, upgrades) {
  return {
    totalCharacters: player.allTimeCharacters,
    charactersPerClick: gameLogic.computeCharactersPerClick(player, upgrades),
    charactersPerSeconde: gameLogic.computeCharctersPerSecond(player, upgrades),
    totalLove: player.allTimeLove,
    lovePerClick: 0,
    lovePerSecond: gameLogic.computeLovePerSecond(player, upgrades),
    totalMoney: player.allTimeMoney,
    moneyPerClick: 0,
    moneyPerSecond: gameLogic.computeMoneyPerSecond(player, upgrades),
    totalResearchPoints: player.allTimeResearchPoints,
    researchPerClick: gameLogic.computeResearchPerClick(player, upgrades),
    researchPerSecond: gameLogic.computeReseachPerSecond(player, upgrades),
  };
}

export function renderDynamicStats(player, upgrades) {
  const stats = computeDynamicStats(player, upgrades);

  Object.entries(stats).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = formatNumber(value);
    }
  });
}

function formatNumber(n) {
  if (n < 1000) return n.toString();
  const units = ["", "k", "M", "G", "T", "P", "E"];
  let unit = 0;
  let num = n;
  while (num >= 1000 && unit < units.length - 1) {
    num /= 1000;
    unit++;
  }
  // 3 chiffres significatifs
  let str = num.toPrecision(3);
  // Supprime les . inutiles
  str = str.replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
  return str + units[unit];
}

export function showMenu() {
  menuEl.classList.remove("hidden");
  pageLayoutEl.classList.add("hidden");
  bouttonActionsEl.classList.add("hidden");
}

export function showCredits() {
  console.log(creditsModal);
  if (creditsModal) {
    creditsModal.classList.remove("hidden");
  } else {
    console.error("Modal de crédits introuvable !");
  }
}
