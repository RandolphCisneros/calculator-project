

var operatorMapInitialized = false;
var operatorMap = new Map();

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

module.exports = {
	add,
	subtract,
	multiply,
    divide,
    operate
};
