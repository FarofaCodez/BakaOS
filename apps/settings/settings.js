function rgbToHex(rgb) {
	const result = rgb.match(/\d+/g);
	if (!result) return "#000000";
	return "#" + result.map(x => {
		const hex = parseInt(x).toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}).join("");
}

const body = window.parent.document.body;
const bgColor = window.getComputedStyle(body).backgroundColor;
document.getElementById("colorInput").value = rgbToHex(bgColor);

function saveSettings(){
	localStorage.setItem("backgroundColor", document.getElementById("colorInput").value);
	body.style.backgroundColor = document.getElementById("colorInput").value;
}