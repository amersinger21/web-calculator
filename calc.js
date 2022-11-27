const input = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const randomBtn = document.getElementById("random");
const startBtn = document.getElementById("start");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
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
    let operation = calcMode.getAttribute("data-operation");
    let inputType = calcMode.getAttribute("data-input");

    if (handle !== null) {
      clearInterval(handle);
      handle = null;
    }
    
    if (inputType == "first") {
      input.innerText = item.id;
      calcMode.setAttribute("data-input", "other");
    } else if (inputType == "other")  {
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
    calcMode.setAttribute("data-input", "first");
    calcMode.setAttribute("data-operation", operator.id);
  });
});

//fun buttons

randomBtn.addEventListener("click", () => {
  let mode = calcMode.getAttribute("data-mode");
  calcMode.setAttribute("data-input", 'first');

  clearInterval(handle);
  handle = " ";
  fetch(url)
    .then((response) => response.json())
    .then((value) => {
      input.innerText = value;
      
      if (mode == "normal") {
        operandsArray[0] = input.innerText;
      } else if (mode == "calc") {
        operandsArray[1] = input.innerText;
      }
      
    
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

  calcMode.setAttribute("data-input", 'first');
});

//funtional buttons

clearBtn.addEventListener("click", () => {
  if (handle !== null) {
    clearInterval(handle);
    handle = null;
  }

  calcMode.setAttribute("data-mode", "normal");
  calcMode.setAttribute("data-operation", "none");
  calcMode.setAttribute("data-input", "first");
  input.innerText = "0";
  operandsArray = [];
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

//math function

function doMath(first, second) {
  let operation = calcMode.getAttribute("data-operation");
  let result = 0;

  if (first == null) {
    alert("Select a number");
    return;
  }

  if (second == null) {
    input.innerText = "Generating Factorial...";
    first = +first;

    for (i = first - 1; i > 1; i--) {
      first = first * i;
      console.log(first);
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
      result = "Nice Try, Nerd";
      operandsArray = [];
      calcMode.setAttribute("data-mode", "normal");
      calcMode.setAttribute("data-operation", "none");
      return;
    }
    result = first / second;
    input.innerText = Math.round((result * 100) / 100);
  }

  if (operation == "multiply") {
    result = first * second;
    input.innerText = result;
  }

  if (operation == "subtract") {
    result = first - second;
    input.innerText = result;
  }

  operandsArray = [result,];
  calcMode.setAttribute("data-mode", "normal");
  calcMode.setAttribute("data-operation", "equals");
  calcMode.setAttribute("data-input", "first");
  return;
}
