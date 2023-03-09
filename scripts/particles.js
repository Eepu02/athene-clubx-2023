function createParticles() {
	const particle = document.createElement("div");
	particle.classList.add("particle");
	particle.style.left = Math.random() * 100 + "vw";
	particle.style.top = Math.random() * 100 + "vh";

	const page = document.getElementById("page");

	page.appendChild(particle);

	setTimeout(() => {
		particle.remove();
	}, 10);
}

// setInterval(createSnow, 100);

// setInterval(() => {
//   createParticles();

// }, 10);
