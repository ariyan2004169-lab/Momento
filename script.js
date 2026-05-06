// 🔥 Your video categories
const data = {
  action: [
    "D97FoacuYxY",
    "t6bvt-vOtZI"
  ],
  sad: [
    "kXYiU_JCYtU"
  ],
  romantic: [
    "fLexgOxsZu0"
  ]
};

// 📦 Load videos into grid
function loadCategory(category) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  data[category].forEach(id => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = "Play";
    card.onclick = () => openVideo(id);
    grid.appendChild(card);
  });
}

// 🎬 Open video (FIXED VERSION)
function openVideo(id) {
  const player = document.getElementById("player");

  player.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${id}?autoplay=1"
      width="100%" 
      height="100%" 
      allow="autoplay"
      allowfullscreen>
    </iframe>

    <button onclick="closeVideo()" 
      style="position:absolute;top:20px;left:20px;z-index:10;">
      Back
    </button>
  `;

  player.classList.remove("hidden");
}

// ❌ Close video
function closeVideo() {
  const player = document.getElementById("player");
  player.classList.add("hidden");
  player.innerHTML = "";
}

// 🚀 Default load
loadCategory("action");