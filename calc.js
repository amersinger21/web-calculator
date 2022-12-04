const input = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const randomBtn = document.getElementById("random");
const startBtn = document.getElementById("start");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const operatorBtns = document.querySelectorAll(".operator-btn");
const invertBtn = document.getElementById("invert");
const decimalBtn = document.getElementById(".");
const calcMode = document.querySelector("#calc-body");
const url =
  "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new";

let responseNum;
let handle;
let operandsArray = [];

//utility functions
function SetDisplayNumber() {
  let mode = calcMode.getAttribute("data-mode");

  if (mode == "normal") {
    operandsArray[0] = input.innerText;
  } else if (mode == "calc") {
    operandsArray[1] = input.innerText;
  }
}

function Clear() {
  calcMode.setAttribute("data-mode", "normal");
  calcMode.setAttribute("data-operation", "none");
  calcMode.setAttribute("data-input", "first");
  input.innerText = "0";
  operandsArray = [];
}

function doMath(first, second) {
  let operation = calcMode.getAttribute("data-operation");
  let result = 0;

  if (first == null || second == ".") {
    alert("Select a number");
    return;
  }

  if (second == null) {
    input.innerText = "Generating Factorial...";
    first = +first;

    if (first < 0) {
      setTimeout(() => {
        input.innerText = "Impossible";
      }, 1000);
      setTimeout(() => {
        Clear();
      }, 1500);
      return;
    }
    for (i = first - 1; i > 1; i--) {
      first = first * i;
    }

    setTimeout(() => {
      input.innerText = first;
    }, 1000);
  }

  first = +first;
  second = +second;

  if (operation == "add") {
    result = first + second;
    input.innerText = result;
  }

  if (operation == "divide") {
    if (second == 0) {
      input.innerText = "Nice Try, Nerd";

      setTimeout(() => {
        Clear();
      }, 1000);
      return;
    }
    result = first / second;
    input.innerText = result;
  }

  if (operation == "multiply") {
    result = first * second;
    input.innerText = result;
  }

  if (operation == "subtract") {
    result = first - second;
    input.innerText = result;
  }

  operandsArray = [result];
  calcMode.setAttribute("data-mode", "normal");
  calcMode.setAttribute("data-operation", "equals");
  calcMode.setAttribute("data-input", "first");
  return;
}

//functional buttons

numBtns.forEach((item) => {
  item.addEventListener("click", () => {
    let inputType = calcMode.getAttribute("data-input");

    if (handle !== null) {
      clearInterval(handle);
      handle = null;
    }

    if (inputType == "first") {
      input.innerText = item.id;
      calcMode.setAttribute("data-input", "other");
    } else if (inputType == "other") {
      input.innerText += item.id;
    }

    SetDisplayNumber();
  });
});

decimalBtn.addEventListener("click", () => {
    let inputType = calcMode.getAttribute("data-input");

    if(input.innerText.match(/[.]/)){
      return;
    }
    if (handle !== null) {
      clearInterval(handle);
      handle = null;
    }

    if (inputType == "first") {
      input.innerText = decimalBtn.id;
      calcMode.setAttribute("data-input", "other");
    } else if (inputType == "other") {
      input.innerText += decimalBtn.id;
    }

    SetDisplayNumber();
  });

operatorBtns.forEach((operator) => {
  operator.addEventListener("click", () => {
    let mode = calcMode.getAttribute("data-mode");

    if (input.innerText == ".") {
      alert("Please enter a number");
      Clear();
      return;
    }
    if (mode == "normal") {
      calcMode.setAttribute("data-mode", "calc");
    }
    calcMode.setAttribute("data-input", "first");
    calcMode.setAttribute("data-operation", operator.id);
  });
});

clearBtn.addEventListener("click", () => {
  if (handle !== null) {
    clearInterval(handle);
    handle = null;
  }

  Clear();
});

equalsBtn.addEventListener("click", () => {
  if (handle !== null) {
    clearInterval(handle);
    handle = null;
  }

  if (operandsArray[1] !== null) {
    doMath(operandsArray[0], operandsArray[1]);
  }
});

invertBtn.addEventListener("click", () => {
  input.innerText *= -1;

  SetDisplayNumber();
});

//fun buttons

randomBtn.addEventListener("click", () => {
  let mode = calcMode.getAttribute("data-mode");
  calcMode.setAttribute("data-input", "first");

  clearInterval(handle);
  handle = " ";
  fetch(url)
    .then((response) => response.json())
    .then((value) => {
      input.innerText = value;

      SetDisplayNumber();
    });
});

startBtn.addEventListener(
  "click",
  () => {
    handle = setInterval(() => {
      if (input.innerText > 0) {
        input.innerText -= 1;
      } else {
        input.innerText = "Happy Birthday!";
        clearInterval(handle);
      }
    }, 50);

    calcMode.setAttribute("data-input", "first");
  },
  { once: true }
);

//math function
