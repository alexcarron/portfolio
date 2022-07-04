let scrolled = false,
	isMenuOpen = false;
	
function showMenu() {
	let menu_button = document.querySelector("#menu_button"),
		nav_links_div = document.querySelector("div#nav_links");
	
	if (!isMenuOpen) {
		nav_links_div.style.left = 0;
		menu_button.style.transform = "translateX(100px)";
		isMenuOpen = true;
	} else {
		nav_links_div.style.left = "-150px";
		menu_button.style.transform = "translateX(0px)";
		isMenuOpen = false;
	}
}

function highlightCurrentSection(scroll_pos) {
	let about_section = document.querySelector("#about_section"),
		skill_section = document.querySelector("#skill_section"),
		projects_section = document.querySelector("#projects_section"),
		home_link = document.querySelector(`a[href="#home"]`),
		about_link = document.querySelector(`a[href="#about_section"]`),
		skills_link = document.querySelector(`a[href="#skill_section"]`),
		projects_link = document.querySelector(`a[href="#projects_section"]`),
		about_sect_pos = about_section.offsetTop - 70,
		skills_sect_pos = skill_section.offsetTop - 70,
		project_sect_pos = projects_section.offsetTop - 70,
		highlight_styles = `
			color: var(--tertiary-color);
			font-weight: bold;
		`,
		normal_styles = `
			color: var(--main-color);
			font-weight: normal;
		`;
	
	switch (true) {
		case scroll_pos >= project_sect_pos:
			projects_link.style = highlight_styles
			home_link.style = normal_styles
			about_link.style = normal_styles
			skills_link.style = normal_styles
			break;
			
		case scroll_pos >= skills_sect_pos && scroll_pos <= project_sect_pos:
			skills_link.style = highlight_styles
			home_link.style = normal_styles
			about_link.style = normal_styles
			projects_link.style = normal_styles
			break;
			
		case scroll_pos >= about_sect_pos && scroll_pos <= skills_sect_pos:
			about_link.style = highlight_styles
			home_link.style = normal_styles
			skills_link.style = normal_styles
			projects_link.style = normal_styles
			break;
		
		default:
			home_link.style = highlight_styles
			about_link.style = normal_styles
			skills_link.style = normal_styles
			projects_link.style = normal_styles
	}
}

window.onscroll = function() {
  scrolled = true;
}

setInterval(
	function(){
		if (scrolled) {
			scrolled = false;
			highlightCurrentSection(window.pageYOffset);
		}
	}, 
	150
);