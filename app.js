const startbutton = document.querySelector("#startbutton");
const stopbutton = document.querySelector("#stopbutton");
const gamebuttons = document.querySelectorAll(".button");
const modal = document.querySelector(".container");
const closeModalbutton = document.querySelector("#closeModal");
const scoreText = document.querySelector("#score p");

let score = 0;
let tempIndex = 0;
let pace = 2000;

const createIndex = () => {
  const minNum = Math.ceil(1);
  const maxNum = Math.floor(4);
  return Math.floor(Math.random() * (maxNum - minNum + minNum) + minNum);
};

const timeOut = (buttonIndex) => {
  timer = setTimeout(() => {
    gamebuttons.forEach((button) => {
      if (button.dataset.index == buttonIndex) {
        button.classList.remove("activeButton");
        console.log(`button ${button.dataset.index} was DEACTIVATED`);
      }
    });
    round();
    pace -= 100;
  }, pace);
};

const round = () => {
  let buttonIndex = createIndex();
  while (buttonIndex === tempIndex) {
    buttonIndex = createIndex();
  }
  gamebuttons.forEach((button) => {
    if (button.dataset.index == buttonIndex) {
      button.classList.add("activeButton");
    }
  });
  timeOut(buttonIndex);
  tempIndex = buttonIndex;
};

const speedGame = (e) => {
  console.log(
    `This is from speed game. button ${e.currentTarget.dataset.index} was clicked`
  );
  if (e.currentTarget.classList.contains("activeButton")) {
    score++;
    pace -= 100;
    scoreText.textContent = `Score : ${score} `;
    gamebuttons.forEach((button) => button.classList.remove("activeButton"));
    clearTimeout(timer);
    round();
  } else if (!e.currentTarget.classList.contains("activeButton")) {
    stopGame();
  }
};

const startGame = () => {
  round();
  gamebuttons.forEach((button) => button.addEventListener("click", speedGame));
};

const stopGame = () => {
  showModal();
};

const showModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
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
