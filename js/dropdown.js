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

function dropdownResize() {
  const dropdown = document.querySelectorAll(".dropdown");

  for (let i = 0; i < dropdown.length; i++) {
    const dropdownOptions = dropdown.item(i).querySelector(".dropdownOptions");
    dropdownOptions.style.width = "";
    dropdownOptions.style.width = dropdownOptions.offsetWidth + "px"; // Empêche le décalage d'un pixel coupé
    dropdown[i].style.width = dropdownOptions.offsetWidth + "px";
  }
} //Adjusts the width of each dropdown menu based on the width of its contents to prevent a horizontal scroll bar from appearing.

function generateDropdownList(list) {
  const listItems = list.length / 3;
  const generatedList = document.createDocumentFragment();

  if (listItems != 0) {
    for (let i = 1; i < 4; i++) {
      let ul = document.createElement("ul");
      let currentListItems =
        i === 1
          ? Math.ceil(listItems)
          : i === 2
          ? Math.round(listItems)
          : Math.floor(listItems);

      for (
        let j = (i - 1) * currentListItems;
        j <= i * currentListItems - 1;
        j++
      ) {
        let li = document.createElement("li");
        li.setAttribute("onclick", "addDropdownFilter(event)");
        li.textContent = list[j];
        ul.appendChild(li);
      }

      generatedList.appendChild(ul);
    }
  } else {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.classList.add("nothingAvailable");
    li.textContent = "No available tag";
    ul.appendChild(li);
    generatedList.appendChild(ul);
  }

  setTimeout(() => dropdownResize(), 50);

  return generatedList;
} // creates the HTML for a list of tags to display in a dropdown menu based on a given array of tags. The tags are divided into three columns with roughly equal numbers of tags in each column.

function createDropdownFilterCard(text, type) {
  const filter = document.createElement("span");
  filter.classList.add("filter", type);
  filter.textContent = text[0].toUpperCase() + text.slice(1);
  filter.dataset.type = type;
  const img = document.createElement("img");
  img.src = "assets/icons/delete.svg";
  img.alt = "";
  img.setAttribute("onclick", "removeDropdownFilter(event)");
  filter.appendChild(img);
  return filter;
} // creates an HTML element for a tag that has been selected from a dropdown menu. The element includes the tag text, a class based on the tag type (ingredient, appliance, or utensil), and a delete button.

function addDropdownFilter(event) {
  const target = event.currentTarget;
  const text = target.textContent;
  const type = target.parentNode.parentNode.parentNode.dataset.type;
  const selectedFilters = document.querySelector(".filtersSelected");

  const listType =
    type === "ingredient"
      ? listOfIngredientsSelected
      : type === "appliance"
      ? listOfAppliancesSelected
      : type === "utensil"
      ? listOfUtensilsSelected
      : "";

  if (!listType.has(text)) {
    listType.add(text);
    selectedFilters.appendChild(createDropdownFilterCard(text, type));
    recipesTagUpdate();
  }

  if (
    listOfIngredientsSelected.size +
      listOfAppliancesSelected.size +
      listOfUtensilsSelected.size >
    0
  ) {
    selectedFilters.style.display = "flex";
  } else {
    selectedFilters.style.display = "";
  }
} // is called when a tag is selected from a dropdown menu. It adds the tag to the list of selected tags and calls recipesTagUpdate() to update the list of displayed recipes based on the new selection.

function addDropdownFilter(event) {
  const target = event.currentTarget;
  const text = target.textContent;
  const type = target.parentNode.parentNode.parentNode.dataset.type;
  const selectedFilters = document.querySelector(".filtersSelected");

  const listType =
    type === "ingredient"
      ? listOfIngredientsSelected
      : type === "appliance"
      ? listOfAppliancesSelected
      : type === "utensil"
      ? listOfUtensilsSelected
      : "";

  if (!listType.has(text)) {
    listType.add(text);
    selectedFilters.appendChild(createDropdownFilterCard(text, type));
    recipesTagUpdate();
  }

  if (
    listOfIngredientsSelected.size +
      listOfAppliancesSelected.size +
      listOfUtensilsSelected.size >
    0
  ) {
    selectedFilters.style.display = "flex";
  } else {
    selectedFilters.style.display = "";
  }
} // is called when a tag is selected from a dropdown menu. It adds the tag to the list of selected tags and calls recipesTagUpdate() to update the list of displayed recipes based on the new selection.

function removeDropdownFilter(event) {
  const target = event.currentTarget;
  const text =
    target.parentNode.textContent[0].toLowerCase() +
    target.parentNode.textContent.slice(1);
  const type = target.parentNode.dataset.type;
  const selectedFilters = document.querySelector(".filtersSelected");

  const listType =
    type === "ingredient"
      ? listOfIngredientsSelected
      : type === "appliance"
      ? listOfAppliancesSelected
      : type === "utensil"
      ? listOfUtensilsSelected
      : "";

  if (listType.has(text)) {
    listType.delete(text);
    target.parentNode.outerHTML = "";
    recipesTagReload();
  }

  if (
    listOfIngredientsSelected.size +
      listOfAppliancesSelected.size +
      listOfUtensilsSelected.size >
    0
  ) {
    selectedFilters.style.display = "flex";
  } else {
    selectedFilters.style.display = "";
  }
} // is called when a tag is removed from the list of selected tags. It removes the tag from the list and calls recipesTagReload() to reload the list of displayed recipes.

function getDropdownsLists() {
  const ingredients = document.querySelector(
    ".dropdown.ingredient .dropdownOptions"
  );
  const appliance = document.querySelector(
    ".dropdown.appliance .dropdownOptions"
  );
  const utensil = document.querySelector(".dropdown.utensil .dropdownOptions");

  ingredients.innerHTML = appliance.innerHTML = utensil.innerHTML = "";

  dropdownFilterInput();

  ingredients.appendChild(
    generateDropdownList(listOfIngredientsFilteredSearch)
  );
  appliance.appendChild(generateDropdownList(listOfAppliancesFilteredSearch));
  utensil.appendChild(generateDropdownList(listOfUtensilsFilteredSearch));
} // is called to generate the dropdown menus based on the current list of available tags.
