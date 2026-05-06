const grid = document.getElementById("grid");
const searchInput = document.querySelector("input");

// 🎬 Video data
const videos = [
  { id: "D97FoacuYxY", title: "Action Scene" },
  { id: "t6bvt-vOtZI", title: "Short Clip" },
  { id: "kXYiU_JCYtU", title: "Emotional Scene" }
];

// 🔥 Load videos
function loadVideos(list) {
  grid.innerHTML = "";

  list.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">
      <div class="title">${video.title}</div>
    `;

    card.onclick = () => openVideo(video.id);
    grid.appendChild(card);
  });
}

// 🎬 Open video
function openVideo(id) {
  const player = document.createElement("div");
  player.className = "player";

  player.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${id}?autoplay=1"
      allow="autoplay"
      allowfullscreen>
    </iframe>
  `;

  player.onclick = () => player.remove();
  document.body.appendChild(player);
}

// 🔍 Search system
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(value)
  );

  loadVideos(filtered);
});

// 🚀 Default load
loadVideos(videos);
