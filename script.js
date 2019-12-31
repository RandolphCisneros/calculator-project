let screenContainer = document.getElementById("screenContainer");

var operatorMapInitialized = false;
var operatorMap = new Map();

const rowContainerClassName = "rowContainer";
const topRowClassName = "topRowDiv";
const calcRowDivClassName = "calcRowDiv";
const inputSectionId = "inputSection";

let operationStack = [];
let displayText = "";
let calcRow = 1;
let operationSubstring = "";
let secondInput = false;

initializeInnerContainers();

function initializeInnerContainers() {
    intializeOperatorMap();
    checkOrInitializeTopRow();
}

function checkOrInitializeTopRow() {
    if (document.getElementsByClassName('topRowDiv').length === 0) {
        initializeTopRow();
    }
    initializeRow(['7', '8', '9', '*']);
    initializeRow(['4', '5', '6', '-']);
    initializeRow(['1', '2', '3', '+']);
    initializeRow(['clear', '0', '=', '/']);
}

function initializeRow(inputArray) {
    let rowDiv = document.createElement('div');
    rowDiv.className = calcRowDivClassName;
    rowDiv.id = calcRowDivClassName + calcRow;
    calcRow++;

    for(var i = 0; i < inputArray.length; i++){
        if(!isNaN(inputArray[i])){
            let buttonDiv = createNumberButtonDiv(inputArray[i]);
            rowDiv.appendChild(buttonDiv);
        } else if (operatorMapInitialized && operatorMap.has(inputArray[i])){
            let buttonDiv = createOperatorButtonDiv(inputArray[i]);
            rowDiv.appendChild(buttonDiv);
        } else {
            let buttonDiv = attemptCreateSpecialButtonDiv(inputArray[i]);
            rowDiv.appendChild(buttonDiv);
        }
    }
    screenContainer.appendChild(rowDiv);
}

function attemptCreateSpecialButtonDiv(specialButton) {
    let buttonDiv = document.createElement('div');
    buttonDiv.id = "button" + specialButton;
    let button = document.createElement('button');
    button.textContent = specialButton;
    if(specialButton == "=") {
        button.addEventListener("click", () => {
            if(!isNaN(displayText)){
                operationStack.push(parseInt(displayText));
            }
            displayText = operate(operationStack[1], operationStack[0], operationStack[2]);
            inputSection.value = displayText;
            operationStack = [];
        });
    } else if (specialButton == "clear") {
        button.addEventListener("click", () => {
            displayText = "";
            inputSection.value = displayText;
            operationStack = [];
        })
    }
    buttonDiv.appendChild(button);
    return buttonDiv;
}

function createOperatorButtonDiv(operator){
    let buttonDiv = document.createElement('div');
    buttonDiv.id = "button" + operatorMap.get(operator);
    let button = document.createElement('button');
    button.textContent = operator;
    button.addEventListener("click", () => {
        if(!isNaN(displayText)){
            operationStack.push(parseInt(displayText));
            operationStack.push(button.textContent);
            displayText = "";
            console.log(operationStack);
        } else {
            console.log("Not a number. Clear and try again.");
        }
        let inputSection = document.getElementById(inputSectionId);
        inputSection.value = displayText;
    });
    buttonDiv.appendChild(button);
    return buttonDiv;
}

function createNumberButtonDiv(number){
    let buttonDiv = document.createElement('div');
    buttonDiv.id = "button" + number;
    let button = document.createElement('button');
    button.textContent = number;
    button.addEventListener("click", () => {
        displayText += button.textContent;
        let inputSection = document.getElementById(inputSectionId);
        inputSection.value = displayText;
    });
    buttonDiv.appendChild(button);
    return buttonDiv;
}

function initializeTopRow(){
    let topRow = document.createElement('div');
    topRow.className = topRowClassName;
    let readOnlyForm = document.createElement('form');
    initializeReadOnlyForm(readOnlyForm);
    topRow.appendChild(readOnlyForm);

    screenContainer.appendChild(topRow);
}

function initializeReadOnlyForm(readOnlyForm) {
    readOnlyForm.className = "readOnlyForm";
    let inputSection = document.createElement('input');
    inputSection.id = inputSectionId;
    inputSection.type = "text";
    inputSection.readOnly = true;
    readOnlyForm.appendChild(inputSection);
}

function add(input1, input2) {
    return input1 + input2;
}

function subtract(input1, input2) {
    return input1 - input2;
}

function multiply(input1, input2) {
    return input1 * input2;
}

function divide(input1, input2) {
    return input2 != 0 ? input1 / input2 : "ERROR divided by zero";
}

function intializeOperatorMap() {
    operatorMap.set('+', add);
    operatorMap.set('-', subtract);
    operatorMap.set('*', multiply);
    operatorMap.set('/', divide);
    operatorMapInitialized = true;
    return operatorMap;
}

function operate(operator, num1, num2){
    if (operatorMapInitialized === false){
        intializeOperatorMap();
    }
    let handlerFunc = operatorMap.has(operator) ? operatorMap.get(operator) : "Error invalid operator";
    return handlerFunc(num1, num2);
}
