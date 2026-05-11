/* =========================
   STORAGE + VIDEO DATA
========================= */

let videos = JSON.parse(
  localStorage.getItem("videos")
) || [

  {
    id: "D97FoacuYxY",
    title: "Premium Visuals",
    desc: "Trending cinematic content"
  },

  {
    id: "ScMzIvxBSi4",
    title: "Animation Ideas",
    desc: "Creative animation showcase"
  },

  {
    id: "ysz5S6PUM-U",
    title: "Music Experience",
    desc: "Immersive music visuals"
  },

  {
    id: "tgbNymZ7vqY",
    title: "Gaming World",
    desc: "Gaming highlights"
  }

];



/* =========================
   ELEMENTS
========================= */

const videoGrid =
document.getElementById("videoGrid");

const searchInput =
document.getElementById("searchInput");



/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId){

  document
  .querySelectorAll(".page")
  .forEach(page => {

    page.classList.remove("active");

  });



  document
  .getElementById(pageId)
  .classList.add("active");

}



/* =========================
   CATEGORY DETECTION
========================= */

function getCategory(video){

  const text =
  (
    video.title +
    " " +
    video.desc
  ).toLowerCase();



  if(text.includes("music"))
    return "Music";

  if(text.includes("gaming"))
    return "Gaming";

  if(text.includes("animation"))
    return "Animation";



  return "Trending";

}



/* =========================
   MAIN FEED
========================= */

function renderVideos(list = videos){

  videoGrid.innerHTML = "";



  list.forEach(video => {

    const card =
    document.createElement("div");

    card.className = "video-card";



    card.innerHTML = `

      <img
      src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg">

      <div class="video-info">

        <h3>${video.title}</h3>

        <p>${video.desc}</p>

      </div>

    `;



    card.onclick = () => {

      openVideo(video.id);

    };



    videoGrid.appendChild(card);

  });

}



/* =========================
   TRENDING ROW
========================= */

function renderTrending(){

  const row =
  document.getElementById("trendingRow");



  row.innerHTML = "";



  videos.slice(0,6).forEach(video => {

    const card =
    document.createElement("div");

    card.className =
    "trend-card";



    card.innerHTML = `

      <img
      src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">

      <h4>${video.title}</h4>

    `;



    card.onclick = () => {

      openVideo(video.id);

    };



    row.appendChild(card);

  });

}



/* =========================
   CATEGORY FILTER
========================= */

function filterVideos(category){

  if(category === "All"){

    renderVideos();

    return;

  }



  const filtered =
  videos.filter(video => {

    return getCategory(video)
    === category;

  });



  renderVideos(filtered);

}



/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

  const value =
  searchInput.value.toLowerCase();



  const filtered =
  videos.filter(video => {

    return (

      video.title
      .toLowerCase()
      .includes(value)

      ||

      video.desc
      .toLowerCase()
      .includes(value)

    );

  });



  renderVideos(filtered);

});



/* =========================
   VIDEO PLAYER
========================= */

function openVideo(videoId){

  const popup =
  document.getElementById("popup");

  const frame =
  document.getElementById("videoFrame");



  popup.style.display = "flex";



  frame.src =
  `https://www.youtube.com/embed/${videoId}`;

}



/* =========================
   CLOSE PLAYER
========================= */

function closeVideo(){

  document
  .getElementById("popup")
  .style.display = "none";



  document
  .getElementById("videoFrame")
  .src = "";

}



/* =========================
   UPLOAD SYSTEM
========================= */

function addVideo(){

  const input =
  document.getElementById("videoLink");

  const url =
  input.value.trim();



  if(!url){

    alert("Paste YouTube link");

    return;

  }



  let videoId = "";



  if(url.includes("v=")){

    videoId =
    url.split("v=")[1]
    .split("&")[0];

  }

  else if(url.includes("youtu.be/")){

    videoId =
    url.split("youtu.be/")[1];

  }



  if(!videoId){

    alert("Invalid YouTube link");

    return;

  }



  videos.unshift({

    id: videoId,
    title: "New Upload",
    desc: "User uploaded content"

  });



  localStorage.setItem(
    "videos",
    JSON.stringify(videos)
  );



  renderVideos();

  renderTrending();



  input.value = "";



  showPage("home");

}



/* =========================
   INITIAL LOAD
========================= */

renderVideos();

renderTrending();
