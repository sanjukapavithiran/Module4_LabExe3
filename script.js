document.addEventListener('DOMContentLoaded', function() {
    const previousOperandTextElement = document.querySelector('[previous-operand]');
    const currentOperandTextElement = document.querySelector('[current-operand]');
    const numberButtons = document.querySelectorAll('[number]');
    const operationButtons = document.querySelectorAll('[operation]');
    const equalsButton = document.querySelector('[equals]');
    const allClearButton = document.querySelector('[all-clear]');
    const deleteButton = document.querySelector('[delete]');

    let previousOperand = '';
    let currentOperand = '';
    let operation = undefined;

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.innerText);
            updateDisplay();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.innerText);
            updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        compute();
        updateDisplay();
    });

    allClearButton.addEventListener('click', () => {
        clear();
        updateDisplay();
    });

    deleteButton.addEventListener('click', () => {
        deleteLast();
        updateDisplay();
    });

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    }

    function chooseOperation(operationInput) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = operationInput;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    }

    function deleteLast() {
        currentOperand = currentOperand.toString().slice(0, -1);
    }

    function updateDisplay() {
        currentOperandTextElement.innerText = currentOperand;
        if (operation != null) {
            previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
        } else {
            previousOperandTextElement.innerText = '';
        }
    }
})