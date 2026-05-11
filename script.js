/* =========================
   MASSIVE CATEGORY DATABASE
========================= */

const categories = {

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



  motivation: [

    "ZXsQAXx_ao0",
    "mgmVOuLgFB0",
    "wnHW6o8WMas"

  ],



  animation: [

    "aqz-KE-bpKQ",
    "e-ORhEE9VVg",
    "60ItHLz5WEA"

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
   VIDEO SYSTEM
========================= */

let videos = [];



/* =========================
   BUILD VIDEOS
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

const searchInput =
document.getElementById("searchInput");



/* =========================
   NAVIGATION
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
   VIDEO CARD
========================= */

function createCard(video){

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



  return card;

}



/* =========================
   RENDER ROW
========================= */

function renderRow(rowId,category){

  const row =
  document.getElementById(rowId);



  row.innerHTML = "";



  videos
  .filter(video => {

    return (
      video.category === category
    );

  })

  .forEach(video => {

    row.appendChild(
      createCard(video)
    );

  });

}



/* =========================
   TRENDING
========================= */

function renderTrending(){

  const row =
  document.getElementById("trendingRow");



  row.innerHTML = "";



  videos.slice(0,12)
  .forEach(video => {

    row.appendChild(
      createCard(video)
    );

  });

}



/* =========================
   RENDER ALL
========================= */

function renderSections(){

  renderTrending();

  renderRow(
    "gamingRow",
    "gaming"
  );

  renderRow(
    "musicRow",
    "music"
  );

  renderRow(
    "horrorRow",
    "horror"
  );

  renderRow(
    "motivationRow",
    "motivation"
  );

  renderRow(
    "animationRow",
    "animation"
  );

  renderRow(
    "actionRow",
    "action"
  );

}



/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

  const value =
  searchInput.value.toLowerCase();



  const results =
  document.getElementById("videoGrid");



  results.innerHTML = "";



  if(value === ""){

    return;

  }



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



  filtered.forEach(video => {

    results.appendChild(
      createCard(video)
    );

  });

});



/* =========================
   FILTER
========================= */

function filterVideos(category){

  const results =
  document.getElementById("videoGrid");



  results.innerHTML = "";



  if(category === "All"){

    renderSections();

    return;

  }



  videos
  .filter(video => {

    return (
      video.category === category
    );

  })

  .forEach(video => {

    results.appendChild(
      createCard(video)
    );

  });

}



/* =========================
   PLAYER
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

  renderSections();



  input.value = "";



  showPage("home");

}



/* =========================
   INITIAL LOAD
========================= */

buildVideos();

renderSections();
