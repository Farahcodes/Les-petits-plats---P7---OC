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
// recipesTagFiltered:used to store the list of recipes that have been filtered by the tag filters
// recipesInputFiltered: used to store the list of recipes that have been filtered by the search input
// recipesFiltered: store the intersection of the two filtered lists
let recipesTagFiltered = recipes;
let recipesInputFiltered = recipesTagFiltered;
let recipesFiltered = recipesInputFiltered;

// Function that filters the recipes based on selected tags (ingredients, utensils, appliances) and returns the filtered list of recipes.
function recipesTagFilter() {
  // Filters for the cards
  let itemsFiltered = []; // initializing an empty array to hold the filtered recipes

  // loops through each recipe and checks whether the selected tags match the recipe's tags
  for (let i = 0; i < recipesTagFiltered.length; i++) {
    const item = recipesTagFiltered[i];

    let haveIngredients = true;
    // loops through each selected ingredient and checks whether it exists in the recipe's list of ingredients
    for (let j = 0; j < listOfIngredientsSelected.size; j++) {
      let haveIngredient = 0;
      for (let k = 0; k < item.ingredients.length; k++) {
        if (
          listOfIngredientsSelected.has(
            item.ingredients[k].ingredient.toLowerCase()
          )
        ) {
          haveIngredient++;
        }
      }
      // If all selected ingredients are found, haveIngredients remains true. Otherwise, it is set to false.
      haveIngredients =
        haveIngredient === listOfIngredientsSelected.size ? true : false;
    }

    let haveUtensils = true;
    //  loops through each selected utensil and checks whether it exists in the recipe's list of utensils
    for (let j = 0; j < listOfUtensilsSelected.size; j++) {
      let haveUtensil = 0;
      for (let k = 0; k < item.ustensils.length; k++) {
        if (listOfUtensilsSelected.has(item.ustensils[k].toLowerCase())) {
          haveUtensil++;
        }
      }
      // If all selected utensils are found, haveUtensils remains true. Otherwise, it is set to false.
      haveUtensils = haveUtensil === listOfUtensilsSelected.size ? true : false;
    }

    let haveAppliance = true;
    //  checks if there is a selected appliance, and if so, checks whether it matches the recipe's appliance.
    if (listOfAppliancesSelected.size > 0) {
      // If it does, haveAppliance remains true. Otherwise, it is set to false
      haveAppliance = listOfAppliancesSelected.has(
        item.appliance.toLowerCase()
      );
    }

    // If all selected tags are found in the recipe, it is added to itemsFiltered.
    if (haveIngredients && haveUtensils && haveAppliance) {
      itemsFiltered.push(item);
    }
  }

  // Dropdowns filters: filtering the dropdown lists based on the filtered recipes.
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
