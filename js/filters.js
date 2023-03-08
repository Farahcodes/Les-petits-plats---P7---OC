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
