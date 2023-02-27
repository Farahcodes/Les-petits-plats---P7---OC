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

// The recipesTagUpdate() function is called whenever a tag is selected or deselected, and it updates the recipesTagFiltered array by calling recipesTagFilter(), and then calls the recipesInputReload() function to update the recipe cards based on the filtered recipes.
function recipesTagUpdate() {
  recipesTagFiltered = recipesTagFilter();
  recipesInputReload();
}

// The recipesTagReload() function is called whenever all tags are cleared, and it resets the recipesTagFiltered array to be a copy of the original recipes array. It then calls recipesTagUpdate() to update the recipe cards with the unfiltered recipes.
function recipesTagReload() {
  recipesTagFiltered = recipes;
  recipesTagUpdate();
}

// recipesInputFilter is a function that is responsible for filtering the recipe cards based on the search input.
function recipesInputFilter() {
  // getting the value of the search input field and converts it to lowercase using the toLowerCase() method.
  const inputFilter = document
    .querySelector(".search input")
    .value.toLowerCase();

  // initializeing an empty array itemsFiltered that will store the filtered recipe cards.
  let itemsFiltered = [];

  // checking if the length of the search input is greater than or equal to 3 characters.
  if (inputFilter.length >= 3) {
    //If the length of the search input is greater than or equal to 3, it loops through the recipesInputFiltered array, which contains the recipes that have already been filtered by the tags, and checks whether the search input matches any part of the recipe card.
    for (let i = 0; i < recipesInputFiltered.length; i++) {
      const item = recipesInputFiltered[i];

      const isFilterInName = item.name.toLowerCase().includes(inputFilter);
      let isFilterInIngredients = false;
      for (let j = 0; j < item.ingredients.length; j++) {
        if (item.ingredients[j].ingredient.includes(inputFilter)) {
          isFilterInIngredients = true;
        }
      }
      const isFilterInDescription = item.description
        .toLowerCase()
        .includes(inputFilter);

      // If the search term is found in the recipe, add it to the filtered array.
      if (isFilterInName || isFilterInIngredients || isFilterInDescription) {
        itemsFiltered.push(item);
      }
    }

    // Updating the filtered dropdowns lists based on the filtered recipe cards and calls the getDropdownsLists function to update the dropdowns
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

    getDropdownsLists();
  } else {
    // If the search input is not long enough, it simply copies the recipesTagFiltered array (which contains the recipes filtered by tags) into itemsFiltered.
    itemsFiltered = recipesTagFiltered;
  }
  // returns the itemsFiltered array, which contains the filtered recipe cards based on the search input.
  return itemsFiltered;
}

// Updates the filtered recipe list by calling the recipesInputFilter() function to apply the search input filter. Then, it updates the recipesFiltered array and re-generates the dropdown lists using the getDropdownsLists() function. Finally, it calls the reloadCards() function to display the updated recipe cards.
function recipesInputUpdate() {
  recipesInputFiltered = recipesInputFilter();
  recipesFiltered = recipesInputFiltered;
  getDropdownsLists();
  reloadCards();
}

// Reloads the filtered recipe list with the original list filtered by tags, stored in the recipesTagFiltered array. It then calls recipesInputUpdate() to update the displayed cards with the original list.
function recipesInputReload() {
  recipesInputFiltered = recipesTagFiltered;
  recipesInputUpdate();
}
