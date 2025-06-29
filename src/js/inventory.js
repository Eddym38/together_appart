import { foods } from "../classes/Foods.js";

export function renderInventory(player) {
  const inventoryDiv = document.querySelector(".inventory");
  if (!inventoryDiv) return;

  const listEl = inventoryDiv.querySelector(".inventory-list");
  const descDiv = document.getElementById("inventory-desc");
  let html = "";

  if (
    player.inventory &&
    player.inventory.food &&
    Object.keys(player.inventory.food).length > 0
  ) {
    for (const [foodId, qty] of Object.entries(player.inventory.food)) {
      const food = foods.find((f) => f.id === foodId);
      html += `
        <li class="inventory-item" 
            data-food-id="${foodId}" 
            data-desc="${food ? food.description : ""}">
          <span class="item-name">${food ? food.name : foodId}</span>
          <span class="item-qty">× ${qty}</span>
        </li>`;
    }
  } else {
    html += `<li class="inventory-item empty">Aucune nourriture</li>`;
  }
  listEl.innerHTML = html;

  // Ajout des événements pour manger et afficher la description
  inventoryDiv.querySelectorAll(".inventory-item").forEach((li) => {
    if (li.classList.contains("empty")) return;
    li.addEventListener("mouseenter", () => {
      descDiv.textContent = li.dataset.desc || "";
      descDiv.style.opacity = "1";
    });
    li.addEventListener("mouseleave", () => {
      descDiv.textContent = "";
      descDiv.style.opacity = "0";
    });
    li.addEventListener("click", () => {
      const foodId = li.dataset.foodId;
      const food = foods.find((f) => f.id === foodId);
      if (player.inventory.food[foodId] > 0) {
        player.inventory.food[foodId]--;
        player.hunger = Math.min(
          100,
          (player.hunger || 0) + (food ? food.hunger : 0)
        );
        if (player.inventory.food[foodId] === 0) {
          delete player.inventory.food[foodId];
        }
        // Animation simple
        descDiv.textContent = `🍽️ Tu as mangé ${food ? food.name : foodId} !`;
        descDiv.style.opacity = "1";
        setTimeout(() => {
          descDiv.textContent = "";
          descDiv.style.opacity = "0";
        }, 1200);
        // Mets à jour l'affichage de l'inventaire uniquement ici
        renderInventory(player);
      }
    });
  });
}
