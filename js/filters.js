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
