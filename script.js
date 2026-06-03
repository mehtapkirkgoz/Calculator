const displayControls = document.querySelector(".display-controls");
const displayCurrent = document.querySelector(".display-current");
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".oprt");
const percentButton = document.querySelector(".percent");
const inverseButton = document.querySelector(".inverse");
const sqrtButton = document.querySelector(".sqrt");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const clearAllButton = document.querySelector(".clear-all");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");
const powerButton = document.querySelector(".power");

let firstValue = "";
let secondValue = "";
let currentOperator = null;
let shouldReset = false;
let current = "";

function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  if(b === 0){
    return "Error";
  }

  return a / b;
}

function roundResult(number){
  return Math.round(number * 100000) / 100000;
}

function operate(a, operator, b){
  a = Number(a);
  b = Number(b);

  let result;

  switch(operator){
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      return null;
  }

  if(result === "Error"){
    return "Error";
  }

  return roundResult(result);
}

function updateDisplay(){
  displayCurrent.textContent = current || "0";
}

function resetCalculatorError(){
  if(current === "Error") {
    current = "";
    firstValue = "";
    secondValue = "";
    currentOperator = null;
    shouldReset = false;
    displayControls.textContent = "";
  }
}

function appendNumber(num){
  resetCalculatorError();

  if(shouldReset){
    current = "";
    shouldReset = false;
  }

  if(current.length >= 15) return;

  if(current === "0"){
    current = num;
  }else{
    current += num;
  }

  updateDisplay();
}

function appendDecimal(){
  resetCalculatorError();

  if(shouldReset){
    current = "";
    shouldReset = false;
  }

  if(current.includes(".")) return;

  if(current === ""){
    current = "0.";
  }else{
    current += ".";
  }

  updateDisplay();
}

function chooseOperator(op){
  if(current === "Error") return;

  if(current === "" && firstValue === "") return;

  if(current === "" && firstValue !== ""){
    currentOperator = op;
    displayControls.textContent = `${firstValue} ${currentOperator}`;
    return;
  }

  if(firstValue !== "" && currentOperator !== null && !shouldReset){
    secondValue = current;

    let result = operate(firstValue, currentOperator, secondValue);

    if(result === "Error"){
      current = "Error";
      firstValue = "";
      secondValue = "";
      currentOperator = null;
      shouldReset = false;
      displayControls.textContent = "";
      updateDisplay();
      return;
    }

    firstValue = result.toString();
    current = firstValue;
  }else{
    firstValue = current;
  }

  currentOperator = op;
  displayControls.textContent = `${firstValue} ${currentOperator}`;
  shouldReset = true;

  updateDisplay();
}

function equals(){
  if(firstValue === "" || current === "" || currentOperator === null) return;
  if(current === "Error") return;

  secondValue = current;

  let result = operate(firstValue, currentOperator, secondValue);

  displayControls.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;

  if(result === "Error"){
    current = "Error";
    firstValue = "";
    secondValue = "";
    currentOperator = null;
    shouldReset = false;
    updateDisplay();
    return;
  }

  current = result.toString();

  firstValue = "";
  secondValue = "";
  currentOperator = null;
  shouldReset = true;

  updateDisplay();
}

function clearAll(){
  firstValue = "";
  secondValue = "";
  current = "";
  currentOperator = null;
  shouldReset = false;

  displayControls.textContent = "";

  updateDisplay();
}

function clearCurrent(){
  current = "";
  shouldReset = false;
  updateDisplay();
}

function backspace(){
  if(current === "Error") return;
  if(shouldReset) return;

  current = current.slice(0, -1);
  updateDisplay();
}

function percent(){
  if(current === "" || current === "Error") return;

  current = roundResult(Number(current) / 100).toString();
  updateDisplay();
}

function inverse(){
  if(current === "" || current === "Error") return;

  if(Number(current) === 0){
    current = "Error";
    displayControls.textContent = "";
    updateDisplay();
    return;
  }

  current = roundResult(1 / Number(current)).toString();
  updateDisplay();
}

function sqrt(){
  if(current === "" || current === "Error") return;

  if(Number(current) < 0){
    current = "Error";
    displayControls.textContent = "";
    updateDisplay();
    return;
  }

  current = roundResult(Math.sqrt(Number(current))).toString();
  updateDisplay();
}

function power(){
  if(current === "" || current === "Error") return;

  current = roundResult(Math.pow(Number(current), 2)).toString();
  updateDisplay();
}

numberButtons.forEach((button) =>{
  button.addEventListener("click", () =>{
    appendNumber(button.textContent);
  });
});

operatorButtons.forEach((button) =>{
  button.addEventListener("click", () =>{
    chooseOperator(button.textContent);
  });
});

equalsButton.addEventListener("click", equals);
clearAllButton.addEventListener("click", clearAll);
clearButton.addEventListener("click", clearCurrent);
backspaceButton.addEventListener("click", backspace);
decimalButton.addEventListener("click", appendDecimal);
percentButton.addEventListener("click", percent);
inverseButton.addEventListener("click", inverse);
sqrtButton.addEventListener("click", sqrt);
powerButton.addEventListener("click", power);

updateDisplay();