/* =========================================
   MOMENTO v24 — PREMIUM DISCOVERY ENGINE
========================================= */



/* =========================
   VIDEO DATABASE
========================= */

let videos = [

{

title:"Cyber Future City",

desc:"future cinematic neon world",

category:"future cinematic",

id:"8Qn_spdM5Zg"

},

{

title:"Dark Horror Realm",

desc:"dark horror cinematic atmosphere",

category:"dark horror",

id:"kXYiU_JCYtU"

},

{

title:"Battle Gaming Energy",

desc:"gaming action intense world",

category:"gaming action",

id:"2Vv-BfVoq4g"

},

{

title:"Mind Awakening",

desc:"motivation powerful mindset",

category:"motivation",

id:"ZXsQAXx_ao0"

},

{

title:"Anime Storm",

desc:"anime cinematic emotional world",

category:"anime cinematic",

id:"dQw4w9WgXcQ"

},

{

title:"Neon Soundscape",

desc:"music futuristic atmosphere",

category:"music future",

id:"RgKAFK5djSk"

}

];



/* =========================
   ELEMENTS
========================= */

const videoGrid =
document.getElementById(
"videoGrid"
);

const popup =
document.getElementById(
"popup"
);

const frame =
document.getElementById(
"videoFrame"
);

const titleText =
document.getElementById(
"playerTitle"
);

const descText =
document.getElementById(
"playerDesc"
);

const recommended =
document.getElementById(
"recommendedVideos"
);

const toast =
document.getElementById(
"toast"
);

const searchInput =
document.getElementById(
"searchInput"
);



/* =========================
   RENDER VIDEOS
========================= */

function renderVideos(data){

videoGrid.innerHTML="";

data.forEach(video=>{

videoGrid.innerHTML += `

<div
class="trend-card"
onclick="playVideo(
'${video.id}',
'${video.title}',
'${video.desc}'
)">

<div class="thumb-wrap">

<img
src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">

<div class="thumb-overlay">

<span>
${video.category}
</span>

</div>

</div>

<div class="card-content">

<h4>
${video.title}
</h4>

<p>
${video.desc}
</p>

</div>

</div>

`;

});

}



/* =========================
   PLAY VIDEO
========================= */

function playVideo(
id,
title,
desc
){

popup.style.display="block";

frame.src=
`https://www.youtube.com/embed/${id}?autoplay=1`;

titleText.innerText=
title;

descText.innerText=
desc;

renderRecommended(id);

}



/* =========================
   CLOSE VIDEO
========================= */

function closeVideo(){

popup.style.display="none";

frame.src="";

}



/* =========================
   RECOMMENDATIONS
========================= */

function renderRecommended(current){

recommended.innerHTML="";

videos.forEach(video=>{

if(video.id !== current){

recommended.innerHTML += `

<div
class="recommend-card"
onclick="playVideo(
'${video.id}',
'${video.title}',
'${video.desc}'
)">

<img
src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">

<div class="recommend-info">

<h4>
${video.title}
</h4>

<p>
${video.category}
</p>

</div>

</div>

`;

}

});

}



/* =========================
   LIVE SEARCH
========================= */

searchInput.addEventListener(
"input",
()=>{

const value =
searchInput.value.toLowerCase();

const filtered =
videos.filter(video=>

video.title
.toLowerCase()
.includes(value)

||

video.desc
.toLowerCase()
.includes(value)

||

video.category
.toLowerCase()
.includes(value)

);

renderVideos(filtered);

}
);



/* =========================
   SEARCH BUTTON
========================= */

function performSearch(){

const value =
searchInput.value.toLowerCase();

const filtered =
videos.filter(video=>

video.title
.toLowerCase()
.includes(value)

||

video.desc
.toLowerCase()
.includes(value)

||

video.category
.toLowerCase()
.includes(value)

);

renderVideos(filtered);

showToast(
"Discovery Updated"
);

}



/* =========================
   DISCOVERY CHIPS
========================= */

const chips =
document.querySelectorAll(
".discover-chips button"
);

chips.forEach(chip=>{

chip.addEventListener(
"click",
()=>{

chips.forEach(c=>
c.classList.remove(
"active-chip"
)
);

chip.classList.add(
"active-chip"
);

const filter =
chip.dataset.filter;

filterVideos(filter);

});

});



function filterVideos(filter){

if(filter==="all"){

renderVideos(videos);

return;

}

const filtered =
videos.filter(video=>

video.category
.toLowerCase()
.includes(filter)

||

video.title
.toLowerCase()
.includes(filter)

);

renderVideos(filtered);

}



/* =========================
   ADD VIDEO
========================= */

function addVideo(){

const input =
document.getElementById(
"videoLink"
);

const link =
input.value;

if(!link){

showToast(
"Paste YouTube Link"
);

return;

}



let id = "";



if(
link.includes("watch?v=")
){

id =
link.split("watch?v=")[1]
.split("&")[0];

}

else if(
link.includes("youtu.be/")
){

id =
link.split("youtu.be/")[1]
.split("?")[0];

}



if(!id){

showToast(
"Invalid YouTube Link"
);

return;

}



/* RANDOM CATEGORY */

const moods = [

"gaming",

"future",

"music",

"anime",

"dark",

"cinematic",

"motivation",

"action"

];



const randomMood =
moods[
Math.floor(
Math.random()*moods.length
)
];



videos.unshift({

title:"Uploaded Universe",

desc:"new cinematic discovery",

category:randomMood,

id:id

});



renderVideos(videos);

input.value="";

showToast(
"Universe Added Successfully"
);

}



/* =========================
   PREMIUM TOAST
========================= */

function showToast(text){

toast.innerText=text;

toast.classList.add(
"show-toast"
);

setTimeout(()=>{

toast.classList.remove(
"show-toast"
);

},2500);

}



/* =========================
   INITIALIZE
========================= */

renderVideos(videos);
