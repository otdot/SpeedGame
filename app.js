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
  });
};

const timeOut = (buttonIndex) => {
  timer = setTimeout(() => {
    gamebuttons.forEach((button) => {
      if (button.dataset.index == buttonIndex) {
        button.style.backgroundColor = "#ffffff";
        button.classList.remove("activeButton");
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
    });
    clearTimeout(timer);
    round();
  } else {
    stopGame();
  }
};

const startGame = () => {
  stopbutton.style.display = "inline-block";
  startbutton.style.display = "none";
  round();
  gamebuttons.forEach((button) => button.addEventListener("click", speedGame));
};

const stopGame = () => {
  main.style.pointerEvents = "none";
  stopLoop();
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

// gamebuttons.forEach((button) =>
//   button.addEventListener("click", () =>
//     console.log(`button ${button.textContent} was clicked`)
//   )
// );
