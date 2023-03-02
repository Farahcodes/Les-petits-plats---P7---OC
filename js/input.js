let lastInput = ""; //variable used to store the previous value of the input field so that we can compare it to the current value and determine whether the input has changed.

function handleInput(event) {
  let input = event.currentTarget.value;
  if (input.includes(lastInput)) {
    // checks if the current input value includes the last input value === meaning if the input has not changed
    recipesInputUpdate();
  } else {
    // if the input has changed === updating the recipes
    recipesTagUpdate();
  }
  lastInput = input;
}
