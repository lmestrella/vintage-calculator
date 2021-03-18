const calcLcdText = document.querySelector(".calc__lcd-text");
const calcNumbers = document.querySelectorAll("[data-number]");
const calcOperations = document.querySelectorAll("[data-operation]");

operation = {
  ADD: "add",
  SUBTRACT: "subtract",
  MULTIPLY: "multiply",
  DIVIDE: "divide",
};

let operationCtr = 0;
let firstNumber = null;
let secondNumber = null;
let currentOperation = null;

const enterDigit = (e) => {
  const calcLcdTextValue = getLcdText();
  const nextDigit = e.target.getAttribute("data-number");
  if (
    calcLcdTextValue == 0 ||
    calcLcdTextValue === "ERR" ||
    operationCtr === 1
  ) {
    setLcdText(nextDigit);
    operationCtr = 0;
  } else {
    if (calcLcdTextValue.length < 8) {
      setLcdText(`${getLcdText()}${nextDigit}`);
    }
  }
};
const enterOperation = (e) => {
  const calcLcdTextValue = getLcdText();
  const chosenOperation = e.target.getAttribute("data-operation");

  switch (chosenOperation) {
    case "clear":
      if (calcLcdTextValue.length === 1 || calcLcdTextValue === "ERR") {
        setLcdText(0);
      } else {
        setLcdText(calcLcdTextValue.substring(0, calcLcdTextValue.length - 1));
      }
      break;
    case "all":
      setLcdText(0);
      resetValues();
      break;
    case "equals":
      if (operationCtr > 0) setLcdText("ERR");
      else setLcdText(getTotal());
      resetValues();
      break;
    default:
      if (operationCtr === 0 && firstNumber) {
        setLcdText(getTotal());
        resetValues();
      }
      firstNumber = Number(getLcdText());
      currentOperation = chosenOperation;
      operationCtr++;
      break;
  }
};

calcNumbers.forEach((calcNumber) => {
  calcNumber.addEventListener("click", enterDigit);
});
calcOperations.forEach((calcOperation) => {
  calcOperation.addEventListener("click", enterOperation);
});

function setLcdText(value) {
  if (value === "ERR" || value === Infinity) {
    calcLcdText.innerText = "ERR";
    resetValues();
  } else {
    calcLcdText.innerText = value.toString();
  }
}
function getLcdText() {
  return calcLcdText.innerText;
}
function getTotal() {
  let total = null;
  secondNumber = Number(getLcdText());
  switch (currentOperation) {
    case operation.ADD:
      total = firstNumber + secondNumber;
      break;
    case operation.SUBTRACT:
      total = firstNumber - secondNumber;
      break;
    case operation.MULTIPLY:
      total = firstNumber * secondNumber;
      break;
    case operation.DIVIDE:
      total = firstNumber / secondNumber;
      break;
  }
  return total.toString().length > 8 ? "ERR" : total;
}
function resetValues() {
  operationCtr = 0;
  firstNumber = null;
  secondNumber = null;
  currentOperation = null;
}
