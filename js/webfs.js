let root = {
	"children": [],
	"name": "Root Directory",
	"type": "root"
};

let webfs = {};

webfs.createItem = (name, parent, type) => {
	let newItem = { name, parent, children: [], content: "", type};
	newItem.name = name;
	parent.children.push(newItem);
	return newItem;
};

webfs.save = () => {
	let result = Flatted.stringify(root);
	localStorage.setItem("webfs", result);
	console.log(root);
}
webfs.load = () => {
	let loadData = localStorage.getItem("webfs");
	if (loadData) {
		let parsed = Flatted.parse(loadData);
		Object.assign(root, parsed);
	}
	console.log(root);
}

webfs.load();