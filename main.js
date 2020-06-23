// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1. VARIABLE DECLARATION - all dom objects assigned to the global varaibles
let input = document.querySelector("#input");
let output = document.querySelector("#output");

const EQUALS = document.querySelector("#equals");
const ZERO = document.querySelector("#zero");
const DOT = document.querySelector("#dot");

const CLEAR = document.querySelector("#clear");
const BCKSP = document.querySelector("#backspace");

let num = document.querySelectorAll(".number");
let oper = document.querySelectorAll(".operator");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 2. INPUT SECTION - contains statements which are ensures data input and data validation
// 2.1 expression and doubleOperator ensures that input is correct and ready for calculation
function expression(element) {

    if (typeof element === "object") { element = element.value };
    if (input.innerHTML === "0" && /\d/.test(element)) { input.innerHTML = input.innerHTML.replace("0", "") };
    if (output.innerHTML === "0" && /\d/.test(element)) { output.innerHTML = output.innerHTML.replace("0", "") };

    (/[\d\.]/.test(element) && /[\d\.]/.test(input.innerHTML) ) ? input.innerHTML += element : input.innerHTML = element; 
    output.innerHTML += element;
}

function doubleOperators(oper) {

    if (typeof oper === "object") { oper = oper.value };
   ( oper === "-" && /[\+\/\*]$/.test(output.innerHTML)) ? output.innerHTML += oper : output.innerHTML = output.innerHTML.replace(/\D+$/, oper)
    input.innerHTML = oper;
}

function operatorExpression(oprs) {
    /[\+\-\*\/]$/.test(output.innerHTML) ? doubleOperators(oprs) : expression(oprs);
}

function zeroInput() { 
    arr = output.innerHTML.split(/[\+\-\*\/]/);
   if (arr[arr.length-1].indexOf("0") !== 0 || arr[arr.length-1].indexOf(".") > -1) {expression(ZERO)};
}

function dotInput() {
    arr = output.innerHTML.split(/[\+\-\*\/]/);
    /[\+\-\*\/]$/.test(output.innerHTML) ? DOT.value = "0." : DOT.value = "."; 
    if (arr[arr.length-1].indexOf(".") === -1) {expression(DOT)};  
}

// 2.2 resets the value of the function and both displays
function reset() {
    input.innerHTML = "0";
    output.innerHTML = "0";
}

function backspace() {
    input.innerHTML.length === 1 ? input.innerHTML = "0" : input.innerHTML = input.innerHTML.slice(0, -1);
    output.innerHTML.length === 1 ? output.innerHTML = "0" : output.innerHTML = output.innerHTML.slice(0, -1);
}

// 3 INPUT CLICK EVENTS

num.forEach( nr =>  nr.addEventListener("click", () => expression(nr)) );
oper.forEach( op =>  op.addEventListener("click", () => operatorExpression(op)) );

ZERO.addEventListener("click", () => zeroInput() );
DOT.addEventListener("click", () => dotInput() ); 

CLEAR.addEventListener("click", () => reset() );
BCKSP.addEventListener("click", () => backspace() );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 4. EQUATION - contains statements which calculates the arithmentic input and returns the result

function addSubMultDiv(formula) {
    function calculator(num1, num2, operator) {
        math = {
            "-" : () => num1 - num2,
            "+" : () => num1 + num2,
            "/" : () => num1 / num2,
            "*" : () => num1 * num2,
        }
       return math[operator]();
    }
    
    let primary = /[(?<=\/ || \*)\-]*[\d\.]+[\*\/][(?<=\/ || \*)\-]*[\d\.]+/;
    let primaryOperators = /[\*\/]/;
    let secondary = /[\-]*[\d\.]+[\+][\-]*[\d\.]+/;
    let secondaryOperator = /[\+]/
    
    let equation = "";
    let numbers = 0;
    let mathArray = [];
    
    while (/[\*\/\+]/.test(formula)){
        if (/[\*\/]/.test(formula)) {
            equation = formula.match(primary);
            mathArray = equation[0].match(primaryOperators);
            numbers = equation[0].split(primaryOperators);
        } else{
            equation = formula.match(secondary);
            mathArray = equation[0].match(secondaryOperator);
            numbers = equation[0].split(secondaryOperator);
        }
        mathArray.unshift(Number(numbers[0]), Number(numbers[1]));
        formula = formula.replace(equation, calculator(...mathArray))
        // console.log(calculator(...mathArray), formula);
    }

        formula = formula.split("-");
        formula = formula.reduce((acc, val) => acc - val);
        return formula.toString();
    }

function count() {
    output.innerHTML= addSubMultDiv(output.innerHTML);
    if (output.innerHTML === "Infinity") { output.innerHTML = "ERROR PRESS C"}
    input.innerHTML = "0";
}

EQUALS.addEventListener("click", count );

// 5. keyboard events

window.addEventListener("keydown", c => {
    switch (c.key) {
        case "Backspace" : backspace();
            break;
        case "Delete" : reset();
            break;
        case "Enter" : count();
            break;
        case "0" : zeroInput();
            break;
        case "." : dotInput();
            break;
    }   

    if ( /[1-9]/.test(c.key) ) { expression(c.key) };
    if ( /[\/\*\-\+]/.test(c.key) ) { operatorExpression(c.key) };
});