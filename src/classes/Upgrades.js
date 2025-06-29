//Classe concernant les améliorations
//Classe abstracte pour les améliorations
// Elle ne peut pas être instanciée directement, mais sert de base pour d'autres classes
class Upgrade {
  constructor({
    id,
    name,
    baseCostMoney = 0,
    baseCostResearch = 0, // Coût de base en points de recherche
    multiplier = 1,
    isUnique = false,
    maxLevel = Infinity,
    charactersPerClick = 0,
    lovePerSecond = 0,
    charactersPerSecond = 0,
  }) {
    this.id = id;
    this.name = name;
    this.baseCostMoney = baseCostMoney;
    this.baseCostResearch = baseCostResearch; // Coût de base en points de recherche
    this.multiplier = multiplier; // Coût multiplicatif à chaque achat
    this.isUnique = isUnique;
    this.maxLevel = isUnique ? 1 : maxLevel;
    this.charactersPerClick = charactersPerClick;
    this.lovePerSecond = lovePerSecond; // Amour gagné par seconde
    this.charactersPerSecond = charactersPerSecond;
    this.bought = false; // Indique si l'amélioration a été achetée
  }

  currentCostMoney(level = 0) {
    return Math.floor(this.baseCostMoney * Math.pow(this.multiplier, level));
  }

  currentCostResearch(level = 0) {
    return Math.floor(this.baseCostResearch * Math.pow(this.multiplier, level));
  }

  canPurchase(player) {
    const level = player.upgrades[this.id] || 0;
    return (
      level < this.maxLevel &&
      player.money >= this.currentCostMoney(level) &&
      player.researchPoints >= this.currentCostResearch(level)
    );
  }

  purchase(player) {
    const level = player.upgrades[this.id] || 0;
    if (this.canPurchase(player)) {
      player.money -= this.currentCostMoney(level);
      player.researchPoints -= this.currentCostResearch(level);
      player.upgrades[this.id] = level + 1;
      if (this.isUnique) {
        this.bought = true;
      }
    } else {
      throw new Error("Cannot purchase this upgrade: insufficient resources.");
    }
  }
}

const upgradesData = [
  new Upgrade({
    id: "pigeon",
    name: "Pigeon Voyageur 🕊 ️",
    baseCostMoney: 100,
    baseCostResearch: 50,
    multiplier: 1.5,
    charactersPerClick: 5,
    lovePerSecond: 1,
  }),
  new Upgrade({
    id: "lettre",
    name: "Lettre manuscite ✉️",
    baseCostMoney: 200,
    baseCostResearch: 100,
    multiplier: 1.5,
    charactersPerClick: 10,
    lovePerSecond: 2,
  }),
  new Upgrade({
    id: "fax",
    name: "Fax 📠",
    baseCostMoney: 300,
    baseCostResearch: 500,
    multiplier: 1.5,
    charactersPerClick: 15,
    lovePerSecond: 3,
  }),
  new Upgrade({
    id: "clavier",
    name: "Clavier d’ordinateur ⌨️",
    baseCostMoney: 100,
    baseCostResearch: 200,
    multiplier: 1.2,
    charactersPerClick: 5,
  }),
  new Upgrade({
    id: "appel_voicemail",
    name: "Boîte vocale 📞",
    baseCostMoney: 50,
    baseCostResearch: 100,
    multiplier: 1.2,
    lovePerSecond: 0.2,
  }),
  new Upgrade({
    id: "appel_5g",
    name: "Appel 5G 📱",
    baseCostMoney: 300,
    baseCostResearch: 200,
    multiplier: 1.5,
    lovePerSecond: 3,
  }),
  new Upgrade({
    id: "chatgpt",
    name: "ChatGPT 🤖",
    baseCostMoney: 500,
    baseCostResearch: 1000,
    multiplier: 1.5,
    charactersPerClick: 20,
  }),
  new Upgrade({
    id: "satellite",
    name: "Satellite de communication 🌌",
    baseCostMoney: 1000,
    baseCostResearch: 5000,
    multiplier: 1.5,
    lovePerSecond: 100,
  }),
  new Upgrade({
    id: "drone",
    name: "Drone de livraison 🚁",
    baseCostMoney: 5000,
    baseCostResearch: 10000,
    multiplier: 1.5,
    lovePerSecond: 500,
  }),
  new Upgrade({
    id: "robot",
    name: "Robot de communication 🤖",
    baseCostMoney: 10000,
    baseCostResearch: 20000,
    multiplier: 1.5,
    lovePerSecond: 1000,
  }),
  new Upgrade({
    id: "telepathie",
    name: "Télépathie 🧠",
    baseCostMoney: 50000,
    baseCostResearch: 50000,
    multiplier: 1.5,
    lovePerSecond: 5000,
  }),
  new Upgrade({
    id: "voyage",
    name: "Voyage dans le temps ⏳",
    baseCostMoney: 100000,
    baseCostResearch: 100000,
    multiplier: 1.5,
    lovePerSecond: 10000,
  }),
  new Upgrade({
    id: "teleportation",
    name: "Téléportation instantanée 🚀",
    baseCostMoney: 500000,
    baseCostResearch: 500000,
    multiplier: 1.5,
    lovePerSecond: 50000,
  }),
  new Upgrade({
    id: "machine_a_filtre",
    name: "Machine à filtre à amour 💖",
    baseCostMoney: 1000000,
    baseCostResearch: 1000000,
    multiplier: 1.5,
    lovePerSecond: 100000,
  }),
];

// Exporter les classes d'améliorations
export {
  Upgrade,
  upgradesData as upgrades,
  // Vous pouvez ajouter d'autres classes d'améliorations ici si nécessaire
};
