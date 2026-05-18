/* =========================================
   MOMENTO v32 — LIVE MOTION FEED
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
title:"Mind Awakening",
desc:"motivation powerful mindset",
category:"motivation",
id:"ZXsQAXx_ao0"
},

{
title:"Dark Horror Realm",
desc:"dark horror cinematic atmosphere",
category:"dark horror",
id:"kXYiU_JCYtU"
},

{
title:"Anime Storm",
desc:"anime cinematic emotional world",
category:"anime cinematic",
id:"dQw4w9WgXcQ"
},

{
title:"Battle Gaming Energy",
desc:"gaming action intense world",
category:"gaming action",
id:"2Vv-BfVoq4g"
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



data.forEach((video,index)=>{

videoGrid.innerHTML += `

<div
class="trend-card"
style="animation-delay:${index * 0.05}s">

<div
class="thumb-wrap"
onclick="playVideo(
'${video.id}',
'${video.title}',
'${video.desc}'
)">

<img
loading="lazy"
src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">



<div class="thumb-overlay">

<span>
${video.category}
</span>

</div>



<div class="card-content">

<div class="text-side">

<h4>
${video.title}
</h4>

<p>
${video.desc}
</p>

</div>



<div class="card-actions">

<button
onclick='event.stopPropagation();saveVideo(${JSON.stringify(video)})'>

❤

</button>



<button
onclick="event.stopPropagation();shareVideo(
'${video.id}',
'${video.title}'
)">

↗

</button>

</div>

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
   UPDATE BACKDROP
========================= */

function updateBackdrop(id){

const backdrop =
document.getElementById(
"cinematicBackdrop"
);



if(backdrop){

backdrop.style.backgroundImage =

`url(
https://img.youtube.com/vi/${id}/maxresdefault.jpg
)`;

}

}



/* =========================
   RECOMMENDATIONS
========================= */

function renderRecommended(current){

if(!recommended) return;



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
loading="lazy"
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



/* =========================
   SEARCH OVERLAY
========================= */

function renderSearchOverlay(data){

overlay.innerHTML="";



if(data.length===0){

overlay.style.display=
"none";

return;

}



overlay.style.display=
"block";



data.forEach(video=>{

overlay.innerHTML += `

<div
class="search-card"
onclick="playVideo(
'${video.id}',
'${video.title}',
'${video.desc}'
)">

<img
loading="lazy"
src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">

<div class="search-card-info">

<h4>
${video.title}
</h4>

<p>
${video.category}
</p>

</div>

</div>

`;

});

}



/* =========================
   SEARCH BUTTON
========================= */

function performSearch(){

const value =
searchInput.value
.toLowerCase()
.trim();



if(value===""){

renderVideos(videos);

return;

}



/* CACHE */

if(cachedSearches[value]){

renderVideos(
cachedSearches[value]
);

showToast(
"Loaded From Memory"
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



renderVideos(filtered);

showToast(
"Discovery Cached"
);

}



/* =========================
   FILTER SYSTEM
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
   SHARE VIDEO
========================= */

function shareVideo(
id,
title
){

const link =
`https://youtu.be/${id}`;



if(navigator.share){

navigator.share({

title:title,

text:
"Discover this on MOMENTO",

url:link

});

}
else{

navigator.clipboard.writeText(
link
);

showToast(
"Video Link Copied"
);

}

}



/* =========================
   SAVE VIDEO
========================= */

function saveVideo(video){

const alreadySaved =
savedVideos.find(v=>

v.id === video.id

);



if(alreadySaved){

showToast(
"Already Saved"
);

return;

}



savedVideos.push(video);



localStorage.setItem(

"momentoSaved",

JSON.stringify(
savedVideos
)

);



showToast(
"Saved To Collection"
);

}



/* =========================
   COLLECTION POPUP
========================= */

function openCollection(){

document
.getElementById(
"collectionPopup"
)

.classList.add(
"active-collection"
);

renderCollection();

}



function closeCollection(){

document
.getElementById(
"collectionPopup"
)

.classList.remove(
"active-collection"
);

}



/* =========================
   RENDER COLLECTION
========================= */

function renderCollection(){

const grid =
document.getElementById(
"collectionGrid"
);



if(!grid) return;



grid.innerHTML="";



if(savedVideos.length===0){

grid.innerHTML = `

<p>
No Saved Discoveries Yet
</p>

`;

return;

}



savedVideos.forEach(video=>{

grid.innerHTML += `

<div class="saved-card">

<img
loading="lazy"
src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">



<div class="saved-info">

<h4>
${video.title}
</h4>

<p>
${video.category}
</p>



<button
onclick="removeSaved(
'${video.id}'
)">

Remove

</button>

</div>

</div>

`;

});

}



/* =========================
   REMOVE SAVED
========================= */

function removeSaved(id){

savedVideos =
savedVideos.filter(video=>

video.id !== id

);



localStorage.setItem(

"momentoSaved",

JSON.stringify(
savedVideos
)

);



renderCollection();

showToast(
"Removed"
);

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
"Invalid Link"
);

return;

}



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
"Universe Added"
);

}



/* =========================
   TOAST
========================= */

function showToast(text){

if(!toast) return;



toast.innerText=text;

toast.classList.add(
"show-toast"
);

setTimeout(()=>{

toast.classList.remove(
"show-toast"
);

},2200);

}



/* =========================
   AUTO CLOSE SEARCH
========================= */

document.addEventListener(
"click",
(e)=>{

if(
!e.target.closest(
".search-wrapper"
)
){

overlay.style.display=
"none";

}

});



/* =========================
   INITIALIZE
========================= */

renderVideos(videos);
/* =========================================
   MOMENTO SMART RECOMMENDATION ENGINE
   END-ONLY UPDATE
========================================= */



/* =========================
   WATCH HISTORY
========================= */

let watchHistory =

JSON.parse(
localStorage.getItem(
"momentoHistory"
))

||

[];



/* =========================
   TRACK WATCH
========================= */

function trackWatch(video){

watchHistory =
watchHistory.filter(v=>

v.id!==video.id

);

watchHistory.unshift(video);



if(
watchHistory.length>20
){

watchHistory.pop();

}



localStorage.setItem(

"momentoHistory",

JSON.stringify(
watchHistory
)

);

}



/* =========================
   UPGRADE PLAY VIDEO
========================= */

const oldPlayVideo =
playVideo;



playVideo = function(

id,
title,
desc

){

oldPlayVideo(
id,
title,
desc
);



const current =

videos.find(v=>

v.id===id

);



if(current){

trackWatch(current);

}

};



/* =========================
   SMART RECOMMENDATIONS
========================= */

renderRecommended =
function(current){

if(!recommended)
return;



recommended.innerHTML="";



const currentVideo=

videos.find(v=>

v.id===current
);



let smartFeed=

[...videos]

.filter(v=>

v.id!==current

)

.sort((a,b)=>{

let aScore=0;
let bScore=0;



/* similar category */

if(

currentVideo &&

a.category.includes(
currentVideo.category
)

){

aScore+=10;

}



if(

currentVideo &&

b.category.includes(
currentVideo.category
)

){

bScore+=10;

}



/* watch history boost */

watchHistory.forEach(item=>{

if(

a.category===item.category

){

aScore+=3;

}



if(

b.category===item.category

){

bScore+=3;

}

});



return bScore-aScore;

});



smartFeed

.slice(0,6)

.forEach(video=>{

recommended.innerHTML += `

<div
class="recommend-card"
onclick="playVideo(
'${video.id}',
'${video.title}',
'${video.desc}'
)">

<img
loading="lazy"
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

});

};



console.log(
"Smart Recommendation Engine Loaded"
);
