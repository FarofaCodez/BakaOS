let apps = ["about", "settings", "video"];
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

let mouseDown = false;
addEventListener("mousedown", () => {
	mouseDown = true;
})
addEventListener("mouseup", () => {
	mouseDown = false;
})

const appsDiv = document.getElementById("apps");