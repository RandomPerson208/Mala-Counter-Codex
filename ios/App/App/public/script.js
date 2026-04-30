const STORAGE_KEY = "mala-counter-state-v1";
const BEADS_PER_ROUND = 108;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 100;

const beadCountEl = document.getElementById("beadCount");
const roundCountEl = document.getElementById("roundCount");
const remainingCountEl = document.getElementById("remainingCount");
const counterButton = document.getElementById("counterButton");
const undoButton = document.getElementById("undoButton");
const resetButton = document.getElementById("resetButton");
const progressCircle = document.getElementById("progressCircle");

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { totalCount: 0 };
    }

    const parsed = JSON.parse(raw);
    return Number.isInteger(parsed.totalCount) && parsed.totalCount >= 0
      ? parsed
      : { totalCount: 0 };
  } catch {
    return { totalCount: 0 };
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateView() {
  const rawBead = state.totalCount % BEADS_PER_ROUND;
  const currentBead = rawBead === 0 && state.totalCount > 0 ? BEADS_PER_ROUND : rawBead;
  const rounds = Math.floor(state.totalCount / BEADS_PER_ROUND);
  const remaining = currentBead === 0 ? BEADS_PER_ROUND : BEADS_PER_ROUND - currentBead;
  const progress = currentBead / BEADS_PER_ROUND;
  const offset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  beadCountEl.textContent = String(currentBead);
  roundCountEl.textContent = String(rounds);
  remainingCountEl.textContent = String(remaining);
  progressCircle.style.strokeDasharray = String(CIRCLE_CIRCUMFERENCE);
  progressCircle.style.strokeDashoffset = String(offset);
}

function incrementCounter() {
  state.totalCount += 1;
  saveState();
  updateView();

  if (navigator.vibrate) {
    navigator.vibrate(18);
  }
}

function undoCounter() {
  if (state.totalCount === 0) {
    return;
  }

  state.totalCount -= 1;
  saveState();
  updateView();
}

function resetCounter() {
  state.totalCount = 0;
  saveState();
  updateView();
}

counterButton.addEventListener("click", incrementCounter);
undoButton.addEventListener("click", undoCounter);
resetButton.addEventListener("click", resetCounter);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    incrementCounter();
  }

  if (event.key.toLowerCase() === "z") {
    undoCounter();
  }

  if (event.key.toLowerCase() === "r") {
    resetCounter();
  }
});

updateView();
