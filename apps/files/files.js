let currentDirectory = root;

const container = document.getElementById("items");
const defaultContent = container.innerHTML;
document.getElementById("itemHovered").innerHTML = currentDirectory.name;
function listFiles(directory){
	container.innerHTML = defaultContent;
	for (let i = 0; i < directory.children.length; i++) {
		const element = directory.children[i];
		const elementEntry = document.createElement("img");
		elementEntry.width = 64;
		elementEntry.height = 64;

		let elementType = "folder";
		if(element.type === "file"){
			elementType = "file";
			elementEntry.src = "file.svg";
			elementEntry.onclick = () => {
				window.open(element.content);
			};
		} else {
			elementEntry.src = "folder.svg";
			elementEntry.onclick = () => {
				currentDirectory = element;
				listFiles(currentDirectory);
			};
		}
		elementEntry.oncontextmenu = (event) => {
			let oldMenu = window.parent.document.getElementById("contextMenu");
			if(oldMenu){
				oldMenu.remove();
			}
			event.preventDefault();
			let newMenu = document.createElement("div");
			let deleteButton = document.createElement("button");
			deleteButton.onclick = () => {
				currentDirectory.children = currentDirectory.children.filter(x => x !== element);
				elementEntry.remove();
				newMenu.remove();
				webfs.save();
			};
			deleteButton.innerHTML = "Delete";
			let cancelButton = document.createElement("button");
			cancelButton.onclick = () => {
				newMenu.remove();
			}
			cancelButton.innerHTML = "Cancel";
			newMenu.appendChild(deleteButton);
			newMenu.appendChild(document.createElement("br"));
			newMenu.appendChild(cancelButton);
			newMenu.style.position = "absolute";
			newMenu.id = "contextMenu";
			window.parent.document.body.appendChild(newMenu);
		};
		elementEntry.onmouseover = () => {
			document.getElementById("itemHovered").innerHTML = element.name;
		}
		elementEntry.onmouseleave = () => {
			document.getElementById("itemHovered").innerHTML = currentDirectory.name;
		};

		container.appendChild(elementEntry);
	}
	document.getElementById("itemHovered").innerHTML = currentDirectory.name;
	webfs.save();
}
listFiles(currentDirectory);
function newFolder(){
	const name = prompt("Folder name");
	if(name !== null){
		let folder = webfs.createItem(name, currentDirectory, "folder");
		folder.parent = currentDirectory;
	}
	listFiles(currentDirectory);
}
function upDirectory(){
	console.log(currentDirectory, root);
	if(currentDirectory.type != "root"){
		currentDirectory = currentDirectory.parent;
		listFiles(currentDirectory);
	}
}
function upload(){
	const input = document.createElement("input");
	input.type = "file";
	input.onchange = event => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = event => {
			console.log(event.target.result);
			const item = webfs.createItem(file.name, currentDirectory, "file");
			item.content = event.target.result;
			listFiles(currentDirectory);
		}
		reader.readAsDataURL(file);
	};
	input.click();
}