const calculator = document.querySelector('.calculator-grid')
const btns = calculator.querySelectorAll('button')
const currentOperand = calculator.querySelector('[data-current-operand]')
const previousOperand = calculator.querySelector('[data-previous-operand]')
let sign

const operate = (operator, firstNumber, secondNumber) => {
    n1 = parseFloat(firstNumber)
    n2 = parseFloat(secondNumber)
    if (operator === 'add') return n1 + n2
    else if (operator === 'subtract') return n1 - n2
    else if (operator === 'multiply') return n1 * n2
    else if (operator === 'divide') return n1 / n2
}

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
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
            if (previousBtnType === 'operator') {
                currentOperand.textContent = '0.'
            } else if (!currentDisplay.includes('.')) {
                currentOperand.textContent = currentDisplay + '.'
            }
            calculator.dataset.previousBtnType = 'decimal'
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
            const firstNumber = calculator.dataset.firstNumber
            const operator = calculator.dataset.operator
            const secondNumber = currentDisplay
            if (firstNumber && operator && previousBtnType !== 'operator') {
                const temp = operate(operator, firstNumber, secondNumber)
                currentOperand.textContent = temp
                calculator.dataset.firstNumber = temp
                previousOperand.textContent = `${temp} ${btnContent}`
            } else {
                calculator.dataset.firstNumber = currentDisplay
                previousOperand.textContent = `${currentDisplay} ${btnContent}`
            }     
            calculator.dataset.operator = action
            sign = btnContent
            calculator.dataset.previousBtnType = 'operator'
        }
        resultCond: if (action === 'result') {
            if (previousBtnType === 'result'){
                break resultCond
            }
            const firstNumber = calculator.dataset.firstNumber
            const secondNumber = currentDisplay
            const operator = calculator.dataset.operator
            if (firstNumber) {
                previousOperand.textContent = `${firstNumber} ${sign} ${secondNumber} =`
                const res = operate(operator, firstNumber, secondNumber)
                calculator.dataset.firstNumber = res
                calculator.removeAttribute('data-operator')
                currentOperand.textContent = res
            }
            calculator.dataset.previousBtnType = 'result'
        }
        if (action === 'clear'){
            calculator.removeAttribute('data-operator')
            calculator.removeAttribute('data-first-number')
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
// refactoring
// design