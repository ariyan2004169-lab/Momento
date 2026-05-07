const grid = document.getElementById("grid");

// 🎬 HUGE VIDEO COLLECTION
const videos = [

  // ACTION
  {
    id: "D97FoacuYxY",
    category: "action",
    title: "Epic Action Scene"
  },

  {
    id: "t6bvt-vOtZI",
    category: "action",
    title: "Fast Cinematic Clip"
  },

  {
    id: "ysz5S6PUM-U",
    category: "action",
    title: "Movie Fight Scene"
  },

  // SAD
  {
    id: "kXYiU_JCYtU",
    category: "sad",
    title: "Emotional Moment"
  },

  {
    id: "RgKAFK5djSk",
    category: "sad",
    title: "Heart Touching Scene"
  },

  // ROMANTIC
  {
    id: "fLexgOxsZu0",
    category: "romantic",
    title: "Romantic Clip"
  },

  {
    id: "OPf0YbXqDm0",
    category: "romantic",
    title: "Love Moment"
  },

  // ANIMATION
  {
    id: "aqz-KE-bpKQ",
    category: "animation",
    title: "Animated Scene"
  },

  {
    id: "2Vv-BfVoq4g",
    category: "animation",
    title: "Anime Clip"
  }

];

// 🔥 LOAD VIDEOS
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

      <div class="actions">

        <button onclick="like(event,this)">❤️</button>

        <button onclick="save(event,this)">🔖</button>

      </div>

    `;

    card.onclick = () => openVideo(v.id);

    grid.appendChild(card);

  });

}

// 🎬 OPEN VIDEO
function openVideo(id) {

  const player = document.createElement("div");

  player.className = "player";

  player.innerHTML = `

    <div class="close-btn" onclick="closePlayer()">✕</div>

    <iframe
      src="https://www.youtube.com/embed/${id}?autoplay=1"
      allow="autoplay"
      allowfullscreen>
    </iframe>

  `;

  document.body.appendChild(player);

}

// ❌ CLOSE PLAYER
function closePlayer() {

  document.querySelector(".player").remove();

}

// ❤️ LIKE
function like(event,btn) {

  event.stopPropagation();

  btn.style.color = "red";

}

// 🔖 SAVE
function save(event,btn) {

  event.stopPropagation();

  btn.innerText = "✔";

}

// 🎯 FILTER
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

// 🚀 DEFAULT LOAD
load(videos);
const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const closePopup = document.getElementById("closePopup");

loginBtn.onclick = () => {
  loginPopup.style.display = "flex";
};

closePopup.onclick = () => {
  loginPopup.style.display = "none";
};
function showPage(pageId){

  let pages = document.querySelectorAll(".page");

  pages.forEach(page=>{
    page.classList.remove("active");
  });

  document
    .getElementById(pageId)
    .classList.add("active");
}
