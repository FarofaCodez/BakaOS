const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
let startOpen = false;
startButton.addEventListener("mouseup", (event) => {
	startOpen = !startOpen;
	if(startOpen == true){
		startMenu.style.visibility = "visible";
		startMenu.innerHTML = "";
		for (let i = 0; i < apps.length; i++) {
			const element = apps[i];
			let startLink = document.createElement("a");
			let startItem = document.createElement("img");
			startItem.src = `apps/${element}/icon.svg`;
			startItem.id = `${element}StartItem`;
			startItem.className = "startItem";
			startItem.width = 64;
			startItem.height = 64;
			startItem.title = appNames[i];
			startLink.appendChild(startItem);
			startLink.href = `javascript:openApp("${element}")`;
			startMenu.appendChild(startLink);
		}
	}
	if(startOpen == false){
		startMenu.style.visibility = "hidden";
		startMenu.innerHTML = "";
	}
});