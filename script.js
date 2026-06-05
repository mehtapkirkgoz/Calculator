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

const calculatorState = {
  firstValue : "",
  secondValue : "",
  currentOperator : null,
  shouldReset : false,
  current : "",
  lastOperator : null,
  lastSecondValue : "",
  maxLength : 15
};

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

function checkError(){
  if(
    calculatorState.current === "Error" ||
    calculatorState.current === "Infinity" ||
    calculatorState.current === "-Infinity" ||
    calculatorState.current === "NaN"
  ){
    return true;
  }

  return false;
}

function clearError(){
  if(checkError()){
    calculatorState.current = "";
    calculatorState.firstValue = "";
    calculatorState.secondValue = "";
    calculatorState.currentOperator = null;
    calculatorState.shouldReset = false;
    calculatorState.lastOperator = null;
    calculatorState.lastSecondValue = "";
    displayControls.textContent = "";
  }
}

function roundResult(number){
  if(!Number.isFinite(number)){
    return "Error";
  }

  return Math.round(number * 100000) / 100000;
}

function operate(a, operator, b){
  a = Number(a);
  b = Number(b);

  if(!Number.isFinite(a) || !Number.isFinite(b)){
    return "Error";
  }

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
    return result;
  }

  return roundResult(result);
}

function updateDisplay(){
  displayCurrent.textContent = calculatorState.current || "0";
}

function inputNumber(num){
  clearError();

  if(calculatorState.shouldReset){
    calculatorState.current = "";
    calculatorState.shouldReset = false;
  }

  if(calculatorState.current.length >= calculatorState.maxLength) return;

  if(calculatorState.current === "0" && num !== "."){
    calculatorState.current = num;
  }else{
    calculatorState.current += num;
  }

  updateDisplay();
}

function inputDecimal(){
  resetCalculatorError();

  if(calculatorState.shouldReset){
    calculatorState.current = 0;
    calculatorState.shouldReset = false;
  }

  if(calculatorState.current.includes(".")) return;

  if(calculatorState.current === 0){
    calculatorState.current = "0.";
  }else{
    calculatorState.current += ".";
  }

  updateDisplay();
}

function chooseOperator(operator){
  if(calculatorState.current === "Error") return;

  if(calculatorState.current === 0 && calculatorState.firstValue === 0) return;

  if(calculatorState.current === 0 && calculatorState.firstValue !== 0){
    calculatorState.currentOperator = operator;
    displayControls.textContent = `${calculatorState.firstValue} ${calculatorState.currentOperator}`;
    return;
  }

  if(calculatorState.firstValue !== 0 && calculatorState.currentOperator !== null && !calculatorState.shouldReset){
    calculatorState.secondValue = calculatorState.current;

    let result = operate(calculatorState.firstValue, calculatorState.currentOperator, calculatorState.secondValue);

    if(result === "Error"){
      calculatorState.current = "Error";
      resetCalculatorError();
      updateDisplay();
      return;
    }

    calculatorState.firstValue = result;
    calculatorState.current = calculatorState.firstValue;
  }else{
    calculatorState.firstValue = calculatorState.current;
  }

  calculatorState.currentOperator = operator;
  displayControls.textContent = `${calculatorState.firstValue} ${calculatorState.currentOperator}`;
  calculatorState.shouldReset = true;

  updateDisplay();
}

function equals(){
  if(calculatorState.current === "Error") return;

  if(calculatorState.firstValue === 0 && calculatorState.lastOperator !== null){
    calculatorState.firstValue = calculatorState.current;
    calculatorState.currentOperator = calculatorState.lastOperator;
    calculatorState.secondValue = calculatorState.lastSecondValue;
  }else{
    if(calculatorState.firstValue === 0 || calculatorState.currentOperator === null) return;
    calculatorState.secondValue = calculatorState.current;
  }

  calculatorState.lastOperator = calculatorState.currentOperator;
  calculatorState.lastSecondValue = calculatorState.secondValue;

  let result = operate(calculatorState.firstValue, calculatorState.currentOperator, calculatorState.secondValue);

  displayControls.textContent = `${calculatorState.firstValue} ${calculatorState.currentOperator} ${calculatorState.secondValue} =`;

  if(result === "Error"){
    calculatorState.current = "Error";
    resetCalculatorError();
    updateDisplay();
    return;
  }

  calculatorState.current = result;
  calculatorState.firstValue = 0;
  calculatorState.currentOperator = null;
  calculatorState.shouldReset = true;

  updateDisplay();
}

function clearAll(){
  resetCalculatorError();
  updateDisplay();
}

function clearCurrent(){
  if(calculatorState.shouldReset){
    if(calculatorState.current = calculatorState.secondValue){
      calculatorState.current.textContent = 0;
    }
  }

  calculatorState.shouldReset = false;
  updateDisplay();
}

function backspace(){
  if(calculatorState.current === "Error" || calculatorState.current === "Infinity") return;
  if(calculatorState.shouldReset) return;

  calculatorState.current = calculatorState.current.slice(0, -1);
  updateDisplay();
}

function percent(){
  if(calculatorState.current === 0 || calculatorState.current === "Error") return;

  calculatorState.current = roundResult(Number(calculatorState.current) / 100);
  updateDisplay();
}

function inverse(){
  if(calculatorState.current === 0 || calculatorState.current === "Error") return;

  if(Number(calculatorState.current) === 0){
    calculatorState.current = "Error";
    displayControls.textContent = 0;
    updateDisplay();
    return;
  }

  calculatorState.current = roundResult(1 / Number(calculatorState.current));
  updateDisplay();
}

function sqrt(){
  if(calculatorState.current === 0 || calculatorState.current === "Error") return;

  if(Number(calculatorState.current) < 0){
    calculatorState.current = "Error";
    displayControls.textContent = 0;
    updateDisplay();
    return;
  }

  calculatorState.current = roundResult(Math.sqrt(Number(calculatorState.current)));
  updateDisplay();
}

function power(){
  if(calculatorState.current === 0 || calculatorState.current === "Error") return;

  calculatorState.current = roundResult(Math.pow(Number(calculatorState.current), 2));
  updateDisplay();
}

numberButtons.forEach((button) =>{
  button.addEventListener("click", () =>{
    inputNumber(button.textContent);
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
decimalButton.addEventListener("click", inputDecimal);
percentButton.addEventListener("click", percent);
inverseButton.addEventListener("click", inverse);
sqrtButton.addEventListener("click", sqrt);
powerButton.addEventListener("click", power);

document.addEventListener("keydown", (e) => {
  if(e.key >= "0" && e.key <= "9") inputNumber(e.key);
  else if(e.key === ".") inputDecimal();
  else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") chooseOperator(e.key);
  else if(e.key === "Enter" || e.key === "=") equals();
  else if(e.key === "Backspace") backspace();
  else if(e.key === "Escape") clearAll();
  else if(e.key === "%") percent();
});

updateDisplay();