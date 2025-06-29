import { upgrades } from "../classes/Upgrades.js";
import { loadPlayer } from "./save.js";
import * as dom from "./dom.js";
import { buyUpgrade, computeLovePerSecond } from "./gameLogic.js";
import { bindEvents, bindSettingsEvents } from "./events.js";
import { bindJobSelection } from "./jobSelection.js";
import { bindFoodShop } from "./foodShop.js";
import * as gameLogic from "./gameLogic.js";
import { renderInventory } from "./inventory.js";

// ...initialisation, gestion des événements, etc.

let player = loadPlayer();
bindEvents(player, upgrades);
bindSettingsEvents();
bindJobSelection(player, upgrades);
bindFoodShop(player, upgrades);
renderInventory(player);

let gameRunning = false;

// Fonction pour démarrer la partie (à appeler quand le joueur lance une partie)
export function startGame() {
  gameRunning = true;
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".menu").classList.add("hidden");
  dom.updateDisplay(player, upgrades, buyUpgrade);
}

// Fonction pour retourner au menu (optionnel)
export function showMenu() {
  gameRunning = false;
  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".menu").classList.remove("hidden");
}

// Boucle principale du jeu, ne met à jour que si la partie est en cours
setInterval(() => {
  if (!gameRunning) return;

  player.love += gameLogic.computeLovePerSecond(player, upgrades);
  player.allTimeLove += gameLogic.computeLovePerSecond(player, upgrades);

  player.hunger += gameLogic.computeHungerPerSecond(player, upgrades);
  player.sleep += gameLogic.computeSleepPerSecond(player, upgrades);
  player.happiness += gameLogic.computeHappinessPerSecond(player, upgrades);
  player.energy = gameLogic.computeEnergyPerSecond(player, upgrades);
  player.hygiene += gameLogic.computeHygienePerSecond(player, upgrades);
  player.intelligence += gameLogic.computeIntelligencePerSecond(
    player,
    upgrades
  );
  player.charisma += gameLogic.computeCharismaPerSecond(player, upgrades);
  player.strength += gameLogic.computeStrengthPerSecond(player, upgrades);
  player.stress += gameLogic.computeStressPerSecond(player, upgrades);

  player.money += gameLogic.computeMoneyPerSecond(player, upgrades);
  player.allTimeMoney += gameLogic.computeMoneyPerSecond(player, upgrades);

  player.researchPoints += gameLogic.computeReseachPerSecond(player, upgrades);
  player.allTimeResearchPoints += gameLogic.computeReseachPerSecond(
    player,
    upgrades
  );
  player.loveFromBeloved += gameLogic.computeLoveFromBelovedPerSecond(
    player,
    upgrades
  );
  player.characters += gameLogic.computeCharctersPerSecond(player, upgrades);
  player.allTimeCharacters += gameLogic.computeCharctersPerSecond(
    player,
    upgrades
  );

  dom.updateDisplay(player, upgrades, buyUpgrade);
}, 1000);

// --- INIT ---
console.log("Script chargé, initialisation...");
