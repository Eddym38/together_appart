import * as params from "./params.js";
import { messagesPredefinis } from "./messages.js";
import { upgrades } from "../classes/Upgrades.js";
import * as dom from "./dom.js";
import { jobs } from "../classes/Jobs.js";
import { showComboBadge } from "./messages.js";

let currentMessageIndex = 0;
let currentMessageText = messagesPredefinis[currentMessageIndex];
let currentTypedText = "";
let emojiCounter = 0; // Ajoute cette variable globale en haut du fichier

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

export function computeHygienePerSecond(player, upgrades) {
  let total = params.HYGIENE_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.hygienePerSecond || 0);
  }
  return total;
}

export function computeIntelligencePerSecond(player, upgrades) {
  let total = params.INTELLIGENCE_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.intelligencePerSecond || 0);
  }
  return total;
}
export function computeCharismaPerSecond(player, upgrades) {
  let total = params.CHARISMA_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.charismaPerSecond || 0);
  }
  return total;
}
export function computeStrengthPerSecond(player, upgrades) {
  let total = params.STRENGTH_DECREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.strengthPerSecond || 0);
  }
  return total;
}
export function computeStressPerSecond(player, upgrades) {
  let total = params.STRESS_INCREASE_RATE ?? 0;
  for (const upgrade of upgrades) {
    total +=
      (player.upgrades[upgrade.id] || 0) * (upgrade.stressPerSecond || 0);
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
  const charsPerClick = computeCharactersPerClick(player, upgrades);
  const charsLeft = currentMessageText.length - currentTypedText.length;

  // Si on dépasse la longueur du message, on termine le message d'un coup
  const charsToWrite = Math.min(charsPerClick, charsLeft);

  // Ajoute tous les caractères d'un coup
  currentTypedText += currentMessageText.slice(
    currentTypedText.length,
    currentTypedText.length + charsToWrite
  );
  document.getElementById("currentMessage").textContent = currentTypedText;

  player.characters += charsToWrite;
  player.allTimeCharacters += charsToWrite;

  // Animation emoji tous les 5 caractères écrits (modifiable)
  emojiCounter += charsToWrite;
  while (emojiCounter >= 5) {
    spawnFlyingMessageEmoji();
    emojiCounter -= 5;
  }

  // Si le message est terminé, on envoie plusieurs messages d'un coup si charsPerClick > message.length
  let messagesSent = 0;
  while (
    currentTypedText.length >= currentMessageText.length &&
    player.characters >= currentMessageText.length
  ) {
    checkMessageSent(player);
    messagesSent++;
    // Si charsPerClick est très grand, on boucle pour envoyer plusieurs messages d'un coup
    if (player.characters < currentMessageText.length) break;
    // On continue tant qu'on a assez de caractères pour finir un message
  }

  // Affiche un badge combo si plusieurs messages envoyés
  if (messagesSent > 1) {
    showComboBadge(messagesSent);
    // Explosion d'emojis
    for (let i = 0; i < messagesSent; i++) {
      spawnFlyingMessageEmoji();
    }
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
    spawnFlyingResourceEmoji("love", computeLovePerMessage(player, upgrades));
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
  const job = jobs.find((j) => j.id === player.currentJobId);
  if (!job) {
    alert("Aucun métier sélectionné !");
    return;
  }
  if (player.love >= 1) {
    player.money += job.moneyPerWork;
    player.allTimeMoney += job.moneyPerWork;
    player.money += job.moneyPerWork;
    player.allTimeMoney += job.moneyPerWork;
    spawnFlyingResourceEmoji("money", job.moneyPerWork);
    player.love -= 1;
    player.sleep += job.fatigue; // ou -= Math.abs(job.fatigue)
    player.hygiene += job.hygiene; // ou -= Math.abs(job.hygiene)
    player.stress += job.stress; // ou -= Math.abs(job.stress)
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
    spawnFlyingResourceEmoji(
      "research",
      computeResearchPerClick(player, upgrades)
    );
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

function spawnFlyingMessageEmoji() {
  const container = document.getElementById("flying-messages-bg");
  const emoji = document.createElement("div");
  emoji.className = "flying-message-emoji";
  emoji.textContent = "💌";
  // Position X aléatoire (20% à 80%)
  emoji.style.left = `${20 + Math.random() * 60}%`;
  container.appendChild(emoji);
  setTimeout(() => emoji.remove(), 2200);
}

function spawnFlyingResourceEmoji(type, amount = 1) {
  const container = document.getElementById("flying-messages-bg");
  const emoji = document.createElement("div");

  // Choix de l'emoji et de la classe selon le type
  let emojiChar = "💌";
  let extraClass = "";
  switch (type) {
    case "money":
      emojiChar = "💸";
      extraClass = "flying-money-emoji";
      break;
    case "love":
      emojiChar = "💖";
      extraClass = "flying-love-emoji";
      break;
    case "research":
      emojiChar = "🔬";
      extraClass = "flying-research-emoji";
      break;
    default:
      emojiChar = "💌";
      extraClass = "";
  }

  emoji.className = `flying-message-emoji ${extraClass}`;
  emoji.textContent = amount > 1 ? `${emojiChar} +${amount}` : emojiChar;
  // Position X aléatoire (20% à 80%)
  emoji.style.left = `${20 + Math.random() * 60}%`;
  container.appendChild(emoji);
  setTimeout(() => emoji.remove(), 2200);
}
