const body = window.parent.document.body;
let bgImage = null;
const fileInput = document.getElementById("bgImageUpload");
fileInput.addEventListener("change", async (event) => {
	const file = event.target.files[0];
	if(!file) return;
	const reader = new FileReader();
	reader.addEventListener("load", (e) => {
		const img = new Image();
		img.src = e.target.result;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);

			const imageOutput = canvas.toDataURL("image/jpeg", 0.8);
			bgImage = imageOutput;
		}
	});
	reader.readAsDataURL(file);
});

function saveSettings(){
	localStorage.setItem("backgroundImage", bgImage);
	body.style.backgroundImage = `url("${bgImage}")`;
	console.log(bgImage);
}