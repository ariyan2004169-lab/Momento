const sources = [

{
category:"gaming",
source:"Gaming Universe",

videos:[
{id:"3fumBcKC6RE",title:"Epic Gaming Moments"},
{id:"1roy4o4tqQM",title:"Competitive Gameplay"},
{id:"2g811Eo7K8U",title:"Open World Adventure"},
{id:"kXYiU_JCYtU",title:"Battle Royale Chaos"}
]
},

{
category:"music",
source:"Music World",

videos:[
{id:"JGwWNGJdvx8",title:"Global Music Hits"},
{id:"RgKAFK5djSk",title:"Chill Music Experience"},
{id:"09R8_2nJtjg",title:"Modern Pop Visuals"},
{id:"kJQP7kiw5Fk",title:"Rhythm Universe"}
]
},

{
category:"horror",
source:"Dark Stories",

videos:[
{id:"7afcZaq1wY8",title:"Dark Horror Atmosphere"},
{id:"9eDIMXxY9j0",title:"Creepy Cinematic Mystery"},
{id:"gFDCHdKbKBY",title:"Analog Horror Experience"}
]
},

{
category:"motivation",
source:"Mindset Evolution",

videos:[
{id:"mgmVOuLgFB0",title:"Powerful Motivation"},
{id:"wnHW6o8WMas",title:"Discipline Mindset"},
{id:"ZXsQAXx_ao0",title:"Success Journey"}
]
}

];



let savedVideos =
JSON.parse(
localStorage.getItem("videos")
) || [];



let videos = [];



const videoGrid =
document.getElementById(
"videoGrid"
);



const searchInput =
document.getElementById(
"searchInput"
);



function buildVideos(){

videos=[];



sources.forEach(source=>{

source.videos.forEach(video=>{

videos.push({

id:video.id,

title:video.title,

desc:source.source,

category:source.category,

score:
Math.floor(
Math.random()*100
)

});

});

});



savedVideos.forEach(video=>{

videos.unshift(video);

});



videos.sort((a,b)=>{

return b.score-a.score;

});

}



function createCard(video){

const card =
document.createElement("div");



card.className =
"trend-card";



card.innerHTML = `

<div class="thumb-wrap">

<img
loading="lazy"
src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">

<div class="thumb-overlay">

<span>${video.category}</span>

</div>

</div>

<div class="card-content">

<h4>${video.title}</h4>

<p>${video.desc}</p>

</div>

`;



card.onclick=()=>{

openVideo(video.id);

};



return card;

}



function renderRow(rowId,category){

const row =
document.getElementById(
rowId
);



if(!row) return;



row.innerHTML="";



videos
.filter(video=>{

return video.category===category;

})

.forEach(video=>{

row.appendChild(
createCard(video)
);

});

}



function renderTrending(){

const row =
document.getElementById(
"trendingRow"
);



row.innerHTML="";



videos
.slice(0,12)
.forEach(video=>{

row.appendChild(
createCard(video)
);

});

}



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

}



function performSearch(){

const value =
searchInput.value
.toLowerCase();



videoGrid.innerHTML="";



if(value===""){

generateInfiniteFeed();

return;

}



const filtered =
videos.filter(video=>{

return (

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

});



filtered.forEach(video=>{

videoGrid.appendChild(
createCard(video)
);

});

}



searchInput.addEventListener(
"input",
performSearch
);



function openVideo(videoId){

const popup =
document.getElementById(
"popup"
);



const frame =
document.getElementById(
"videoFrame"
);



popup.style.display =
"block";



frame.src =
`https://www.youtube.com/embed/${videoId}?autoplay=1`;



const current =
videos.find(video=>{

return video.id===videoId;

});



if(current){

document.getElementById(
"playerTitle"
).textContent =
current.title;



document.getElementById(
"playerDesc"
).textContent =
current.desc;

}



renderRecommendations(
videoId
);

}



function closeVideo(){

document.getElementById(
"popup"
).style.display =
"none";



document.getElementById(
"videoFrame"
).src="";

}



function renderRecommendations(currentId){

const container =
document.getElementById(
"recommendedVideos"
);



container.innerHTML="";



videos
.filter(video=>{

return video.id!==currentId;

})

.slice(0,8)

.forEach(video=>{

const card =
document.createElement("div");



card.className =
"recommend-card";



card.innerHTML=`

<img
src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">

<div class="recommend-info">

<h4>${video.title}</h4>

<p>${video.desc}</p>

</div>

`;



card.onclick=()=>{

openVideo(video.id);

};



container.appendChild(card);

});

}



function addVideo(){

const input =
document.getElementById(
"videoLink"
);



const url =
input.value.trim();



if(!url){

showToast(
"Paste YouTube link"
);

return;

}



let videoId="";



if(url.includes("v=")){

videoId =
url.split("v=")[1]
.split("&")[0];

}

else if(
url.includes("youtu.be/")
){

videoId =
url.split(
"youtu.be/"
)[1];

}



if(!videoId){

showToast(
"Invalid YouTube link"
);

return;

}



savedVideos.unshift({

id:videoId,

title:"User Upload",

desc:"Community Content",

category:"custom",

score:999

});



localStorage.setItem(

"videos",

JSON.stringify(savedVideos)

);



buildVideos();

renderSections();

generateInfiniteFeed();



input.value="";



showToast(
"Upload Successful"
);

}



function showToast(message){

const toast =
document.getElementById(
"toast"
);



toast.textContent=
message;



toast.classList.add(
"show-toast"
);



setTimeout(()=>{

toast.classList.remove(
"show-toast"
);

},2500);

}



let usedVideos=[];



function generateInfiniteFeed(){

const remaining =
videos.filter(video=>{

return !usedVideos.includes(
video.id
);

});



if(remaining.length===0){

usedVideos=[];

return;

}



const next =
remaining
.sort(()=>Math.random()-0.5)
.slice(0,8);



next.forEach(video=>{

usedVideos.push(video.id);

videoGrid.appendChild(
createCard(video)
);

});

}



let loading=false;



window.addEventListener(
"scroll",
()=>{

if(loading) return;



if(

window.innerHeight+
window.scrollY

>=

document.body.offsetHeight-500

){

loading=true;

generateInfiniteFeed();

setTimeout(()=>{

loading=false;

},500);

}

});



buildVideos();

renderSections();

generateInfiniteFeed();
