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

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}