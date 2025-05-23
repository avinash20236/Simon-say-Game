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