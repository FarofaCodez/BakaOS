const playerContainer = document.getElementById("player");
const fileInput = document.getElementById("fileUpload");
fileInput.addEventListener("change", async (event) => {
	const file = event.target.files[0];
	if(!file) return;
	const fileData = await file.arrayBuffer();
	const bytes = new Uint8Array(fileData);
	const blob = new Blob([bytes], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	playerContainer.innerHTML = "";
	let playerElement = document.createElement("video");
	playerElement.src = url;
	playerElement.controls = true;
	playerElement.style.maxWidth = "100%";
	playerElement.style.height = "auto";
	playerContainer.appendChild(playerElement);
});