// for easy future referencing
const canvas = document.querySelector(".product-slide");
const context = canvas.getContext("2d");
const frameCount = 108;

// Stores the images in an array for fast access
const images = [];
const imgPath = () => {
	return screen.availWidth > 800
		? "short_desktop_img_sequence"
		: "short_mobile_img_sequence";
};

// Takes index of img as parameter, returns src of img
const currentFrame = (index) =>
	`assets/${imgPath()}/${index.toString().padStart(4, "0")}.webp`;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const wrapper = document.querySelector(".canvas-wrapper");
const canvasPos = wrapper.getBoundingClientRect().top;

const renderImg = (index = 0) => {
	requestAnimationFrame(() => updateImage(index));
};

preloadImages();

let img = new Image();

// Responsible for initial load
img.onload = () => {
	renderImg();
};

// Set source to 1st frame
img.src = currentFrame(0);

let scale, centerShift_x, centerShift_y;

// Calculate scale and img draw position
const updateScaling = () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	scale = Math.max(canvas.width / img.width, canvas.height / img.height);
	centerShift_x = (canvas.width - img.width * scale) / 2;
	centerShift_y = (canvas.height - img.height * scale) / 2;
};

updateScaling();

// Updates img path and draws updated image
const updateImage = (index = 0) => {
	const photo = images[index];
	context.drawImage(
		photo,
		0,
		0,
		photo.width,
		photo.height,
		centerShift_x,
		centerShift_y,
		photo.width * scale,
		photo.height * scale
	);
};

const getFrameIndex = () => {
	// Get size and position of canvas wrapper
	const sizes = wrapper.getBoundingClientRect();
	const scrollFraction = Math.max(
		0,
		(window.pageYOffset - canvasPos) / sizes.height
	);

	// Calculate frame index based on scroll position
	const frameIndex = Math.min(
		frameCount - 1,
		Math.floor(scrollFraction * frameCount)
	);
	return frameIndex;
};

addEventListener("scroll", () => {
	renderImg(getFrameIndex());
});

addEventListener("resize", () => {
	updateScaling();
	renderImg(getFrameIndex());
});

// Loads images into memory for faster access
const preloadImages = () => {
	for (let i = 0; i < frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i);
		images[i] = img;
	}
};
