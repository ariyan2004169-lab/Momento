const grid = document.getElementById("grid");

const videos = [
  "https://www.youtube.com/embed/D97FoacuYxY",
  "https://www.youtube.com/embed/t6bvt-vOtZI"
];

videos.forEach(link => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <iframe src="${link}" allowfullscreen></iframe>
    <div class="actions">
      <button onclick="like(this)">❤️</button>
      <button onclick="save(this)">🔖</button>
    </div>
  `;

  grid.appendChild(card);
});

function like(btn){
  btn.style.color = "red";
}

function save(btn){
  alert("Saved!");
}
