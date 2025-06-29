import { jobs } from "../classes/Jobs.js"; // adapte le chemin si besoin

export function bindJobSelection(player) {
  const chooseJobBtn = document.getElementById("chooseJobBtn");
  const jobModal = document.getElementById("jobModal");
  const closeJobModalBtn = document.getElementById("closeJobModalBtn");
  const jobList = document.getElementById("jobList");

  chooseJobBtn.addEventListener("click", () => {
    jobModal.classList.remove("hidden");
    renderJobList();
  });

  closeJobModalBtn.addEventListener("click", () => {
    jobModal.classList.add("hidden");
  });

  function renderJobList() {
    jobList.innerHTML = "";
    jobs.forEach((job) => {
      const div = document.createElement("div");
      div.className =
        "job-choice" + (player.currentJobId === job.id ? " selected" : "");
      div.innerHTML = `
        <strong>${job.name}</strong><br>
        <span>${job.description}</span><br>
        💸 ${job.moneyPerWork} | 😴 ${job.fatigue} | 🚿 ${job.hygiene} | 😟 ${job.stress}
      `;
      div.addEventListener("click", () => {
        player.currentJobId = job.id;
        jobModal.classList.add("hidden");
      });
      jobList.appendChild(div);
    });
  }
}
