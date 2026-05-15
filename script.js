/* =========================================
   MOMENTO v29 — COMPLETE SYSTEM
========================================= */



/* =========================
   CACHE ENGINE
========================= */

let cachedSearches =

JSON.parse(
localStorage.getItem(
"momentoCache"
)
)

||

{};



/* =========================
   SAVED COLLECTIONS
========================= */

let savedVideos =

JSON.parse(
localStorage.getItem(
"momentoSaved"
)
)

||

[];



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

const overlay =
document.getElementById(
"searchOverlay"
);



/* =========================
   RENDER VIDEOS
========================= */

function renderVideos(data){

videoGrid.innerHTML="";

data.forEach(video=>{

videoGrid.innerHTML += `

<div class="trend-card">

<div
class="thumb-wrap"
onclick="playVideo(
'${video.id}',
'${video.title}',
'${video.desc}'
)">

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



<div class="card-actions">

<button
onclick='saveVideo(${JSON.stringify(video)})'>

Save

</button>



<button
onclick="shareVideo(
'${video.id}',
'${video.title}'
)">

Share

</button>

</div>

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

popup.style.display="flex";

frame.src =
`https://www.youtube.com/embed/${id}?autoplay=1`;

titleText.innerText =
title;

descText.innerText =
desc;

updateBackdrop(id);

renderRecommended(id);

overlay.style.display=
"none";

}



/* =========================
   CLOSE VIDEO
========================= */

function closeVideo(){

popup.style.display="none";

frame.src="";

}



/* =========================
   BACKDROP
========================= */

function updateBackdrop(id){

const backdrop =
document.getElementById(
"cinematicBackdrop"
);

backdrop.style.backgroundImage =

`url(
https://img.youtube.com/vi/${id}/maxresdefault.jpg
)`;

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
searchInput.value
.toLowerCase()
.trim();



if(value===""){

overlay.style.display=
"none";

renderVideos(videos);

return;

}



/* CACHE */

if(cachedSearches[value]){

renderSearchOverlay(
cachedSearches[value]
);

return;

}



/* SEARCH */

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



cachedSearches[value] =
filtered;



localStorage.setItem(

"momentoCache",

JSON.stringify(
cachedSearches
)

);



renderSearchOverlay(filtered);

});
