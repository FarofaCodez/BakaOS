const appFrame = window.frameElement;
const titlebar = appFrame.parentElement.querySelector("div");
titlebar.innerHTML = document.title;