// creating empty sets to store the selected ingredients, utensils, and appliances
let listOfIngredientsSelected = new Set();
let listOfUtensilsSelected = new Set();
let listOfAppliancesSelected = new Set();

// creating empty arrays to store the filtered lists of ingredients, utensils, and appliances for the tag filters
let listOfIngredientsFilteredTag = [];
let listOfUtensilsFilteredTag = [];
let listOfAppliancesFilteredTag = [];

// creating empty arrays to store the filtered lists of ingredients, utensils, and appliances for the input filters
let listOfIngredientsFilteredInput = [];
let listOfUtensilsFilteredInput = [];
let listOfAppliancesFilteredInput = [];

// Creating variables initially containing the full list of recipes

let recipesTagFiltered = recipes; //used to store the list of recipes that have been filtered by the tag filters
let recipesInputFiltered = recipesTagFiltered; //used to store the list of recipes that have been filtered by the search input
let recipesFiltered = recipesInputFiltered; // used to store the intersection of the two filtered lists (by tags and search input)

//Function that filters the recipes based on selected tags (ingredients, utensils, appliances) and returns the filtered list of recipes.
function recipesTagFilter() {
  // Filters for the cards
  let itemsFiltered = []; // all elements that pass the test function are added to this array

  itemsFiltered = recipesTagFiltered.filter(
    //checks if each recipe object in recipesTagFiltered matches the criteria specified by the filter conditions.
    (items) =>
      // checks if every selected ingredient matches at least one ingredient in the recipe
      [...listOfIngredientsSelected].every((ingredientSelected) =>
        items.ingredients.some(
          (item) => item.ingredient.toLowerCase() === ingredientSelected
        )
      ) &&
      // checks if every selected utensil matches at least one utensil in the recipe
      [...listOfUtensilsSelected].every((ustensilSelected) =>
        items.ustensils.some((item) => item.toLowerCase() === ustensilSelected)
      ) &&
      // checks if every selected appliance matches the appliance in the recipe
      [...listOfAppliancesSelected].every(
        (applianceSelected) =>
          items.appliance.toLowerCase() === applianceSelected
      )
  );

  // Filters for dropdowns
  [
    listOfIngredientsFilteredTag,
    listOfUtensilsFilteredTag,
    listOfAppliancesFilteredTag,
  ] = [...structureItems(itemsFiltered)];
  [
    listOfIngredientsFiltered,
    listOfUtensilsFiltered,
    listOfAppliancesFiltered,
  ] = [
    listOfIngredientsFilteredTag,
    listOfUtensilsFilteredTag,
    listOfAppliancesFilteredTag,
  ];

  return itemsFiltered;
}

async function recipesTagUpdate() {
  recipesTagFiltered = recipesTagFilter();
  recipesInputReload();
}

async function recipesTagReload() {
  recipesTagFiltered = recipes;
  recipesTagUpdate();
}

// Function that filters recipes based on a search input entered by the user
function recipesInputFilter() {
  // Getting the input value entered by the user
  const inputFilter = document
    .querySelector(".search input")
    .value.toLowerCase();

  let itemsFiltered = []; // Array to store the filtered recipes.

  if (inputFilter.length >= 3) {
    // Cards filters
    itemsFiltered = recipesInputFiltered.filter(
      (item) =>
        // checks if the recipe name or description includes the input value, or if any of the ingredients in the recipe include the inputFilter value
        item.name.toLowerCase().includes(inputFilter) ||
        item.ingredients.some((ingredientSelected) =>
          ingredientSelected.ingredient.includes(inputFilter)
        ) ||
        item.description.toLowerCase().includes(inputFilter)
    );

    // Dropdowns filters
    [
      listOfIngredientsFilteredInput,
      listOfUtensilsFilteredInput,
      listOfAppliancesFilteredInput,
    ] = [...structureItems(itemsFiltered)];
    [
      listOfIngredientsFiltered,
      listOfUtensilsFiltered,
      listOfAppliancesFiltered,
    ] = [
      listOfIngredientsFilteredInput,
      listOfUtensilsFilteredInput,
      listOfAppliancesFilteredInput,
    ];
  } else {
    // if the length if the user inputs is less than 3, returning the recipesTagFiltered that initially contains the full list of recipes
    itemsFiltered = recipesTagFiltered;
  }

  return itemsFiltered;
}

// Updating the list of filtered recipes based on the user's input in the search bar.
async function recipesInputUpdate() {
  recipesInputFiltered = recipesInputFilter();
  // updating recipesFiltered to match as this is the main list of recipes used to generate the cards in the page
  recipesFiltered = recipesInputFiltered;
  // Updating the lists of ingredients, appliances, and utensils that are displayed in the filter dropdown menus
  getDropdownsLists();
  // Re-rendering the recipe cards on the page to match the updated recipesFiltered list.
  reloadCards();
}

// Reset the list of filtered recipes back to the original list that is filtered by tags
async function recipesInputReload() {
  recipesInputFiltered = recipesTagFiltered;
  recipesInputUpdate();
}
