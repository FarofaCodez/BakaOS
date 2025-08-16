function openApp(app){
	const appPath = `apps/${app}`;
	startOpen = false;
	startMenu.style.visibility = "hidden";
	startMenu.innerHTML = "";
	let appWindow = document.createElement("div");
	fetch(`${appPath}/manifest.json`)
	.then((response) => response.json())
	.then((appManifest) => {
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
		titlebar.addEventListener("mousemove", (event) => {
			if(mouseDown){
				appWindow.style.top = event.y - 16 + "px";
				appWindow.style.left = event.x - titlebar.clientWidth / 2 + "px";
			}
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

		let appContent = appFrame.contentDocument;

		// closeButton
		let closeButton = document.createElement("img");
		closeButton.className = "closeButton";
		closeButton.src = "img/close.png";
		closeButton.addEventListener("click", () => {
			appWindow.remove();
		});
		appWindow.appendChild(closeButton);
		
	});
}