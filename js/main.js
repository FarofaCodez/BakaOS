let installedApps = ["about", "settings", "video", "calculator"];
let loadedApps = {};

async function loadApps() {
	for (let index = 0; index < installedApps.length; index++) {
		const app = installedApps[index];
		const appPath = `apps/${app}`;
		try {
			const response = await fetch(`${appPath}/manifest.json`);
			let appManifest = {};
			if(response.ok){
				appManifest = await response.json();
			} else {
				continue;
			}

			loadedApps[app] = appManifest;
		} catch (error) {
			console.error("Fetch error:", error);
		}
	}
}

function loadSettings(){
	let bgImage = localStorage.getItem("backgroundImage");
	document.body.style.backgroundImage = `url("${bgImage}")`;
}

loadApps();
loadSettings();


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
	overlay.style.background = "rgba(0, 0, 0, 0)";
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