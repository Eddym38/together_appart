import { messagesPredefinis } from "./messages.js";
import { Upgrade, upgrades } from "../classes/Upgrades.js";
import { Player } from "../classes/Player.js";
import { savePlayer, loadPlayer } from "./save.js";
import * as params from "./params.js";
import * as dom from "./dom.js";
import { buyUpgrade, computeLovePerSecond } from "./gameLogic.js";
import { bindEvents, bindSettingsEvents } from "./events.js";
import * as gameLogic from "./gameLogic.js";

// ...initialisation, gestion des événements, etc.

let player = loadPlayer();
bindEvents(player, upgrades);
bindSettingsEvents();

setInterval(() => {
  player.love += gameLogic.computeLovePerSecond(player, upgrades);
  player.allTimeLove += gameLogic.computeLovePerSecond(player, upgrades);

  player.hunger += gameLogic.computeHungerPerSecond(player, upgrades);
  player.sleep += gameLogic.computeSleepPerSecond(player, upgrades);
  player.happiness += gameLogic.computeHappinessPerSecond(player, upgrades);
  player.energy = gameLogic.computeEnergyPerSecond(player, upgrades);

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
dom.updateDisplay(player, upgrades, buyUpgrade);
dom.renderUpgrades(upgrades, player, (id) => buyUpgrade(player, id));
