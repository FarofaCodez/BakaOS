function openApp(app){
	const appPath = `apps/${app}`;
	startOpen = false;
	startMenu.style.visibility = "hidden";
	startMenu.innerHTML = "";
	let appManifest = loadedApps[app];

	let appWindow = document.createElement("div");

	appWindow.style.width = appManifest.width + "px";
	appWindow.style.height = appManifest.height + 32 + "px";
	appWindow.style.position = "absolute";
	appWindow.id = appManifest.windowId;
	appWindow.style.backgroundColor = "white";
	appsDiv.appendChild(appWindow);

	// titlebar
	let titlebar = document.createElement("div");
	titlebar.style.backgroundColor = "lightblue";
	titlebar.style.width = "100%";
	titlebar.style.height = "32px";
	titlebar.style.alignContent = "center";
	titlebar.style.userSelect = "none";
	titlebar.className = "titlebar";
	titlebar.addEventListener("mousedown", () => {
		createOverlay();
		lastWindow = appWindow;
	});
	appWindow.appendChild(titlebar);

	// appFrame
	let appFrame = document.createElement("iframe");
	appFrame.src = appPath;
	appFrame.style.position = "absolute";
	appFrame.style.border = "none"
	appFrame.style.width = "100%";
	appFrame.style.height = "100%";
	appWindow.appendChild(appFrame);
	let appContent = null;

	appFrame.addEventListener("load", () => {
		appContent = appFrame.contentDocument;
		let apiScript = document.createElement("script");
		apiScript.src = "../../js/api.js";
		appContent.head.appendChild(apiScript);
	});

	// closeButton
	let closeButton = document.createElement("img");
	closeButton.className = "closeButton";
	closeButton.src = "img/close.png";
	closeButton.addEventListener("click", () => {
		appWindow.remove();
	});
	appWindow.appendChild(closeButton);
}

function updateAppWindow(){
	const appFrame = window.frameElement;
	const titlebar = appFrame.parentElement.querySelector("div");
	titlebar.innerHTML = document.title;
}

if(location.pathname != "/"){
	updateAppWindow();
}