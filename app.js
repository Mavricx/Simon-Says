//initial values
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "blue"];
let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
//for strating the game
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});
document.addEventListener("click", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});
//for leveling up each step
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let rdmIdx = Math.floor(Math.random() * 3);
  let rdmClr = btns[rdmIdx];
  let rdmBtn = document.querySelector(`.${rdmClr}`);
  gameSeq.push(rdmClr);
  console.log(gameSeq);
  gameFlash(rdmBtn);
  // to track highScore
  if (level > highScore) {
    highScore = level;
    let hS = document.querySelector(".hS");
    hS.innerText = `High Score: ${highScore}`;
  }
}

//for flashing button bby rendom color generator
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
//to flash color by user input
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

//each button press actions
function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");

  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

//to check each button press
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over!!..Your Score Was <b>${level}</b><br/>`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
  }
}
let rs = document.querySelector(".reset");
rs.addEventListener("click", reset);
//to reset games
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}