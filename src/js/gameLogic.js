import * as params from "./params.js";
import { messagesPredefinis } from "./messages.js";
import { upgrades } from "../classes/Upgrades.js";
import * as dom from "./dom.js";
let currentMessageIndex = 0;
let currentMessageText = messagesPredefinis[currentMessageIndex];
let currentTypedText = "";

export function computeLovePerSecond(player, upgrades) {
  let total = params.DEFAULT_LOVE_PER_SECOND ?? 0;
  for (const upgrade of upgrades) {
    total += (player.upgrades[upgrade.id] || 0) * (upgrade.lovePerSecond || 0);
  }
  return total;
}

export function computeHungerPerSecond(player, upgrades) {
  let total = params.HUNGER_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.hungerPerSecond || 0);
  }
  return total;
}

export function computeSleepPerSecond(player, upgrades) {
  let total = params.SLEEP_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total += (player.upgrades[upgrade.id] || 0) * (upgrade.sleepPerSecond || 0);
  }
  return total;
}

export function computeHappinessPerSecond(player, upgrades) {
  let total = params.HAPPINESS_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.happinessPerSecond || 0);
  }
  return total;
}

export function computeEnergyPerSecond(player, upgrades) {
  let total = params.ENERGY_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.energyPerSecond || 0);
  }
  return total;
}

export function computeMoneyPerSecond(player, upgrades) {
  let total = params.MONEY_PER_SECOND ?? 0;
  for (const upgrade of upgrades) {
    total += (player.upgrades[upgrade.id] || 0) * (upgrade.moneyPerSecond || 0);
  }
  return total;
}

export function computeReseachPerSecond(player, upgrades) {
  let total = params.RESEARCH_POINTS_PER_SECOND ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.researchPerSecond || 0);
  }
  return total;
}

export function computeLoveFromBelovedPerSecond(player, upgrades) {
  let total = params.LOVE_FROM_BELOVED_PER_SECOND ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) *
      (upgrade.loveFromBelovedPerSecond || 0);
  }
  return total;
}

export function computeCharctersPerSecond(player, upgrades) {
  let total = 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.charactersPerSecond || 0);
  }
  return total;
}

export function computeLovePerMessage(player, upgrades) {
  let total = params.DEFAULT_LOVE_PER_MESSAGE; // Base value
  for (const upgrade of upgrades) {
    total += (player.upgrades[upgrade.id] || 0) * (upgrade.lovePerMessage || 0);
  }
  return total;
}

export function computeCharactersPerClick(player, upgrades) {
  let total = params.DEFAULT_CHARS_PER_CLICK; // Base value
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.charactersPerClick || 0);
  }
  return total;
}
export function computeMoneyPerWork(player, upgrades) {
  let total = params.DEFAULT_MONEY_PER_WORK; // Base value
  for (const upgrade of upgrades) {
    total += (player.upgrades[upgrade.id] || 0) * (upgrade.moneyPerWork || 0);
  }
  return total;
}
export function computeResearchCost(player, upgrades) {
  let total = params.DEFAULT_RESEARCH_COST; // Base value
  for (const upgrade of upgrades) {
    total += (player.upgrades[upgrade.id] || 0) * (upgrade.researchCost || 0);
  }
  return total;
}

export function computeResearchPerClick(player, upgrades) {
  let total = params.DEFAULT_RESEARCH_PER_CLICK;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.researchPerClick || 0);
  }
  return total;
}

export function writeCharacter(player, upgrades) {
  console.log("writeCharacter called", {
    currentTypedText,
    currentMessageText,
  });
  if (currentTypedText.length >= currentMessageText.length) return;
  console.log(computeCharactersPerClick(player, upgrades), player.characters);
  player.characters += computeCharactersPerClick(player, upgrades);
  player.allTimeCharacters += computeCharactersPerClick(player, upgrades);

  // Ajouter un caractère du message actuel à la zone visible
  let nextChar = currentMessageText[currentTypedText.length] || " ";
  currentTypedText += nextChar;
  document.getElementById("currentMessage").textContent = currentTypedText;

  if (currentTypedText.length >= currentMessageText.length) {
    console.log("Message terminé, checkMessageSent");
    checkMessageSent(player); // si on a fini d’écrire le message
  }

  dom.updateDisplay(player, upgrades, buyUpgrade);
}

export function checkMessageSent(player) {
  console.log("checkMessageSent", {
    characters: player.characters,
    currentTypedText,
  });
  if (player.characters >= currentTypedText.length) {
    player.characters -= currentTypedText.length; // On retire les caractères écrits
    player.love += computeLovePerMessage(player, upgrades); // On ajoute l'amour gagné
    player.allTimeLove += computeLovePerMessage(player, upgrades); // On ajoute l'amour total gagné

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

export function work(player) {
  console.log("work called", { love: player.love, money: player.money });
  if (player.love >= 1) {
    player.money += computeMoneyPerWork(player, upgrades);
    player.allTimeMoney += computeMoneyPerWork(player, upgrades);
    player.love -= 1; // Travailler coûte de l'amour
    dom.updateDisplay(player, upgrades, buyUpgrade);
  } else {
    alert("Tu es trop triste pour travailler 😢");
  }
}

export function doResearch(player) {
  console.log("doResearch called", {
    money: player.money,
    researchPoints: player.researchPoints,
  });
  if (player.money >= computeResearchCost(player, upgrades)) {
    player.money -= computeResearchCost(player, upgrades);
    player.researchPoints += computeResearchPerClick(player, upgrades);
    console.log("Recherche effectuée", {
      researchPoints: player.researchPoints,
      allTimeResearchPoints: player.allTimeResearchPoints,
    });

    player.allTimeResearchPoints += computeResearchPerClick(player, upgrades);
    dom.updateDisplay(player, upgrades, buyUpgrade);
  } else {
    alert("Pas assez d'argent pour faire de la recherche !");
  }
}

export function buyUpgrade(player, id) {
  const upgrade = upgrades.find((u) => u.id === id);
  if (!upgrade) {
    alert("Amélioration introuvable !");
    return;
  }
  if (!upgrade.canPurchase(player)) {
    alert("Pas assez de ressources !");
    return;
  }
  upgrade.purchase(player);
  dom.updateDisplay(player, upgrades, buyUpgrade);
  console.log("Upgrade acheté", upgrade);
}
