const numberDisplay = document.getElementById("number");
const operationDispaly = document.getElementById("operation");
let currentStep = 1;
let step1 = "";
let step2 = "";
let result = 0;
let operator = "+";
function switchButton(buttonId, state){
	if(state == false){
		document.getElementById(buttonId).setAttribute("disabled", "");
	} else if (state == true) {
		document.getElementById(buttonId).removeAttribute("disabled");
	}
}
function updateDisplay(){
	if(currentStep == 1){
		operationDispaly.innerHTML = "";
		numberDisplay.innerHTML = step1;
	} else {
		operationDispaly.innerHTML = operator;
		if (operator == "-" && step2.startsWith("-")) {
			numberDisplay.innerHTML = `(${step2})`;
		} else {
			numberDisplay.innerHTML = step2;
		}
	}
	switchButton("minusButton", !(step2.length > 0));
	if(currentStep == 1){
		switchButton("dotButton", !step1.includes("."));
	} else {
		switchButton("dotButton", !step2.includes("."));
	}
}
for (let index = 0; index < 10; index++) {
	const element = document.getElementById(`button${index}`);
	element.addEventListener("click", () => {
		if(currentStep == 1){
			step1 += index.toString();
		} else {
			step2 += index.toString();
		}
		updateDisplay();
	});
}

function nextStep(){
	currentStep = 2;
	updateDisplay();
}


document.getElementById("buttonEquals").addEventListener("click", () => {
	if(operator == "+"){
		result = Number(step1) + Number(step2);
	} else if (operator == "-"){
		result = Number(step1) - Number(step2);
	} else if (operator == "*"){
		result = Number(step1) * Number(step2);
	} else if (operator == "/"){
		result = Number(step1) / Number(step2);
	}
	result = Number(result.toFixed(5)).toString();
	currentStep = 1;
	step1 = "";
	step2 = "";
	operator = "+";
	updateDisplay();
	operationDispaly.innerHTML = "";
	numberDisplay.innerHTML = result;
});

document.getElementById("buttonClear").addEventListener("click", () => {
	currentStep = 1;
	step1 = "";
	step2 = "";
	operator = "+";
	updateDisplay();
});

document.getElementById("buttonBackspace").addEventListener("click", () => {
	if(currentStep == 1){
		step1 = step1.slice(0, step1.length - 1);
	} else {
		step2 = step2.slice(0, step2.length - 1);
	}
	updateDisplay();
});

document.getElementById("plusButton").addEventListener("click", () => {
	operator = "+";
	nextStep();
});
document.getElementById("minusButton").addEventListener("click", () => {
	if(currentStep == 1){
		if(step1.length == 0){
			step1+="-";
		} else {
			operator = "-";
			nextStep();
		}
	} else {
		if(step2.length == 0){
			step2+="-";
		}
	}
	updateDisplay();
});
document.getElementById("multiplyButton").addEventListener("click", () => {
	operator = "*";
	nextStep();
});
document.getElementById("divideButton").addEventListener("click", () => {
	operator = "/";
	nextStep();
});
document.getElementById("dotButton").addEventListener("click", () => {
	if(currentStep == 1){
		if(step1.includes(".") == false){
			step1 += ".";
		}
	} else {
		if(step2.includes(".") == false){
			step2 += ".";
		}
	}
	updateDisplay();
});