/* =========================
   MASSIVE CATEGORY DATABASE
========================= */

const categories = {

  cinematic: [

    "D97FoacuYxY",
    "ysz5S6PUM-U",
    "ScMzIvxBSi4"

  ],



  gaming: [

    "tgbNymZ7vqY",
    "2Vv-BfVoq4g",
    "kXYiU_JCYtU"

  ],



  music: [

    "JGwWNGJdvx8",
    "RgKAFK5djSk",
    "09R8_2nJtjg"

  ],



  horror: [

    "dQw4w9WgXcQ",
    "9bZkp7q19f0",
    "OPf0YbXqDm0"

  ],



  animation: [

    "aqz-KE-bpKQ",
    "e-ORhEE9VVg",
    "60ItHLz5WEA"

  ],



  motivation: [

    "ZXsQAXx_ao0",
    "mgmVOuLgFB0",
    "wnHW6o8WMas"

  ],



  action: [

    "uelHwf8o7_U",
    "fLexgOxsZu0",
    "hTWKbfoikeg"

  ]

};



/* =========================
   STORAGE
========================= */

let savedVideos = JSON.parse(
  localStorage.getItem("videos")
) || [];



/* =========================
   FINAL VIDEO SYSTEM
========================= */

let videos = [];



/* =========================
   BUILD VIDEO DATABASE
========================= */

function buildVideos(){

  videos = [];



  Object.keys(categories)
  .forEach(category => {

    categories[category]
    .forEach(id => {

      videos.push({

        id:id,

        title:
        category.toUpperCase(),

        desc:
        "Immersive discovery content",

        category:category

      });

    });

  });



  savedVideos.forEach(video => {

    videos.unshift(video);

  });

}



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
   MAIN FEED
========================= */

function renderVideos(list = videos){

  videoGrid.innerHTML = "";



  list.forEach(video => {

    const card =
    document.createElement("div");



    card.className =
    "video-card";



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



  videos.slice(0,10)
  .forEach(video => {

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

    return (
      video.category &&
      video.category.toLowerCase()
      === category.toLowerCase()
    );

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



  popup.style.display =
  "flex";



  frame.src =
  `https://www.youtube.com/embed/${videoId}`;

}



/* =========================
   CLOSE PLAYER
========================= */

function closeVideo(){

  document
  .getElementById("popup")
  .style.display =
  "none";



  document
  .getElementById("videoFrame")
  .src = "";

}



/* =========================
   MANUAL UPLOAD SYSTEM
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



  savedVideos.unshift({

    id:videoId,

    title:"USER UPLOAD",

    desc:"Community content",

    category:"custom"

  });



  localStorage.setItem(

    "videos",

    JSON.stringify(savedVideos)

  );



  buildVideos();

  renderVideos();

  renderTrending();



  input.value = "";



  showPage("home");

}



/* =========================
   INITIAL LOAD
========================= */

buildVideos();

renderVideos();

renderTrending();
