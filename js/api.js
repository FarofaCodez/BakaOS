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
	appsDiv.appendChild(appWindow);

	// titlebar
	let titlebar = document.createElement("div");
	titlebar.style.backgroundColor = "#eff0f1";
	titlebar.style.width = "100%";
	titlebar.style.height = "32px";
	titlebar.style.userSelect = "none";
	titlebar.style.alignContent = "center";
	titlebar.style.borderTopLeftRadius = "10px";
	titlebar.style.borderTopRightRadius = "10px";
	titlebar.className = "titlebar";
	titlebar.addEventListener("mousedown", () => {
		createOverlay();
		lastWindow = appWindow;
	});
	appWindow.appendChild(titlebar);

	// windowTitle
	let windowTitle = document.createElement("div");
	windowTitle.style.textAlign = "center";
	windowTitle.className = "windowTitle";
	titlebar.appendChild(windowTitle);

	// appFrame
	let appFrame = document.createElement("iframe");
	appFrame.src = appPath;
	appFrame.style.position = "absolute";
	appFrame.style.border = "none"
	appFrame.style.width = "100%";
	appFrame.style.height = "100%";
	appFrame.style.backgroundColor = "white";
	appWindow.appendChild(appFrame);
	let appContent = null;

	appFrame.addEventListener("load", () => {
		appContent = appFrame.contentDocument;
		let apiScript = document.createElement("script");
		apiScript.src = "../../js/api.js";
		let initScript = document.createElement("script");
		initScript.src = "../../js/init.js";
		appContent.head.appendChild(apiScript);
		appContent.head.appendChild(initScript);
	});

	// closeButton
	let closeButton = document.createElement("img");
	closeButton.className = "closeButton";
	closeButton.src = "img/close.svg";
	closeButton.addEventListener("click", () => {
		appWindow.remove();
	});
	appWindow.appendChild(closeButton);
}

function uploadFile(){
}