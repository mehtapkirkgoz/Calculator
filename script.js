let displayControls = document.querySelector('.display-controls')
let displayCurrent = document.querySelector('.display-current');
let numberButtons = document.querySelectorAll('.num');
let operatorButtons = document.querySelectorAll('.oprt');
let percentButton = document.querySelector('.percent');
let inverseButton = document.querySelector('.inverse');
let sqrtButton = document.querySelector('.sqrt');
let equalsButton = document.querySelector('.equals');
let clearButton = document.querySelector('.clear');
let clearAllButton = document.querySelector('.clear-all');
let backspaceButton = document.querySelector('.backspace');
let decimalButton = document.querySelector('.decimal');
let powerButton = document.querySelector('.power');

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

  return roundResult(result);
}

function updateDisplay(){
  displayCurrent.textContent = current || "0";
}

function appendNumber(num){
  if(current === "Error"){
    current = "";
  }

  if(shouldReset){
    current = "";
    shouldReset = false;
  }

  if(current.length >= 28) return;

  if(current === "0"){
    current = num;
  }else{
    current += num;
  }

  updateDisplay();
}

function chooseOperator(op){
  if(current === "Error") return;

  if(current === ""){
    currentOperator = op;

    displayControls.textContent = `${firstValue} ${currentOperator}`;

    return;
  }

  if(firstValue && currentOperator){

    secondValue = current;

    let result = operate(firstValue, currentOperator, secondValue);
    if(result === "Error"){
      current = "Error";

      firstValue = "";
      secondValue = "";
      currentOperator = null;

      updateDisplay();
      return;
    }

    firstValue = result;
    current = result.toString();
  }else{
    firstValue = current;
  }

  currentOperator = op;

  displayControls.textContent = `${firstValue} ${currentOperator}`;

  updateDisplay();
  shouldReset = true;
}

function equals(){
  if(!firstValue || !current || !currentOperator) return;

  secondValue = current;

  current = operate(firstValue, currentOperator, secondValue);

  displayControls.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;

  firstValue = "";
  secondValue = "";
  currentOperator = null;
  shouldReset = true;

  updateDisplay();
}

function clearAll(){
  firstValue = "";
  current = "";
  currentOperator = null;

  displayControls.textContent = "";
  updateDisplay();
}

function clearCurrent(){
  if(shouldReset) return;
  current = "";

  updateDisplay();
}

function backspace(){
  current = current.slice(0, -1);
  updateDisplay();
}

function roundResult(number){
  return Math.round(number * 100000) / 100000;
}

function appendDecimal(){

  if(current.includes(".")) return;

  if(current === ""){
    current = "0.";
  }else{
    current += ".";
  }

  updateDisplay();
}

function percent(){

  if(current === "") return;

  current = (Number(current) / 100).toString();

  updateDisplay();
}

function inverse(){

  if(current === "") return;

  if(Number(current) === 0){
    current = "Error";
    updateDisplay();
    return;
  }

  let result = 1 / Number(current);

  current = roundResult(result).toString();

  updateDisplay();
}

function sqrt(){

  if(current === "") return;

  if(Number(current) < 0){
    current = "Error";
    updateDisplay();
    return;
  }

  let result = Math.sqrt(Number(current));

  current = roundResult(result).toString();

  updateDisplay();
}

function power(){

  if(current === "") return;

  let result = Math.pow(Number(current), 2);

  current = roundResult(result).toString();

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

backspaceButton.addEventListener("click", backspace);

decimalButton.addEventListener("click", appendDecimal);

percentButton.addEventListener("click", percent);

inverseButton.addEventListener("click", inverse);

sqrtButton.addEventListener("click", sqrt);

powerButton.addEventListener("click", power);

clearButton.addEventListener("click", clearCurrent);
