const startbutton = document.querySelector("#startbutton");
const stopbutton = document.querySelector("#stopbutton");
const gamebuttons = document.querySelectorAll(".button");
const modal = document.querySelector(".container");
const closeModalbutton = document.querySelector("#closeModal");

let gameOn = false;

const startGame = () => {
  gameOn = true;
  while (gameOn === true) {
    const minNum = Math.ceil(1);
    const maxNum = Math.floor(4);
    buttonIndex = Math.floor(
      Math.random() * (maxNum - minNum + minNum) + minNum
    );
    gamebuttons.forEach((button) => {
      if (button.dataset.index == buttonIndex) {
        button.classList.add("activeButton");
      }
    });

    gameOn = false;
  }
  console.log("out of while loop");
  //   while (gameOn === true) {
  //     );
  //     console.log(buttonIndex);
  //   }
};
const stopGame = () => {
  gameOn = false;
  showModal();
};
const showModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

startbutton.addEventListener("click", startGame);
stopbutton.addEventListener("click", stopGame);
closeModalbutton.addEventListener("click", closeModal);

gamebuttons.forEach((button) =>
  button.addEventListener("click", () =>
    console.log(`button ${button.textContent} was clicked`)
  )
);
