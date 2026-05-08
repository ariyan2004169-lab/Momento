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
   VIDEO DATA
========================= */

const videos = [

  {
    title: "Cinematic Visuals",
    desc: "Trending • Creative",
    id: "D97FoacuYxY"
  },

  {
    title: "Animation Ideas",
    desc: "Animation • Motion",
    id: "ScMzIvxBSi4"
  },

  {
    title: "Modern Design",
    desc: "UI • Inspiration",
    id: "ysz5S6PUM-U"
  },

  {
    title: "Creative Platform",
    desc: "Featured • Popular",
    id: "tgbNymZ7vqY"
  }

];



/* =========================
   VIDEO GRID
========================= */

const videoGrid =
document.getElementById("videoGrid");



/* =========================
   RENDER VIDEOS
========================= */

function renderVideos(){

  videoGrid.innerHTML = "";

  videos.forEach(video => {

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



    /* OPEN POPUP */

    card.onclick = () => {

      openVideo(video.id);

    };



    videoGrid.appendChild(card);

  });

}



/* =========================
   OPEN VIDEO
========================= */

function openVideo(videoId){

  const popup =
  document.getElementById("videoPopup");

  const frame =
  document.getElementById("videoFrame");

  popup.style.display = "flex";

  frame.src =
  `https://www.youtube.com/embed/${videoId}`;

}



/* =========================
   CLOSE VIDEO
========================= */

document
.getElementById("closePopup")
.onclick = () => {

  document
  .getElementById("videoPopup")
  .style.display = "none";

  document
  .getElementById("videoFrame")
  .src = "";

};



/* =========================
   SEARCH SYSTEM
========================= */

const searchInput =
document.getElementById("searchInput");



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



  videoGrid.innerHTML = "";



  filtered.forEach(video => {

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

});



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



  /* NORMAL LINK */

  if(url.includes("v=")){

    videoId =
    url.split("v=")[1]
    .split("&")[0];

  }



  /* SHORT LINK */

  else if(url.includes("youtu.be/")){

    videoId =
    url.split("youtu.be/")[1];

  }



  if(!videoId){

    alert("Invalid YouTube link");

    return;
  }



  /* ADD NEW VIDEO */

  videos.unshift({

    title: "New Upload",

    desc: "User Uploaded",

    id: videoId

  });



  renderVideos();



  input.value = "";



  /* GO HOME */

  showPage("homePage");

}



/* =========================
   INITIAL RENDER
========================= */

renderVideos();
