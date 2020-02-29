let screenContainer = document.getElementById("screenContainer");

var operatorMapInitialized = false;
var operatorMap = new Map();

const rowContainerClassName = "rowContainer";
const formRowClassName = "topRowDiv";
const buttonRowDivClassName = "calcRowDiv";
const buttonDivClassName = "calcButtonDiv";
const inputSectionId = "inputSection";

let operationStack = [];
let displayText = "";
let postOperatorInput = false;
let postOperation = false;

initializeInnerContainers();

function initializeInnerContainers() {
    intializeOperatorMap();
    initializeAllRows();
}

function initializeAllRows() {
    if (document.getElementsByClassName('topRowDiv').length === 0) {
        initializeFormRow();
    }
    initializeButtonRow(['7', '8', '9', '*']);
    initializeButtonRow(['4', '5', '6', '-']);
    initializeButtonRow(['1', '2', '3', '+']);
    initializeButtonRow(['clear', '0', '=', '/']);
}

function initializeButtonRow(inputArray) {
    let rowDiv = document.createElement('div');
    rowDiv.className = buttonRowDivClassName;

    for(var i = 0; i < inputArray.length; i++){
        let buttonDiv = generateButtonDivByCharacter(inputArray, i);

        if(null != buttonDiv) {
            buttonDiv.className = buttonDivClassName;
            rowDiv.appendChild(buttonDiv);
        } else {
            console.log("Unappended button: "  + inputArray[i]);
        }
    }
    screenContainer.appendChild(rowDiv);
}

function generateButtonDivByCharacter(inputArray, i) {
    let buttonDiv = null;
    if (!isNaN(inputArray[i])) {
        buttonDiv = createNumberButtonDiv(inputArray[i]);
    } else if (operatorMapInitialized && operatorMap.has(inputArray[i])) {
        buttonDiv = createOperatorButtonDiv(inputArray[i]);
    } else {
        buttonDiv = attemptCreateSpecialButtonDiv(inputArray[i]);
    }
    return buttonDiv;
}

function attemptCreateSpecialButtonDiv(specialButton) {
    let buttonDiv = document.createElement('div');
    let button = document.createElement('button');
    button.textContent = specialButton;
    if(specialButton == "=") {
        button.addEventListener("click", () => {
            if(!isNaN(displayText) && null != operationStack[1]){
                operationStack.push(parseInt(displayText));
                displayText = operate(operationStack[1], operationStack[0], operationStack[2]);
                inputSection.value = displayText;
                operationStack = [];
                postOperation = true;
            }
        });
    } else if (specialButton == "clear") {
        button.addEventListener("click", () => {
            displayText = "";
            inputSection.value = displayText;
            operationStack = [];
        });
    }
    buttonDiv.appendChild(button);
    return buttonDiv;
}

function createOperatorButtonDiv(operator){
    let buttonDiv = document.createElement('div');
    buttonDiv.id = "button" + operatorMap.get(operator).name;
    let button = document.createElement('button');
    button.textContent = operator;
    button.addEventListener("click", () => {
        if(!isNaN(displayText)){
            operationStack.push(parseInt(displayText));
            operationStack.push(button.textContent);
            postOperatorInput = true;
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
    let button = document.createElement('button');
    button.textContent = number;
    button.addEventListener("click", () => {
        if(postOperatorInput || postOperation) {
            displayText = "";
            updateDisplay(button);
            postOperatorInput = false;
            postOperation = false;
        } else {
            updateDisplay(button);
        }
    });

    buttonDiv.appendChild(button);
    return buttonDiv;
}

function updateDisplay(button) {
    displayText += button.textContent;
    let inputSection = document.getElementById(inputSectionId);
    inputSection.value = displayText;
}

function initializeFormRow(){
    let formRow = document.createElement('div');
    formRow.className = formRowClassName;
    let readOnlyForm = document.createElement('form');
    initializeReadOnlyForm(readOnlyForm);
    formRow.appendChild(readOnlyForm);

    screenContainer.appendChild(formRow);
}

function initializeReadOnlyForm(readOnlyForm) {
    readOnlyForm.className = "readOnlyForm";
    let inputSection = document.createElement('input');
    inputSection.id = inputSectionId;
    inputSection.type = "text";
    inputSection.readOnly = true;

    readOnlyForm.appendChild(inputSection);
}

function add(input1, input2) {return input1 + input2;}

function subtract(input1, input2) {return input1 - input2;}

function multiply(input1, input2) {return input1 * input2;}

function divide(input1, input2) {return input2 != 0 ? input1 / input2 : "ERROR divided by zero";}

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