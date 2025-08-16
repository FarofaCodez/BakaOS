let apps = ["about", "settings", "video", "calculator"];
let appNames = [];

for (let index = 0; index < apps.length; index++) {
	const app = apps[index];
	const appPath = `apps/${app}`;
	fetch(`${appPath}/manifest.json`)
	.then((response) => response.json())
	.then((appManifest) => {
		appNames[index] = appManifest.title;
	});
}
const appsDiv = document.getElementById("apps");
let overlay = null;
function createOverlay(){
	overlay = document.createElement("div");
	overlay.style.position = "fixed";
	overlay.style.top = 0;
	overlay.style.left = 0;
	overlay.style.width = "100%";
	overlay.style.height = "100%";
	overlay.style.cursor = "move";
	overlay.style.zIndex = 999999;
	overlay.style.background = "rgba(0, 0, 0, 0.01)";
	document.body.appendChild(overlay);
}
let lastWindow = null;
addEventListener("mouseup", () => {
	lastWindow = null;
	if(overlay){
		overlay.remove();
		overlay = null;
	}
});
document.addEventListener("mousemove", (event) => {
	if(lastWindow != null) {
		lastWindow.style.top = event.y - 16 + "px";
		lastWindow.style.left = event.x - lastWindow.querySelector(".titlebar").clientWidth / 2 + "px";
	}
});