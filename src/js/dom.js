import { upgrades } from "../classes/Upgrades.js";
import * as gauges from "./gauges.js";
import * as stats from "./stats.js";
import { formatNumber } from "./utils.js";
// --- ELEMENTS DU DOM ---
export const charactersEl = document.getElementById("characters");
export const loveEl = document.getElementById("love");
export const moneyEl = document.getElementById("money");
export const researchEl = document.getElementById("research");
export const loveBelovedEl = document.getElementById("loveBeloved");
export const hungerEl = document.getElementById("hunger");
export const sleepEl = document.getElementById("sleep");
export const happinessEl = document.getElementById("happiness");
export const hygieneEl = document.getElementById("hygiene");
export const intelligenceEl = document.getElementById("intelligence");
export const charismaEl = document.getElementById("charisma");
export const strengthEl = document.getElementById("strength");
export const stressEl = document.getElementById("stress");
export const totalCharactersEl = document.getElementById("totalCharacters");
export const startBtn = document.getElementById("startBtn");
export const loadBtn = document.getElementById("loadBtn");
export const menuEl = document.getElementById("menu");
export const bouttonActionsEl = document.getElementById("bouttonActions");
export const saveQuitBtn = document.getElementById("saveQuitBtn");
export const settingsBtn = document.getElementById("settingsBtn");
export const resetBtn = document.getElementById("resetBtn");
export const toggleStatsBtn = document.getElementById("toggleStatsBtn");
export const pageLayoutEl = document.querySelector(".page-layout");
export const messageBox = document.querySelector(".message-box");
export const workBtn = document.getElementById("workBtn");
export const researchBtn = document.getElementById("researchBtn");
export const upgradesListEl = document.getElementById("upgrades-list");
export const creditsBtnEl = document.getElementById("creditsBtn");
export const creditsModal = document.getElementById("creditsModal");
export const closeCreditsBtn = document.getElementById("closeCreditsBtn");
export const rulesBtn = document.getElementById("rulesBtn");
export const rulesModal = document.getElementById("rulesModal");
export const closeRulesBtn = document.getElementById("closeRulesBtn");
export const buyFoodBtn = document.getElementById("buyFoodBtn");
export const buyObjectsBtn = document.getElementById("buyObjectsBtn");
export const foodShopModal = document.getElementById("foodShopModal");
export const itemShopModal = document.getElementById("itemShopModal");
export const buyObjectsModal = document.getElementById("buyObjectsModal");
export const closeBuyFoodBtn = document.getElementById("closeFoodShopBtn");
export const closeItemsShopBtn = document.getElementById("closeItemsShopBtn");
export const buyFoodListEl = document.getElementById("buyFoodList");
export const jobModal = document.getElementById("jobModal");
export const chooseJobBtn = document.getElementById("chooseJobBtn");
export const closeJobModalBtn = document.getElementById("closeJobModalBtn");
export const musicToggle = document.getElementById("musicToggle");
export const musicVolume = document.getElementById("musicVolume");
export const sfxVolume = document.getElementById("sfxVolume");
export const sfxToggle = document.getElementById("sfxToggle");
export const themeSelect = document.getElementById("themeSelect");
export const resetSettingsBtn = document.getElementById("resetSettingsBtn");

// --- FONCTIONS ---

export function updateDisplay(player, upgrades, buyUpgrade) {
  console.log("updateDisplay", {
    player,
  });
  if (!Array.isArray(upgrades)) {
    console.error("upgrades n'est pas un tableau :", upgrades);
    return;
  }

  stats.renderDynamicStats(player, upgrades);
  // Met à jour les éléments de l'interface utilisateur
  gauges.updateGauges(player);
  //Met à jour les upgrades
  renderUpgrades(upgrades, player, (id) => buyUpgrade(player, id));
}

export function renderUpgrades(upgrades, player, buyUpgradeCallback) {
  upgradesListEl.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const level = player.upgrades[upgrade.id] || 0;
    const isMaxLevel =
      typeof upgrade.maxLevel === "number" && level >= upgrade.maxLevel;
    const notEnoughMoney = player.money < upgrade.currentCostMoney(level);
    const notEnoughResearch =
      player.researchPoints < upgrade.currentCostResearch(level);

    // Affiche uniquement si déjà acheté OU si le joueur a les ressources pour acheter
    if (level > 0 || (!isMaxLevel && !notEnoughMoney && !notEnoughResearch)) {
      const div = document.createElement("div");
      div.className = "upgrade-item";
      if (notEnoughMoney || notEnoughResearch || isMaxLevel) {
        div.classList.add("disabled");
      }

      const nameDesc = document.createElement("div");
      nameDesc.innerHTML = `
        <strong>${upgrade.name}</strong><br>
        <div class="upgrade-costs">
          <span>Niveau : ${level}</span>
          <span>💸 ${formatNumber(upgrade.currentCostMoney(level))}</span>
          <span>🔬 ${formatNumber(upgrade.currentCostResearch(level))}</span>
        </div>
      `;

      div.appendChild(nameDesc);

      if (!div.classList.contains("disabled")) {
        div.addEventListener("click", () => buyUpgradeCallback(upgrade.id));
        div.style.cursor = "pointer";
      } else {
        div.style.cursor = "not-allowed";
      }

      upgradesListEl.appendChild(div);
    }
    // Sinon, on ne l'affiche pas du tout
  });
}

export function showMenu() {
  menuEl.classList.remove("hidden");
  pageLayoutEl.classList.add("hidden");
  bouttonActionsEl.classList.add("hidden");
}

export function showGame() {
  menuEl.classList.add("hidden");
  pageLayoutEl.classList.remove("hidden");
  bouttonActionsEl.classList.remove("hidden");
  // Ici seulement, on met à jour l'affichage du jeu
  updateDisplay(player, upgrades, buyUpgrade);
}

export function showCredits() {
  console.log(creditsModal);
  if (creditsModal) {
    creditsModal.classList.remove("hidden");
  } else {
    console.error("Modal de crédits introuvable !");
  }
}
