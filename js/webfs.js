let root = {
	"children": [],
	"name": "Root Directory"
};

let webfs = {};

webfs.createItem = (name, parent, type) => {
	let newItem = { name, parent, children: [], content: "", type};
	newItem.name = name;
	parent.children.push(newItem);
	return newItem;
};