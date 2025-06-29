export class Job {
  constructor({
    id,
    name,
    moneyPerWork,
    fatigue,
    hygiene,
    stress,
    description,
  }) {
    this.id = id;
    this.name = name;
    this.moneyPerWork = moneyPerWork; // Argent gagné par action
    this.fatigue = fatigue; // Fatigue générée (ex: -5)
    this.hygiene = hygiene; // Hygiène perdue (ex: -2)
    this.stress = stress || 0; // Stress généré (ex: 3)
    this.description = description;
  }
}
export const jobs = [
  new Job({
    id: "bureau",
    name: "Employé de bureau",
    moneyPerWork: 10,
    fatigue: -3,
    hygiene: -1,
    stress: 3,
    description: "Un travail calme, peu fatigant, mais peu rémunérateur.",
  }),
  new Job({
    id: "livreur",
    name: "Livreur",
    moneyPerWork: 15,
    fatigue: -7,
    hygiene: -3,
    stress: 1,
    description: "Fatigant et salissant, mais mieux payé.",
  }),
  new Job({
    id: "developpeur",
    name: "Développeur",
    moneyPerWork: 20,
    fatigue: -5,
    hygiene: -1,
    description: "Bien payé, mais demande de la concentration.",
  }),
  // Ajoute d'autres métiers...
];
