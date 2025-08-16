const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
let startOpen = false;
startButton.addEventListener("mouseup", (event) => {
	startOpen = !startOpen;
	if(startOpen == true){
		startMenu.style.visibility = "visible";
		startMenu.innerHTML = "";
		for (let app in loadedApps) {
			let startLink = document.createElement("a");
			let startItem = document.createElement("img");
			startItem.src = `apps/${app}/icon.svg`;
			startItem.id = `${app}StartItem`;
			startItem.className = "startItem";
			startItem.width = 64;
			startItem.height = 64;
			startItem.title = app.title;
			startLink.appendChild(startItem);
			startLink.href = `javascript:openApp("${app}")`;
			startMenu.appendChild(startLink);
		}
	}
	if(startOpen == false){
		startMenu.style.visibility = "hidden";
		startMenu.innerHTML = "";
	}
});