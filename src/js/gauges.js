export function updateGauges(player) {
  // Met à jour les jauges de l'interface utilisateur
  renderLoveGauge(player.loveFromBeloved);
  renderHungerGauge(player.hunger);
  renderThirstGauge(player.thirst);
  renderSleepGauge(player.sleep);
  renderHappinessGauge(player.happiness);
  renderHygieneGauge(player.hygiene);
  renderIntelligenceGauge(player.intelligence);
  renderCharismaGauge(player.charisma);
  renderStrengthGauge(player.strength);
  renderStressGauge(player.stress);
}

export function renderLoveGauge(value) {
  const bar = document.getElementById("gauge-loveBeloved");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderHungerGauge(value) {
  const bar = document.getElementById("gauge-hunger");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderThirstGauge(value) {
  const bar = document.getElementById("gauge-thirst");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderSleepGauge(value) {
  const bar = document.getElementById("gauge-sleep");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderHappinessGauge(value) {
  const bar = document.getElementById("gauge-happiness");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderHygieneGauge(value) {
  const bar = document.getElementById("gauge-hygiene");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderIntelligenceGauge(value) {
  const bar = document.getElementById("gauge-intelligence");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderCharismaGauge(value) {
  const bar = document.getElementById("gauge-charisma");
  bar.style.width = `${Math.min(value, 100)}%`;
}
export function renderStrengthGauge(value) {
  const bar = document.getElementById("gauge-strength");
  bar.style.width = `${Math.min(value, 100)}%`;
}

export function renderStressGauge(value) {
  const bar = document.getElementById("gauge-stress");
  bar.style.width = `${Math.min(value, 100)}%`;

  bar.classList.remove(
    "stress-shake-low",
    "stress-shake-medium",
    "stress-shake-high"
  );
  if (value >= 80) bar.classList.add("stress-shake-high");
  else if (value >= 50) bar.classList.add("stress-shake-medium");
  else if (value >= 20) bar.classList.add("stress-shake-low");
  if (value >= 100) {
    document.body.classList.add("body-stress-max");
  } else {
    document.body.classList.remove("body-stress-max");
  }
}
