const startbutton = document.querySelector("#startbutton");
const stopbutton = document.querySelector("#stopbutton");
const gamebuttons = document.querySelectorAll(".button");
const modal = document.querySelector(".container");
const closeModalbutton = document.querySelector("#closeModal");
const scoreText = document.querySelector("#score p");
const finalScore = document.querySelector(".stopGameBox p");
const main = document.querySelector("main");

let score = 0;
let tempIndex = 0;
let pace = 2000;
let acceleration = 100;
let timer;
let count = 0;
let startSound;
let endSound;
let gameOn = false;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.sound.loop = true;
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
  this.volume = function (volume) {
    this.sound.volume = volume;
  };
}

const randomColor = () => {
  const red = Math.floor(Math.random() * 230);
  const green = Math.floor(Math.random() * 230);
  const blue = Math.floor(Math.random() * 230);
  return `rgb(${red},${green},${blue})`;
};

const createIndex = () => {
  const minNum = Math.ceil(1);
  const maxNum = Math.floor(4);
  return Math.floor(Math.random() * (maxNum - minNum + minNum) + minNum);
};

const stopLoop = () => {
  clearTimeout(timer);
  gamebuttons.forEach((button) => {
    button.style.backgroundColor = "#ffffff";
    button.classList.remove("activeButton");
    button.innerHTML = "";
  });
};

const timeOut = (buttonIndex) => {
  timer = setTimeout(() => {
    gamebuttons.forEach((button) => {
      if (button.dataset.index == buttonIndex) {
        button.style.backgroundColor = "#ffffff";
        button.classList.remove("activeButton");
        button.innerHTML = "";
      }
    });
    round();
    count++;
    if (count > 2) {
      stopGame();
    }
    pace -= acceleration;
  }, pace);
};

const round = () => {
  let buttonIndex = createIndex();
  while (buttonIndex === tempIndex) {
    buttonIndex = createIndex();
  }
  gamebuttons.forEach((button) => {
    if (button.dataset.index == buttonIndex) {
      button.style.backgroundColor = randomColor();
      button.innerHTML = `<i class="fa-solid fa-drum"></i>`;
      button.classList.add("activeButton");
    }
  });
  timeOut(buttonIndex);
  tempIndex = buttonIndex;
};

const speedGame = (e) => {
  if (e.currentTarget.classList.contains("activeButton")) {
    score++;
    pace -= acceleration;
    scoreText.textContent = `Score : ${score} `;
    gamebuttons.forEach((button) => {
      button.style.backgroundColor = "#ffffff";
      button.classList.remove("activeButton");
      button.innerHTML = "";
    });
    clearTimeout(timer);
    round();
  } else {
    stopGame();
  }
};

const startGame = () => {
  gameOn = true;
  stopbutton.style.display = "inline-block";
  startbutton.style.display = "none";
  mySound = new sound("./static/Bongos.mp3");
  mySound.play();
  round();
  gamebuttons.forEach((button) => button.addEventListener("click", speedGame));
};

const stopGame = () => {
  gameOn = false;
  main.style.pointerEvents = "none";
  stopLoop();
  mySound.stop();
  endSound = new sound("./static/Failure.mp3");
  endSound.play();
  startbutton.style.display = "inline-block";
  stopbutton.style.display = "none";
  if (score < 10) finalScore.textContent = `Your final score: ${score}`;
  else if (score > 10)
    finalScore.textContent = `Good job, you score was: ${score}`;
  else if (score > 50)
    finalScore.textContent = `Great job, you score was: ${score}`;
  showModal();
};

const showModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  main.style.pointerEvents = "auto";

  window.location.reload();
};

startbutton.addEventListener("click", startGame);
stopbutton.addEventListener("click", stopGame);
closeModalbutton.addEventListener("click", closeModal);
