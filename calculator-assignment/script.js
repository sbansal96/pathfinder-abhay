const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number) {

    if (awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    } else {
        console.log("Value :", number)
        const displayValue = calculatorDisplay.textContent

        if (displayValue === '0') {
            calculatorDisplay.textContent = number;
        } else {
            calculatorDisplay.textContent = displayValue + number
        }

        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return
    }

    if (!firstValue) {
        firstValue = currentValue;
    } else {
        //calculations
        const calcAns = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calcAns;
        firstValue = calcAns;
    }

    awaitingNextValue = true
    operatorValue = operator
    console.log("First Value :", firstValue)
}


function addDecimal() {
    if (awaitingNextValue) return
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    }

})
// Resel All the values
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listeners
clearBtn.addEventListener('click', resetAll)