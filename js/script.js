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

// createCard factory
function createCard(recipe) {
  console.log("creating card for recipe", recipe);

  const card = document.createElement("article");
  card.classList.add("card");

  const placeholder = document.createElement("div");
  placeholder.classList.add("card-img-top");
  card.appendChild(placeholder);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const recipeHeader = document.createElement("div");
  recipeHeader.classList.add("recipeHeader");
  const recipeTitle = document.createElement("h2");
  recipeTitle.classList.add("recipeTitle");
  recipeTitle.textContent = recipe.name;
  recipeHeader.appendChild(recipeTitle);
  const recipeTime = document.createElement("span");
  recipeTime.classList.add("recipeTime");
  const recipeImg = document.createElement("img");
  recipeImg.src = "assets/icons/time.svg";
  recipeImg.alt = " ";
  recipeTime.appendChild(recipeImg);
  const recipeMinutes = document.createElement("span");
  recipeMinutes.classList.add("recipeMinutes");
  recipeMinutes.textContent = recipe.time + " min";
  recipeTime.appendChild(recipeMinutes);
  recipeHeader.appendChild(recipeTitle);
  cardBody.appendChild(recipeHeader);
  const recipeIngredients = document.createElement("ul");
  recipeIngredients.classList.add("recipeIngredients");
  recipe.ingredients.forEach((ingredient) => {
    const recipeIngredient = document.createElement("li");
    const recipeIngredientName = document.createElement("span");
    recipeIngredientName.classList.add("recipeIngredientName");
    recipeIngredientName.textContent = ingredient.ingredient + ": ";
    recipeIngredient.appendChild(recipeIngredientName);
    const recipeIngredientValue = document.createElement("span");
    recipeIngredientValue.classList.add("recipeIngredientValue");
    recipeIngredientValue.textContent = [
      ingredient.quantity,
      ingredient.unit,
    ].join(" ");
    recipeIngredient.appendChild(recipeIngredientValue);
    recipeIngredients.appendChild(recipeIngredient);
  });
  cardBody.appendChild(recipeIngredients);
  const recipePreparation = document.createElement("p");
  recipePreparation.classList.add("recipePreparation");
  recipePreparation.textContent = recipe.description;
  cardBody.appendChild(recipePreparation);
  card.appendChild(cardBody);
  return card;
}

function reloadCards() {
  document.querySelector("section").innerHTML = "";
  if (recipesFiltered != 0) {
    for (let i = 0; i < recipesFiltered.length; i++) {
      document
        .querySelector("section")
        .appendChild(createCard(recipesFiltered[i]));
    }
  } else {
    const h2 = document.createElement("h2");
    h2.classList.add("nothingAvailable");
    h2.textContent =
      "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    document.querySelector("section").appendChild(h2);
  }
}

async function init() {
  await structureData(recipes); // awaits the completion of the structureData() function, which is an asynchronous function that returns the unique lists of ingredients, utensils, and appliances from the recipes array.
  getDropdownsLists();
  reloadCards();
}

init();

let listOfIngredientsFiltered = listOfIngredients;
let listOfUtensilsFiltered = listOfUtensils;
let listOfAppliancesFiltered = listOfAppliances;

let listOfIngredientsFilteredSearch = listOfIngredientsFiltered;
let listOfAppliancesFilteredSearch = listOfAppliancesFiltered;
let listOfUtensilsFilteredSearch = listOfUtensilsFiltered;
