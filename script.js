const routes = ["about", "home", "projects", "certificates"];
const content = document.getElementById("content");

function MenuButtonClick(event) {
	event.preventDefault();
	const route = event.target.getAttribute('href').substring(1);
	loadContent(route);
}

function loadContent(route) {
	const template = document.getElementById(`template-${route}`);

	if (template) {
		content.innerHTML = "";

		const wrapper = document.createElement("div");
		wrapper.classList.add("slide-in");

		wrapper.appendChild(template.content.cloneNode(true));
		content.appendChild(wrapper);

		document.getElementsByTagName("main")[0].classList.remove("hidden");
		document.getElementsByTagName("aside")[0].removeAttribute("style");
		updateActiveLink(route);

		setTimeout(() => {
			wrapper.classList.remove("slide-in");
			wrapper.classList.add("slide-active");
		}, 50);
	} else if (route === "about") {
		const about = document.getElementsByTagName("aside")[0];
		about.style.display = "flex";
		about.style.width = "100vw";
		about.style.maxWidth = "740px";
		document.getElementsByTagName("main")[0].classList.add("hidden");
	} else {
		console.error("Template not found for route:", route);
	}
}


function updateActiveLink(route) {
	routes.forEach((r) => {
		const link = document.getElementById(r);
		if (link) {
			link.classList.toggle("active", r === route);
		}
	});
}

document.getElementById("about-back").addEventListener("click", () => {
	loadContent("home");
});

const nav = document.getElementsByTagName("nav")[0];
for (let i = 0; i < nav.children.length; i++) {
	nav.children[i].addEventListener("click", MenuButtonClick);
}


window.addEventListener("hashchange", () => {
	navigate(window.location.hash.substring(1));
});

window.addEventListener("load", () => {
	navigate("home");
});

function navigate(route) {
	const routeIndex = routes.indexOf(route);
	if (routeIndex !== -1) {
		loadContent(route);
	} else {
		console.error("Invalid route:", route);
		loadContent("home");
	}
}
