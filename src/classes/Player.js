import { Upgrade } from "./Upgrades.js";
import { upgrades } from "./Upgrades.js";

export class Player {
  constructor(data = {}) {
    this.characters = data.characters || 0;
    this.allTimeCharacters = data.allTimeCharacters || 0;
    this.love = data.love || 100;
    this.allTimeLove = data.allTimeLove || 0;
    this.money = data.money || 100;
    this.allTimeMoney = data.allTimeMoney || 0;
    this.researchPoints = data.researchPoints || 1000;
    this.allTimeResearchPoints = data.allTimeResearchPoints || 0;
    this.energy = data.energy || 10;
    this.loveFromBeloved = data.loveFromBeloved || 100;
    this.hunger = data.hunger || 100;
    this.sleep = data.sleep || 100;
    this.happiness = data.happiness || 100;
    // Initialiser chaque upgrade à 1 si non présent dans data
    this.upgrades = {};
    for (const upgrade of upgrades) {
      this.upgrades[upgrade.id] =
        (data.upgrades && data.upgrades[upgrade.id]) || 0;
    }
  }

  toJSON() {
    return { ...this };
  }
}
