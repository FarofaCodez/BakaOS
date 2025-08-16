const display = document.getElementById("display");
let currentStep = 1;
let step1 = "";
let step2 = "";
let result = 0;
let operator = "+";
for (let index = 0; index < 10; index++) {
	const element = document.getElementById(`button${index}`);
	element.addEventListener("click", () => {
		if(currentStep == 1){
			step1 += index.toString();
			display.innerHTML = step1;
		} else {
			step2 += index.toString();
			display.innerHTML = step2;
		}
	});
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
	alert("Result: " + result);
	step1 = "";
	step2 = "";
	operator = "+";
	display.innerHTML = "";
});

document.getElementById("buttonClear").addEventListener("click", () => {
	step1 = "";
	step2 = "";
	operator = "+";
	display.innerHTML = "";
});

document.getElementById("buttonBackspace").addEventListener("click", () => {
	if(currentStep == 1){
		step1 = step1.slice(0, step1.length - 1);
	} else {
		step2 = step2.slice(0, step2.length - 1);
	}
});

document.getElementById("nextStep").addEventListener("click", () => {
	operator = prompt("Operator");
	currentStep = 2;
	display.innerHTML = step2;
});