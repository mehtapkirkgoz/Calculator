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

function maxLengthControl(num){
  if(num === "1"){
    return 32;
  }else{
    return 28;
  }
}

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
    return "Error";
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

function updateCalculator(){
  calculatorState.firstValue = "";
  calculatorState.secondValue = "";
  calculatorState.current = "";
  calculatorState.currentOperator = null;
  calculatorState.shouldReset = false;
  calculatorState.lastOperator = null;
  calculatorState.lastSecondValue = "";
}

function inputNumber(num){
  clearError();

  if(calculatorState.shouldReset){
    calculatorState.current = "";
    calculatorState.shouldReset = false;
  }

  let maxLength = maxLengthControl(num);

  if(calculatorState.current.length >= maxLength) return;

  if(calculatorState.current === "0"){
    calculatorState.current = num;
  }else{
    calculatorState.current += num;
  }

  updateDisplay();
}

function inputDecimal(){
  clearError();
  decimalButton.disabled = true;

  if(calculatorState.shouldReset){
    calculatorState.current = "";
    calculatorState.shouldReset = false;
  }

  if(calculatorState.current.includes(".")) return;

  if(calculatorState.current === ""){
    calculatorState.current = "0.";
  }else{
    calculatorState.current += ".";
  }

  updateDisplay();
}

function removeTrailingZeros(){

  if(Number(calculatorState.current) === 0){
    calculatorState.current = "0";
  }

}

function chooseOperator(operator){
  if(checkError()) return;

  removeTrailingZeros();

  if(calculatorState.current === "" && calculatorState.firstValue === "") return;

  if(calculatorState.current === "" && calculatorState.firstValue !== ""){
    calculatorState.currentOperator = operator;
    displayControls.textContent = `${calculatorState.firstValue} ${calculatorState.currentOperator}`;
    return;
  }

  if(calculatorState.firstValue !== "" && calculatorState.currentOperator !== null && !calculatorState.shouldReset){
    calculatorState.secondValue = calculatorState.current;

    let result = operate(calculatorState.firstValue, calculatorState.currentOperator, calculatorState.secondValue);

    if(result === "Error"){
      calculatorState.current = "Error";
      calculatorState.firstValue = "";
      calculatorState.secondValue = "";
      calculatorState.currentOperator = null;
      calculatorState.shouldReset = false;
      displayControls.textContent = "";
      updateDisplay();
      return;
    }

    calculatorState.firstValue = result.toString();
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
  if(checkError()) return;

  if(calculatorState.firstValue === "" && calculatorState.lastOperator !== null){
    calculatorState.firstValue = calculatorState.current;
    calculatorState.currentOperator = calculatorState.lastOperator;
    calculatorState.secondValue = calculatorState.lastSecondValue;
  }else{
    if(calculatorState.firstValue === "" || calculatorState.currentOperator === null) return;
    calculatorState.secondValue = calculatorState.current;
  }

  calculatorState.lastOperator = calculatorState.currentOperator;
  calculatorState.lastSecondValue = calculatorState.secondValue;

  let result = operate(calculatorState.firstValue, calculatorState.currentOperator, calculatorState.secondValue);

  displayControls.textContent = `${calculatorState.firstValue} ${calculatorState.currentOperator} ${calculatorState.secondValue} =`;

  if(result === "Error"){
    calculatorState.current = "Error";
    calculatorState.firstValue = "";
    calculatorState.secondValue = "";
    calculatorState.currentOperator = null;
    calculatorState.shouldReset = false;
    updateDisplay();
    return;
  }

  calculatorState.current = result.toString();
  calculatorState.firstValue = "";
  calculatorState.currentOperator = null;
  calculatorState.shouldReset = true;

  updateDisplay();
}

function clearAll(){
  updateCalculator();
  displayControls.textContent = "";
  updateDisplay();
}

function clearCurrent(){
  calculatorState.current = "";
  calculatorState.shouldReset = false;

  updateDisplay();
}

function backspace(){
  if(checkError()){
    calculatorState.current = "";
    updateDisplay();
    return;
  }

  if(calculatorState.shouldReset){
    calculatorState.current = "";
    calculatorState.shouldReset = false;
    updateDisplay();
    return;
  }

  calculatorState.current = calculatorState.current.slice(0, -1);
  updateDisplay();
}

function percent(){
  if(calculatorState.current === "" || checkError()) return;

  let number = Number(calculatorState.current);

  if(!Number.isFinite(number)) return;

  let result = roundResult(number / 100);

  calculatorState.current = result.toString();
  updateDisplay();
}

function inverse(){
  if(calculatorState.current === "" || checkError()) return;

  let number = Number(calculatorState.current);

  if(!Number.isFinite(number)) return;

  if(number === 0){
    calculatorState.current = "Error";
    displayControls.textContent = "";
    updateDisplay();
    return;
  }

  let result = roundResult(1 / number);

  calculatorState.current = result.toString();
  updateDisplay();
}

function sqrt(){
  if(calculatorState.current === "" || checkError()) return;

  let number = Number(calculatorState.current);

  if(!Number.isFinite(number)) return;

  if(number < 0){
    calculatorState.current = "Error";
    displayControls.textContent = "";
    updateDisplay();
    return;
  }

  let result = roundResult(Math.sqrt(number));

  calculatorState.current = result.toString();
  updateDisplay();
}

function power(){
  if(calculatorState.current === "" || checkError()) return;

  let number = Number(calculatorState.current);

  if(!Number.isFinite(number)) return;

  let result = roundResult(Math.pow(number, 2));

  calculatorState.current = result.toString();
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