import * as gameLogic from "./gameLogic.js";
import { formatNumber } from "./utils.js";
export function computeDynamicStats(player, upgrades) {
  return {
    totalCharacters: player.allTimeCharacters,
    charactersPerClick: gameLogic.computeCharactersPerClick(player, upgrades),
    charactersPerSeconde: gameLogic.computeCharctersPerSecond(player, upgrades),
    totalLove: player.allTimeLove,
    lovePerClick: 0,
    lovePerSecond: gameLogic.computeLovePerSecond(player, upgrades),
    totalMoney: player.allTimeMoney,
    moneyPerClick: 0,
    moneyPerSecond: gameLogic.computeMoneyPerSecond(player, upgrades),
    totalResearchPoints: player.allTimeResearchPoints,
    researchPerClick: gameLogic.computeResearchPerClick(player, upgrades),
    researchPerSecond: gameLogic.computeReseachPerSecond(player, upgrades),
    loveFromBeloved: Math.floor(player.loveFromBeloved),
    love: Math.floor(player.love),
    money: Math.floor(player.money),
    research: Math.floor(player.researchPoints),
    hunger: Math.floor(player.hunger),
    sleep: Math.floor(player.sleep),
    happiness: Math.floor(player.happiness),
    hygiene: Math.floor(player.hygiene),
    intelligence: Math.floor(player.intelligence),
    charisma: Math.floor(player.charisma),
    strenghy: Math.floor(player.strength),
    stress: Math.floor(player.stress),
  };
}

export function renderDynamicStats(player, upgrades) {
  const stats = computeDynamicStats(player, upgrades);

  Object.entries(stats).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = formatNumber(value);
    }
  });
}
