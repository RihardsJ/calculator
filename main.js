let input = document.querySelector("#input");
let output = document.querySelector("#output");
let display = document.querySelector("#display");

const EQUALS = document.querySelector("#equals");
const ZERO = document.querySelector("#zero");
const DOT = document.querySelector("#dot");

const CLEAR = document.querySelector("#clear");
const BCKSP = document.querySelector("#backspace");

// const ONE = document.querySelector("#one");
// const TWO = document.querySelector("#two");
// const THREE = document.querySelector("#three");
// const FOUR = document.querySelector("#four");
// const FIVE = document.querySelector("#five");
// const SIX = document.querySelector("#six");
// const SEVEN = document.querySelector("#seven");
// const EIGTH = document.querySelector("#eight");
// const NINE = document.querySelector("#nine");

// const PLUSS = document.querySelector("#add");
// const MINUS = document.querySelector("#substract");
// const MULTI = document.querySelector("#multiply");
// const DIV = document.querySelector("#divide");

let num = document.querySelectorAll(".number");
let oper = document.querySelectorAll(".operator");


let inputString = "";
let formula = "";

let expression = element => {
    formula += element.value;
    output.innerHTML = formula;

    test(element)
    input.innerHTML = inputString;  
}

// resets the value of the function and both displays
let reset = () => {
    formula = inputString = "";
    input.innerHTML = "0";
    output.innerHTML = "00";
}



// click events
num.forEach( nr =>  nr.addEventListener("click", ()=>  expression(nr)) );
oper.forEach( op =>  op.addEventListener("click", ()=> expression(op)) );

CLEAR.addEventListener("click", () => reset());
 
 
