export class Item {
  constructor(name, description, price, isUnique, fcnEffect, image) {
    this.name = name; // Nom de l'objet
    this.description = description; // Description de l'objet
    this.price = price; // Prix de l'objet
    this.isUnique = isUnique || false; // Indique si l'objet est unique (ne peut être acheté qu'une seule fois)
    this.fcnEffect = fcnEffect || null; // Fonction d'effet de l'objet
    this.image = image; // Chemin de l'image de l'objet
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
    };
  }
}
export class ItemManager {
  constructor() {
    this.items = []; // Liste des objets
  }

  addItem(item) {
    this.items.push(item);
  }

  getItemByName(name) {
    return this.items.find((item) => item.name === name);
  }

  getAllItems() {
    return this.items;
  }

  toJSON() {
    return this.items.map((item) => item.toJSON());
  }
}

export const items = [
  new Item(
    "Cadeau d'anniversaire",
    "Un cadeau spécial pour l'anniversaire de votre partenaire.",
    100,
    true,
    null,
    "images/gift.png"
  ),
  new Item(
    "Fleurs",
    "Un bouquet de fleurs pour égayer la journée de votre partenaire.Si vous avez des allergies, ne les achetez pas.",
    20,
    false,
    null,
    "images/flowers.png"
  ),
  new Item(
    "Lit en paille",
    "On se demande comment on peut dormir sur de la paille, mais bon, c'est mieux que rien.",
    50
  ),
  new Item(
    "Lit en bois",
    "De toute évidence ce lit est plat comme ta tête, mais il est confortable.",
    100,
    true,
    null,
    "images/wooden-bed.png"
  ),
  new Item(
    "Lit en cuir",
    "Lit très confortable, permet de dormir et de récupérer beaucoup d'énergie. J'adore le cuir.",
    200,
    true,
    null,
    "images/leather-bed.png"
  ),
  new Item(
    "Balle anti-stress",
    "Une balle pour réduire le stress car elle est anti-stress.",
    15,
    false,
    (player) => {
      player.stress = Math.max(0, player.stress - 10);
      return "Stress réduit de 10 points.";
    }
  ),
  new Item(
    "Livre de coach en séduction",
    "Tu es une vraie merde, mais tu peux toujours essayer de séduire quelqu'un.",
    30,
    false,
    (player) => {
      player.charisma = Math.min(100, player.charisma + 10);
      return "Charisme augmenté de 10 points.";
    }
  ),
  new Item(
    "Savon",
    "Quand on est sale, on utilise du savon.",
    25,
    false,
    (player) => {
      player.hygiene = Math.min(100, player.hygiene + 15);
      return "Hygiène améliorée de 15 points.";
    }
  ),
];
