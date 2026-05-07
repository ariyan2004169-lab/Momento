const grid = document.getElementById("grid");

// 🎬 Video collection
const videos = [
  {
    id: "D97FoacuYxY",
    category: "action",
    title: "Epic Action Scene"
  },

  {
    id: "t6bvt-vOtZI",
    category: "action",
    title: "Short Cinematic Clip"
  },

  {
    id: "ysz5S6PUM-U",
    category: "sad",
    title: "Emotional Moment"
  },

  {
    id: "RgKAFK5djSk",
    category: "romantic",
    title: "Romantic Scene"
  }
];

// 🔥 Load videos
function load(list) {
  grid.innerHTML = "";

  list.forEach(v => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg">

      <div class="title">
        ${v.title}
      </div>
    `;

    card.onclick = () => openVideo(v.id);

    grid.appendChild(card);
  });
}

// 🎬 Open video player
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

// 🎯 Category filter
function filter(type) {

  if (type === "all") {
    load(videos);
  }

  else {

    const filtered = videos.filter(
      v => v.category === type
    );

    load(filtered);
  }
}

// 🚀 Default load
load(videos);
