function showPage(pageId){

  document.querySelectorAll('.page')
  .forEach(p => p.classList.remove('active'));

  document.getElementById(pageId)
  .classList.add('active');
}


/* VIDEO DATA */

const videos = [
  {
    title: "Cinematic Visuals",
    desc: "Trending",
    id: "D97FoacuYxY"
  },
  {
    title: "Animation Ideas",
    desc: "Creative",
    id: "ScMzIvxBSi4"
  },
  {
    title: "Modern Design",
    desc: "UI Inspiration",
    id: "ysz5S6PUM-U"
  }
];

const grid = document.getElementById("videoGrid");


videos.forEach(v => {

  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <img src="https://img.youtube.com/vi/${v.id}/maxresdefault.jpg">
    <div class="video-info">
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
    </div>
  `;

  card.onclick = () => {
    window.open(
      `https://www.youtube.com/watch?v=${v.id}`,
      "_blank"
    );
  };

  grid.appendChild(card);

});
const searchInput = document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const cards = document.querySelectorAll(".video-card");

    cards.forEach(card => {

      const text = card.innerText.toLowerCase();

      if (text.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

}
function addVideo() {

  console.log("clicked");

}

  const input = document.getElementById("videoLink");

  const url = input.value;

  if(!url) return;

  // extract video ID
  const videoId = url.split("v=")[1];

  if(!videoId) return;

  const cleanId = videoId.split("&")[0];

  const grid = document.getElementById("videoGrid");

  const card = document.createElement("div");

  card.className = "video-card";

  card.innerHTML = `
    <img src="https://img.youtube.com/vi/${cleanId}/maxresdefault.jpg">
    <div class="video-info">
      <h3>New Video</h3>
      <p>Uploaded</p>
    </div>
  `;

  card.onclick = () => {
    window.open(
      `https://www.youtube.com/watch?v=${cleanId}`,
      "_blank"
    );
  };

  grid.appendChild(card);

  input.value = "";

}
