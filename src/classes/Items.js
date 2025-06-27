//Class des items du jeu permettant des boosts ou necessaires pour acheter des upgrades
class Items {
  constructor() {
    this.items = [];
  }

  // Méthode pour ajouter un item
  addItem(item) {
    this.items.push(item);
  }

  // Méthode pour obtenir tous les items
  getItems() {
    return this.items;
  }

  // Méthode pour acheter un item
  buyItem(id, money) {
    const item = this.items.find((i) => i.id === id);
    if (!item || item.bought) return false;

    if (money >= item.costMoney) {
      money -= item.costMoney;
      item.bought = true;
      return true; // Achat réussi
    }
    return false; // Achat échoué
  }
}

// Exemple d'items
