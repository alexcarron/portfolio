const SECTION_IDS = [
	"home",
	"who_i_am",
	"experience",
	"skills",
	"my_game_shows",
	"more_ive_built",
	"contact"
];
const NAV_HEIGHT_OFFSET = 70;
const MENU_WIDTH = 220;

let scrolled = false;
let isMenuOpen = false;

function showMenu() {
	let menuButton = document.querySelector("#menu_button");
	let navLinksDiv = document.querySelector("div#nav_links");

	if (!isMenuOpen) {
		navLinksDiv.style.left = "0px";
		menuButton.style.transform = `translateX(${MENU_WIDTH}px)`;
		isMenuOpen = true;
	}
	else {
		navLinksDiv.style.left = `-${MENU_WIDTH + 25}px`;
		menuButton.style.transform = "translateX(0px)";
		isMenuOpen = false;
	}
}

const BOTTOM_OF_PAGE_THRESHOLD = 2;

function highlightCurrentSection(scrollPosition) {
	let currentSectionId = SECTION_IDS[0];

	for (let sectionId of SECTION_IDS) {
		let section = document.querySelector(`#${sectionId}`);
		if (!section) {
			continue;
		}

		let hasScrolledPastSectionTop = scrollPosition >= section.offsetTop - NAV_HEIGHT_OFFSET;
		if (hasScrolledPastSectionTop) {
			currentSectionId = sectionId;
		}
	}

	let hasReachedBottomOfPage = scrollPosition + window.innerHeight >= document.body.scrollHeight - BOTTOM_OF_PAGE_THRESHOLD;
	if (hasReachedBottomOfPage) {
		currentSectionId = SECTION_IDS[SECTION_IDS.length - 1];
	}

	for (let sectionId of SECTION_IDS) {
		let navLink = document.querySelector(`#nav_links a[href="#${sectionId}"]`);
		if (!navLink) {
			continue;
		}

		let isCurrentSection = sectionId === currentSectionId;
		navLink.classList.toggle("active_link", isCurrentSection);
	}
}

window.onscroll = function() {
	scrolled = true;
}

setInterval(
	function() {
		if (scrolled) {
			scrolled = false;
			highlightCurrentSection(window.pageYOffset);
		}
	},
	150
);

document.addEventListener("DOMContentLoaded", function() {
	highlightCurrentSection(window.pageYOffset);
});
