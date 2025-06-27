//Code concernant la sauvegarde et le chargement du joueur
import { Player } from "./classes/Player.js";
export function savePlayer(player) {
  localStorage.setItem("player", JSON.stringify(player.toJSON()));
}
export function loadPlayer() {
  const data = JSON.parse(localStorage.getItem("player"));
  return new Player(data || {});
}
// Assurez-vous d'appeler savePlayer(player) avant de quitter l'application
// et loadPlayer() au démarrage pour restaurer l'état du joueur.
