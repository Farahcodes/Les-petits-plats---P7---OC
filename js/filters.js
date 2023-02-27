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

// creating variables initially containing the full list of recipes
// recipesTagFiltered:used to store the list of recipes that have been filtered by the tag filters
//recipesInputFiltered: used to store the list of recipes that have been filtered by the search input
//recipesFiltered: store the intersection of the two filtered lists
let recipesTagFiltered = recipes;
let recipesInputFiltered = recipesTagFiltered;
let recipesFiltered = recipesInputFiltered;
