const appFrame = window.frameElement;
const titlebar = appFrame.parentElement.querySelector(".windowTitle");
titlebar.innerHTML = document.title;