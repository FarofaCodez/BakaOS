let apps = ["about", "settings"];
let appNames = ["About", "Settings"];
let mouseDown = false;
addEventListener("mousedown", (event) => {
	mouseDown = true;
})
addEventListener("mouseup", (event) => {
	mouseDown = false;
})
if(apps.length != appNames.length){
	alert("apps array length does not match app names array length!");
	document.getElementById("html").innerHTML = "";
}
const appsDiv = document.getElementById("apps");
function openApp(appPath){
	startOpen = false;
	startMenu.style.visibility = "hidden";
	startMenu.innerHTML = "";
	let appFrame = document.createElement("div");
	fetch(`${appPath}/manifest.json`)
	.then((response) => response.json())
	.then((manifestJson) => {
		appFrame.style.width = manifestJson.width + "px";
		appFrame.style.height = manifestJson.height + "px";
		appFrame.style.position = "absolute";
		appFrame.id = manifestJson.windowId;
		appFrame.style.backgroundColor = "white";
		appsDiv.appendChild(appFrame);
	});
	fetch(`${appPath}/index.html`)
	.then((response) => response.text())
	.then((text) => {
		let titlebar = document.createElement("div");
		titlebar.style.backgroundColor = "lightblue";
		titlebar.style.width = "100%";
		titlebar.style.height = "32px";
		titlebar.addEventListener("mousemove", (event) => {
			if(mouseDown){
				appFrame.style.top = event.y - 16 + "px";
				appFrame.style.left = event.x - titlebar.clientWidth / 2 + "px";
			}
			console.log("mouse moved!", mouseDown)
		});
		appFrame.appendChild(titlebar);
		let appContent = document.createElement("div");
		appContent.innerHTML = text;
		appContent.style.position = "absolute";
		appFrame.appendChild(appContent);
		let closeButton = document.createElement("img");
		closeButton.className = "closeButton";
		closeButton.src = "img/close.png";
		closeButton.addEventListener("click", () => {
			appFrame.remove();
		});
		appFrame.appendChild(closeButton);
	});
}