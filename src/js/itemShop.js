import { items } from "../classes/Items.js";
import { renderInventory } from "./inventory.js";

export function bindItemShop(player, upgrades, buyUpgrade) {
  const itemShopModal = document.getElementById("itemShopModal");
  const itemList = document.getElementById("itemList");

  function showPurchaseAnimation(itemName) {
    const anim = document.createElement("div");
    anim.textContent = `+1 ${itemName} !`;
    anim.className = "item-purchase-anim";
    document.body.appendChild(anim);

    anim.style.left = "50%";
    anim.style.top = "50%";
    anim.style.transform = "translate(-50%, -50%)";

    setTimeout(() => {
      anim.remove();
    }, 1200);
  }

  function renderitemList() {
    items.innerHTML = "";
    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item-choice";
      div.innerHTML = `
        <strong>${item.name}</strong> - 💸 ${item.price}<br>
        <span class="item-desc">${item.description}</span><br>
      `;
      div.addEventListener("click", () => {
        if (player.money >= item.price) {
          player.money -= item.price;
          if (!player.inventory) player.inventory = {};
          if (!player.inventory.item) player.inventory.item = {};
          player.inventory.item[item.id] =
            (player.inventory.item[item.id] || 0) + 1;
          showPurchaseAnimation(item.name);
          import("./dom.js").then((dom) => {
            dom.updateDisplay(player, upgrades, buyUpgrade);
          });
          renderInventory(player); // OK ici, après l'achat
        } else {
          alert("Pas assez d'argent !");
        }
      });
      itemList.appendChild(div);
    });
  }

  document.getElementById("buyObjectsBtn").addEventListener("click", () => {
    itemShopModal.classList.remove("hidden");
    renderitemList();
  });
}
