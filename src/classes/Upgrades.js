//Classe concernant les améliorations
//Classe abstracte pour les améliorations
// Elle ne peut pas être instanciée directement, mais sert de base pour d'autres classes
export class Upgrades {
  constructor() {
    this.upgrades = [];
  }

  // Méthode pour ajouter une amélioration
  addUpgrade(upgrade) {
    this.upgrades.push(upgrade);
  }

  // Méthode pour obtenir toutes les améliorations
  getUpgrades() {
    return this.upgrades;
  }

  // Méthode pour acheter une amélioration
  buyUpgrade(id, money, researchPoints) {
    const upgrade = this.upgrades.find((u) => u.id === id);
    if (!upgrade || upgrade.bought) return false;

    if (money >= upgrade.costMoney && researchPoints >= upgrade.costResearch) {
      money -= upgrade.costMoney;
      researchPoints -= upgrade.costResearch;
      upgrade.bought = true;
      return true; // Achat réussi
    }
    return false; // Achat échoué
  }
}

class pigeon extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: 1,
      name: "Pigeon messager",
      description: "Un pigeon qui envoie des messages d'amour.",
      costMoney: 100,
      costResearch: 50,
      charactersPerClick: 5,
      lovePerSecond: 1,
      bought: false,
    });
  }
}

class lettre extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: 2,
      name: "Lettre écrite à la main",
      description: "Une lettre manuscrite pour plus de tendresse.",
      costMoney: 200,
      costResearch: 100,
      charactersPerClick: 10,
      lovePerSecond: 2,
      bought: false,
    });
  }
}

class fax extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "fax",
      name: "Fax 📠",
      description: "Envoie des messages d'amour instantanément.",
      costMoney: 300,
      costResearch: 150,
      charactersPerClick: 15,
      lovePerSecond: 3,
      bought: false,
    });
  }
}

class clavier extends Upgrades {
  constructor(parameters) {
    super();
    this.addUpgrade({
      id: "clavier",
      name: "Clavier d’ordinateur ⌨️",
      description: "Tape plus vite : +5 caractères par clic.",
      costMoney: 100,
      costResearch: 5,
      charactersPerClick: 5,
      lovePerSecond: 0,
      bought: false,
    });
  }
}

class appel_voicemail extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "appel_voicemail",
      name: "Boîte vocale 📞",
      description: "Génère 0.2 amour/sec.",
      costMoney: 50,
      costResearch: 2,
      charactersPerClick: 0,
      lovePerSecond: 0.2,
      bought: false,
    });
  }
}

class appel_5g extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "appel_5g",
      name: "Appel 5G 📱",
      description: "Génère 3 amour/sec.",
      costMoney: 300,
      costResearch: 10,
      charactersPerClick: 0,
      lovePerSecond: 3,
      bought: false,
    });
  }
}

class chatgpt extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "chatgpt",
      name: "ChatGPT 🤖",
      description: "Génère 20 caractères par clic.",
      costMoney: 500,
      costResearch: 20,
      charactersPerClick: 20,
      lovePerSecond: 0,
      bought: false,
    });
  }
}

class satellite extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "satellite",
      name: "Satellite de communication 🌌",
      description: "Génère 100 amour/sec.",
      costMoney: 1000,
      costResearch: 50,
      charactersPerClick: 0,
      lovePerSecond: 100,
      bought: false,
    });
  }
}

class drone extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "drone",
      name: "Drone de livraison 🚁",
      description: "Génère 500 amour/sec.",
      costMoney: 5000,
      costResearch: 100,
      charactersPerClick: 0,
      lovePerSecond: 500,
      bought: false,
    });
  }
}

class robot extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "robot",
      name: "Robot de communication 🤖",
      description: "Génère 1000 amour/sec.",
      costMoney: 10000,
      costResearch: 500,
      charactersPerClick: 0,
      lovePerSecond: 1000,
      bought: false,
    });
  }
}

class telepathie extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "telepathie",
      name: "Télépathie 🧠",
      description: "Génère 5000 amour/sec.",
      costMoney: 50000,
      costResearch: 1000,
      charactersPerClick: 0,
      lovePerSecond: 5000,
      bought: false,
    });
  }
}

class voyage extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "voyage",
      name: "Voyage dans le temps ⏳",
      description: "Génère 10000 amour/sec.",
      costMoney: 100000,
      costResearch: 5000,
      charactersPerClick: 0,
      lovePerSecond: 10000,
      bought: false,
    });
  }
}

class teleportation extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "teleportation",
      name: "Téléportation instantanée 🚀",
      description: "Génère 50000 amour/sec.",
      costMoney: 500000,
      costResearch: 10000,
      charactersPerClick: 0,
      lovePerSecond: 50000,
      bought: false,
    });
  }
}

class machine_a_filtre extends Upgrades {
  constructor() {
    super();
    this.addUpgrade({
      id: "machine_a_filtre",
      name: "Machine à filtre à amour 💖",
      description: "Génère 100000 amour/sec.",
      costMoney: 1000000,
      costResearch: 50000,
      charactersPerClick: 0,
      lovePerSecond: 100000,
      bought: false,
    });
  }
}
