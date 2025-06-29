import { foods } from "../classes/Foods.js";
import { renderInventory } from "./inventory.js";

export function bindFoodShop(player, upgrades, buyUpgrade) {
  const foodShopModal = document.getElementById("foodShopModal");
  const foodList = document.getElementById("foodList");

  function showPurchaseAnimation(foodName) {
    const anim = document.createElement("div");
    anim.textContent = `+1 ${foodName} !`;
    anim.className = "food-purchase-anim";
    document.body.appendChild(anim);

    anim.style.left = "50%";
    anim.style.top = "50%";
    anim.style.transform = "translate(-50%, -50%)";

    setTimeout(() => {
      anim.remove();
    }, 1200);
  }

  function renderFoodList() {
    foodList.innerHTML = "";
    foods.forEach((food) => {
      const div = document.createElement("div");
      div.className = "food-choice";
      div.innerHTML = `
        <strong>${food.name}</strong> - 💸 ${food.price}<br>
        <span class="food-desc">${food.description}</span><br>
        🍔 +${food.hunger} faim
      `;
      div.addEventListener("click", () => {
        if (player.money >= food.price) {
          player.money -= food.price;
          if (!player.inventory) player.inventory = {};
          if (!player.inventory.food) player.inventory.food = {};
          player.inventory.food[food.id] =
            (player.inventory.food[food.id] || 0) + 1;
          showPurchaseAnimation(food.name);
          import("./dom.js").then((dom) => {
            dom.updateDisplay(player, upgrades, buyUpgrade);
          });
          renderInventory(player); // OK ici, après l'achat
        } else {
          alert("Pas assez d'argent !");
        }
      });
      foodList.appendChild(div);
    });
  }

  document.getElementById("buyFoodBtn").addEventListener("click", () => {
    foodShopModal.classList.remove("hidden");
    renderFoodList();
  });
}
