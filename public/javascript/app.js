// Create random questions without repeat
function randomNoRepeats(array) {
  let copy = array.slice(0);
  return function() {
  if (copy.length < 1) { 
  copy = array.slice(0); 
}
  let index = Math.floor(Math.random() * copy.length);
  let item = copy[index];
  copy.splice(index, 1);
  return item;
  };
}

// Random Recipe

//DOM
const randomRecipe = document.querySelector('.random-recipe')

let recipeName = recipes.forEach(recipe => {
  recipeName = recipe
});

randomRecipe.addEventListener('click', function(){
  randomNoRepeats(recipeName)
});

