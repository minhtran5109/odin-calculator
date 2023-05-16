const calculator = document.querySelector('.calculator-grid')
const btns = calculator.querySelectorAll('button')
console.log(btns)

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        //console.log(btn)
    })
})