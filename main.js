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
    if (input.innerHTML === "0" && /\d/.test(element.value)) { input.innerHTML = input.innerHTML.replace("0", "") };
    if (output.innerHTML === "0" && /\d/.test(element.value)) { output.innerHTML = output.innerHTML.replace("0", "") };

    (/[\d\.]/.test(element.value) && /[\d\.]/.test(input.innerHTML) ) ? input.innerHTML += element.value : input.innerHTML = element.value; 
    output.innerHTML += element.value;
}

function doubleOperators(oper) {
   ( oper.value === "-" && /[\+\/\*]$/.test(output.innerHTML)) ? output.innerHTML += oper.value : output.innerHTML = output.innerHTML.replace(/\D+$/, oper.value)
    input.innerHTML = oper.value;
}

// 2.2 resets the value of the function and both displays
function reset() {
    input.innerHTML = "0";
    output.innerHTML = "0";
}

// 2.3 click events
num.forEach( nr =>  nr.addEventListener("click", () => expression(nr)) );
oper.forEach( op =>  op.addEventListener("click", () => {
    /[\+\-\*\/]$/.test(output.innerHTML) ? doubleOperators(op) : expression(op);
}));

CLEAR.addEventListener("click", () => reset());
BCKSP.addEventListener("click", () => {
    input.innerHTML.length === 1 ? input.innerHTML = "0" : input.innerHTML = input.innerHTML.slice(0, -1);
    output.innerHTML.length === 1 ? output.innerHTML = "0" : output.innerHTML = output.innerHTML.slice(0, -1);
});

ZERO.addEventListener("click", () => { 
    arr = output.innerHTML.split(/[\+\-\*\/]/);
   if (arr[arr.length-1].indexOf("0") !== 0 || arr[arr.length-1].indexOf(".") > -1) {expression(ZERO)};
});

DOT.addEventListener("click", () => {
    arr = output.innerHTML.split(/[\+\-\*\/]/);
    /[\+\-\*\/]$/.test(output.innerHTML) ? DOT.value = "0." : DOT.value = "."; 
    if (arr[arr.length-1].indexOf(".") === -1) {expression(DOT)};  
}); 

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 3. EQUATION - contains statements which calculates the arithmentic input and returns the result

function equation(formula) {
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

EQUALS.addEventListener("click", () => {
    output.innerHTML= equation(output.innerHTML);
    if (output.innerHTML === "Infinity") { output.innerHTML = "ERROR PRESS C"}
    input.innerHTML = "0";
});