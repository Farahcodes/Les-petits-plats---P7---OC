// Defining three empty arrays named listOfIngredients, listOfUtensils, and listOfAppliances
let listOfIngredients = [];
let listOfUtensils = [];
let listOfAppliances = [];

// Function to structure the data: assigns the values returned by the structureItems function
// to the variables  listOfIngredients, listOfUtensils, and listOfAppliances
async function structureData(recipes) {
  [listOfIngredients, listOfUtensils, listOfAppliances] = [
    ...structureItems(recipes), // returns an array of three arrays (containing the unique values for ingredients, utensils, and appliances in the recipe data)
  ]; // using array destructuring so that the elements of each of the nested arrays are unpacked and assigned to their respective variables
}

// function to structure the items
function structureItems(recipes) {
  // Initializing three empty sets: The Set data structure is a built-in object in JavaScript that allows us to store a collection of unique values.
  let setOfIngredients = new Set();
  let setOfUtensils = new Set();
  let setOfAppliances = new Set();

  recipes.forEach((recipe) => {
    setOfAppliances.add(recipe.appliance.toLowerCase()); // using toLowerCase() method to ensure that any duplicates are correctly identified and only a single instance of each unique value is stored in the corresponding Set.
    recipe.ingredients.forEach((ingredient) => {
      setOfIngredients.add(ingredient.ingredient.toLowerCase());
    });
    recipe.ustensils.forEach((utensil) => {
      setOfUtensils.add(utensil.toLowerCase());
    });
  });
  // returns an array of three arrays (containing the unique values for ingredients, utensils, and appliances in the recipe data)
  return [[...setOfIngredients], [...setOfUtensils], [...setOfAppliances]];
}

async function init() {
  await structureData(recipes); // awaits the completion of the structureData() function, which is an asynchronous function that returns the unique lists of ingredients, utensils, and appliances from the recipes array.
}

init();
