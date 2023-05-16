const calculator = document.querySelector('.calculator-grid')
const btns = calculator.querySelectorAll('button')
const currentOperand = calculator.querySelector('[data-current-operand]')
const previousOperand = calculator.querySelector('[data-previous-operand]')
let firstNumber = 0
let secondNumber = 0
let operator
let sign

const operate = (operator, firstNumber, secondNumber) => {
    n1 = parseFloat(firstNumber)
    n2 = parseFloat(secondNumber)
    let result = 0
    if (operator === 'add') {
        result = n1 + n2
    } else if (operator === 'subtract') {
        result = n1 - n2
    } else if (operator === 'multiply') {
        result = n1 * n2
    } else if (operator === 'divide') {
        result = n1 / n2
    }
    return result
}

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        //console.log(btn)
        const action = btn.dataset.action
        const btnContent = btn.textContent
        const currentDisplay = currentOperand.textContent
        const previousBtnType = calculator.dataset.previousBtnType
        if (!action){
            if (currentDisplay === '0' || previousBtnType === 'operator') {
                currentOperand.textContent = btnContent
            } else {
                currentOperand.textContent = currentDisplay + btnContent
            }
            calculator.dataset.previousBtnType = 'number'
        }
        if (action === 'decimal') {
            currentOperand.textContent = currentDisplay + '.'
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
            firstNumber = currentDisplay
            //console.log(firstNumber)
            previousOperand.textContent = currentDisplay + ' ' + btnContent
            operator = action
            sign = btnContent
            calculator.dataset.previousBtnType = 'operator'
            //console.log(currentOperator)
        }
        if (action === 'result') {
            secondNumber = currentOperand.textContent
            previousOperand.textContent = `${firstNumber} ${sign} ${secondNumber} =`
            currentOperand.textContent = operate(operator, firstNumber, secondNumber)
        }
        if (action === 'clear'){
            currentOperand.textContent = 0
            previousOperand.textContent = ''
            calculator.dataset.previousBtnType = 'clear'
        }
        if (action === 'delete') {
            currentOperand.textContent = currentDisplay.slice(0,-1)
            if (!currentOperand.textContent) {
                currentOperand.textContent = 0
            }
            calculator.dataset.previousBtnType = 'delete'
        }
    })
})

// TODO:
// edge cases