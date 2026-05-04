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

  return Math.round(result * 100000) / 100000;
}

function updateDisplay(){
  displayCurrent.textContent = current || "0";
  displayControls.textContent = `${firstValue} ${currentOperator || ""}`;
}

function appendNumber(num){
  if(shouldReset){
    current = "";
    shouldReset = false;
  }

  current += num;
  updateDisplay();
}

function chooseOperator(op){
  if(current === "") return;

  if(firstValue && currentOperator){
    firstValue = operate(firstValue, currentOperator, current);
  }else{
    firstValue = current;
  }

  currentOperator = op;
  current = "";

  updateDisplay();
}

function equals(){
  if(!firstValue || !current || !currentOperator) return;

  secondValue = current;

  current = operate(firstValue, currentOperator, secondValue);

  displayControls.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;

  firstValue = "";
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

function backspace(){
  current = current.slice(0, -1);
  updateDisplay();
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