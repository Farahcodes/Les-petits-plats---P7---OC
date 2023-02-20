document.querySelector("body").ondragstart = () => {
  return false;
}; // Prevents images from being dragged on the web page.

function dropdownOpen(dropdown) {
  if (!dropdown.classList.contains("dropdownOpen")) {
    dropdownClose();
    dropdown.classList.add("dropdownOpen");
    dropdownResize();
  }
} // Opens a given dropdown menu by adding the class "dropdownOpen" to it and calling dropdownResize() to adjust its size.

function dropdownToggle(dropdown) {
  if (!dropdown.classList.contains("dropdownOpen")) {
    dropdownClose();
    dropdown.classList.add("dropdownOpen");
    dropdownResize();
  } else {
    dropdownClose();
  }
} //  Toggles the open/closed state of a given dropdown menu. If the menu is closed, it opens it by calling dropdownOpen(). If it is open, it closes it by calling dropdownClose()

function dropdownClose() {
  const dropdownCurrentlyOpen = document.querySelectorAll(".dropdownOpen");

  for (let i = 0; i < dropdownCurrentlyOpen.length; i++) {
    dropdownCurrentlyOpen[i].classList.remove("dropdownOpen");
    dropdownCurrentlyOpen[i].style.width = "";
  }
} //Closes any currently open dropdown menus by removing the "dropdownOpen" class and resetting their width.
