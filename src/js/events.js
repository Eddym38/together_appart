import * as gameLogic from "./gameLogic.js";
import * as dom from "./dom.js";
import { savePlayer, loadPlayer } from "./save.js";
import { startGame } from "./script.js";

// --- INIT ---
console.log("Script chargé, initialisation...");

export function bindEvents(player, upgrades) {
  dom.messageBox.addEventListener("click", () =>
    gameLogic.writeCharacter(player, upgrades)
  );

  dom.creditsBtnEl.addEventListener("click", () => {
    dom.showCredits();
    console.log("Crédits affichés");
  });
  dom.closeCreditsBtn.addEventListener("click", () => {
    dom.creditsModal.classList.add("hidden");
    console.log("Fermeture des crédits");
  });
  dom.rulesBtn.addEventListener("click", () => {
    dom.rulesModal.classList.remove("hidden");
    console.log("Règles affichées");
  });
  dom.closeRulesBtn.addEventListener("click", () => {
    dom.rulesModal.classList.add("hidden");
    console.log("Fermeture des règles");
  });
  dom.workBtn.addEventListener("click", () => gameLogic.work(player, upgrades));
  dom.researchBtn.addEventListener("click", () =>
    gameLogic.doResearch(player, upgrades)
  );
  dom.startBtn.addEventListener("click", () => {
    dom.pageLayoutEl.classList.remove("hidden");
    dom.bouttonActionsEl.classList.remove("hidden");
    dom.menuEl.classList.add("hidden");
    startGame(player, upgrades);
    console.log("Démarrage du jeu");
  });
  dom.resetBtn.addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?")) {
      localStorage.removeItem("player");
      alert("Jeu réinitialisé !");
      // Retour au menu
      dom.showMenu();
      console.log("Jeu réinitialisé, retour au menu");
      // Optionnel : recharge la page pour réinitialiser l'état
      location.reload();
    }
  });

  dom.workBtn.addEventListener("click", () => {
    gameLogic.work(player, upgrades);
  });

  dom.closeJobModalBtn.addEventListener("click", () => {
    dom.jobModal.classList.add("hidden");
    console.log("Fermeture de la modale de travail");
  });
  dom.buyFoodBtn.addEventListener("click", () => {
    dom.foodShopModal.classList.remove("hidden");
    console.log("Ouverture de la modale d'achat de nourriture");
  });
  dom.closeBuyFoodBtn.addEventListener("click", () => {
    dom.foodShopModal.classList.add("hidden");
    console.log("Fermeture de la modale d'achat de nourriture");
  });
  dom.buyObjectsBtn.addEventListener("click", () => {
    dom.itemShopModal.classList.remove("hidden");
    console.log("Ouverture de la modale d'achat d'objets");
  });
  dom.closeItemsShopBtn.addEventListener("click", () => {
    dom.itemShopModal.classList.add("hidden");
    console.log("Fermeture de la modale d'achat d'objets");
  });

  dom.saveQuitBtn.addEventListener("click", () => {
    savePlayer(player);
    alert("Partie sauvegardée ! À bientôt 👋");
    //Retour au menu
    dom.showMenu();
  });
  dom.loadBtn.addEventListener("click", () => {
    player = loadPlayer();
    dom.updateDisplay(player, upgrades, gameLogic.buyUpgrade);
    alert("Partie chargée !");
    dom.pageLayoutEl.classList.remove("hidden");
    dom.menuEl.classList.add("hidden");
    startGame(player, upgrades);
  });

  // Ajoute ce code après le chargement du DOM
  const toggleStatsBtn = document.getElementById("toggleStatsBtn");
  const statsDiv = document.querySelector(".stats-container");

  toggleStatsBtn.addEventListener("click", () => {
    statsDiv.classList.toggle("hidden");
  });
}

export function bindSettingsEvents() {
  const settingsModal = document.getElementById("settingsModal");
  const closeBtn = document.getElementById("closeSettingsBtn");
  const backToMenuBtn = document.getElementById("backToMenuBtn");

  // Ouvre la modale depuis n'importe quel bouton paramètres
  const btns = [
    document.getElementById("settingsBtn"),
    document.getElementById("settingsBtnMenu"),
    document.getElementById("settingsBtnGame"),
  ].filter(Boolean);

  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      settingsModal.classList.remove("hidden");
      console.log("Ouvrir la modale des paramètres");
    })
  );

  closeBtn.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
  });
  backToMenuBtn.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
    dom.showMenu(); // Retourne au menu principal
    console.log("Retour au menu principal depuis les paramètres");
    // Appelle ta fonction showMenu() si besoin
  });

  // Exemples de gestion des paramètres
  document.getElementById("musicToggle").addEventListener("change", (e) => {
    // Active/désactive la musique
  });
  document.getElementById("musicVolume").addEventListener("input", (e) => {
    // Change le volume de la musique
  });
  document.getElementById("sfxToggle").addEventListener("change", (e) => {
    // Active/désactive les SFX
  });
  document.getElementById("sfxVolume").addEventListener("input", (e) => {
    // Change le volume des SFX
  });
  document.getElementById("themeSelect").addEventListener("change", (e) => {
    // Change le thème du jeu
  });
  document.getElementById("resetSettingsBtn").addEventListener("click", () => {
    // Réinitialise les paramètres
    dom.musicToggle.checked = true;
    dom.musicVolume.value = 100;
    dom.sfxToggle.checked = true;
    dom.sfxVolume.value = 100;
    dom.themeSelect.value = "clair"; // Remplace par ton thème par défaut
    console.log("Paramètres réinitialisés");
  });
}
