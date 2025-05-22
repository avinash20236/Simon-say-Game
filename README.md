# Simon-say-Game
#this is a simon say game code 
#html code
<!DOCTYPE html>
<html>
  <head>
    <title>Simon Say Game</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Simon Say Game</h1>
    <h2>Press any key to start the game</h2>
    <div class="btn-container">
      <div class="line1">
        <div class="btn red" type="button" id="red">Red</div>
        <div class="btn green" type="button" id="green">Green</div>
      </div>
      <div class="line2">
        <div class="btn pink" type="button" id="pink">Pink</div>
        <div class="btn yellow" type="button" id="yellow">Yellow</div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>

#css code
body{
  text-align:center;
}
.btn{
  height: 200px;
  width: 200px;
  border-radius: 20%;
  border: 10px solid black;
  margin: 2rem;
}
.btn-container{
  display: flex;
  justify-content: center;
}
.red{
  background-color: grey;
}
.pink{
  background-color: pink;
}
.yellow{
  background-color: yellow;
}
.green{
  background-color: purple;
}
.flash{
  background-color:white;
}
.userflash{
  background-color: black;
}
#js code
let gameseq = [];
let userseq = [];
let color = ["red","green","pink","yellow"];
let started = false;
let level=0;
let h2 = document.querySelector("h2");
document.addEventListener("keydown",function(){
  if(started==false){
    console.log("Game has started");
    started=true;
    levelUp();
  }
});
function gameflash(btn){
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 250);
}
function userflash(btn){
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  },250);
}
function levelUp(){
  userseq=[];
  level++;
  h2.innerText=`Level${level}`;
  let randind = Math.floor(Math.random() * 4);
  let randcolor = color[randind];
  gameseq.push(randcolor);
  console.log("Game sequence:", gameseq);
  let randbtn=document.querySelector(`.${randcolor}`);
  if (!randbtn) {
    console.error("Button not found for color:", randcolor);
    return;
  }

  gameflash(randbtn);
}

function checkans(idx){
  // console.log("curr level:",level);
  // let idx=level-1;
  if(userseq[idx]===gameseq[idx]){
    if(userseq.length === gameseq.length){
      setTimeout(levelUp, 1000);
    }
    console.log("same value");
  }
  else{
    h2.innerHTML=`game over!Your score was <b>${level}</b> </br> press any key to reset.`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor="white"
    }, 250);
    reset();
  }
}
function btnpress(){
  // console.log(this);
  let btn=this;
  userflash(btn);
  let usercolor=btn.getAttribute("id");
  userseq.push(usercolor);
  console.log("User clicked:", usercolor);
  checkans(userseq.length-1);
}
let allbtn = document.querySelectorAll(".btn");
for(let btn of allbtn){
  btn.addEventListener("click",btnpress);
}
function reset(){
  started=false;
  userseq=[];
  gameseq=[];
  level=0;
}
