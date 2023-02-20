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
