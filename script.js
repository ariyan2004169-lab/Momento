/* =========================
   REAL CATEGORY DATABASE
========================= */

const categories = {

  gaming:[

    {
      id:"3fumBcKC6RE",
      title:"Epic Gaming Moments"
    },

    {
      id:"1roy4o4tqQM",
      title:"Competitive Gameplay"
    },

    {
      id:"2g811Eo7K8U",
      title:"Open World Adventure"
    }

  ],



  music:[

    {
      id:"JGwWNGJdvx8",
      title:"Global Music Hits"
    },

    {
      id:"RgKAFK5djSk",
      title:"Chill Music Experience"
    },

    {
      id:"09R8_2nJtjg",
      title:"Modern Pop Visuals"
    }

  ],



  horror:[

    {
      id:"7afcZaq1wY8",
      title:"Dark Horror Atmosphere"
    },

    {
      id:"9eDIMXxY9j0",
      title:"Creepy Cinematic Mystery"
    },

    {
      id:"gFDCHdKbKBY",
      title:"Analog Horror Experience"
    }

  ],



  motivation:[

    {
      id:"mgmVOuLgFB0",
      title:"Powerful Motivation"
    },

    {
      id:"wnHW6o8WMas",
      title:"Discipline Mindset"
    },

    {
      id:"ZXsQAXx_ao0",
      title:"Success Journey"
    }

  ],



  animation:[

    {
      id:"aqz-KE-bpKQ",
      title:"Animated Worlds"
    },

    {
      id:"e-ORhEE9VVg",
      title:"Creative Motion Design"
    },

    {
      id:"60ItHLz5WEA",
      title:"Visual Animation Art"
    }

  ],



  action:[

    {
      id:"uelHwf8o7_U",
      title:"Action Cinematics"
    },

    {
      id:"ktvTqknDobU",
      title:"Intense Action Moments"
    },

    {
      id:"hTWKbfoikeg",
      title:"Energy & Adrenaline"
    }

  ],



  cinematic:[

    {
      id:"D97FoacuYxY",
      title:"Cinematic Discovery"
    },

    {
      id:"ysz5S6PUM-U",
      title:"Immersive Visual Journey"
    },

    {
      id:"ScMzIvxBSi4",
      title:"Premium Atmosphere"
    }

  ]

};



/* =========================
   STORAGE
========================= */

let savedVideos = JSON.parse(
  localStorage.getItem("videos")
) || [];



/* =========================
   VIDEO DATABASE
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
    .forEach(video => {

      videos.push({

        id:video.id,

        title:video.title,

        desc:
        category.charAt(0)
        .toUpperCase()
        +
        category.slice(1),

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



const videoGrid =
document.getElementById("videoGrid");



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

    <div class="card-content">

      <h4>${video.title}</h4>

      <p>${video.desc}</p>

    </div>

  `;



  card.onclick = () => {

    openVideo(video.id);

  };



  return card;

}



/* =========================
   CATEGORY ROWS
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
   RENDER ALL SECTIONS
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



  videoGrid.innerHTML = "";



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

    videoGrid.appendChild(
      createCard(video)
    );

  });

});



/* =========================
   FILTER
========================= */

function filterVideos(category){

  videoGrid.innerHTML = "";



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

    videoGrid.appendChild(
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
   UPLOAD
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

    title:"User Upload",

    desc:"Community Content",

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
   INFINITE DISCOVERY
========================= */

function generateInfiniteFeed(){

  const shuffled =
  [...videos]
  .sort(() => Math.random() - 0.5);



  shuffled.forEach(video => {

    videoGrid.appendChild(
      createCard(video)
    );

  });

}



/* =========================
   SCROLL DETECTION
========================= */

window.addEventListener("scroll", () => {

  if(

    window.innerHeight
    +
    window.scrollY

    >=

    document.body.offsetHeight
    - 400

  ){

    generateInfiniteFeed();

  }

});



/* =========================
   INITIAL LOAD
========================= */

buildVideos();

renderSections();

generateInfiniteFeed();
