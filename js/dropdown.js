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
