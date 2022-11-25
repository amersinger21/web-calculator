const input = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const randomBtn = document.getElementById("random");
const startBtn = document.getElementById("start");
const clearBtn = document.getElementById("clear");
const operatorBtns = document.querySelectorAll(".operator-btn");
const calcMode = document.querySelector("#calc-body");
const url =
  "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new";

let responseNum;
let handle;
let operandsArray = [];

//calc display
numBtns.forEach((item) => {
  item.addEventListener("click", () => {
    let mode = calcMode.getAttribute("data-mode");

    if (handle !== null) {
      clearInterval(handle);
      handle = null;
      input.innerText = item.id;
    } else if (input.innerText == 0 || input.innerText == "Happy Birthday!") {
      input.innerText = item.id;
    } else {
      input.innerText += item.id;
    }

    if (mode == "normal") {
      operandsArray[0] = input.innerText;
    } else if (mode == "calc") {
      operandsArray[1] = input.innerText;
    }

    console.log(operandsArray);
  });
});

operatorBtns.forEach((operator) => {
  operator.addEventListener("click", () => {
    let mode = calcMode.getAttribute("data-mode");

    if (mode == "normal") {
      calcMode.setAttribute("data-mode", "calc");
    }
  });
});

//fun buttons

randomBtn.addEventListener("click", () => {
  clearInterval(handle);
  handle = " ";
  fetch(url)
    .then((response) => response.json())
    .then((value) => {
      input.innerText = value;
    });
});

startBtn.addEventListener("click", () => {
  handle = setInterval(() => {
    if (input.innerText > 0) {
      input.innerText -= 1;
    } else {
      input.innerText = "Happy Birthday!";
      clearInterval(handle);
    }
  }, 50);
});

randomBtn.addEventListener("click", () => {
  clearInterval(handle);
  handle = " ";
  fetch(url)
    .then((response) => response.json())
    .then((value) => {
      input.innerText = value;
    });
});

clearBtn.addEventListener("click", () => {
  if (handle !== null) {
    clearInterval(handle);
    handle = null;
  }

  input.innerText = "0";
  operandsArray = [];
});

//math functions
