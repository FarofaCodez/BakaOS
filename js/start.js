const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
let startOpen = false;
startButton.addEventListener("mouseup", (event) => {
	startOpen = !startOpen;
	if(startOpen == true){
		startMenu.style.visibility = "visible";
		startMenu.innerHTML = "";
		for (let app in loadedApps) {
			let appData = loadedApps[app];

			let startLink = document.createElement("a");
			let startItem = document.createElement("img");
			startItem.src = `apps/${app}/icon.svg`;
			startItem.id = `${app}StartItem`;
			startItem.className = "startItem";
			startItem.width = 64;
			startItem.height = 64;
			startItem.title = appData.title;
			startItem.addEventListener("click", () => {
				openApp(app);
			})
			startMenu.appendChild(startItem);
		}
	}
	if(startOpen == false){
		startMenu.style.visibility = "hidden";
		startMenu.innerHTML = "";
	}
});