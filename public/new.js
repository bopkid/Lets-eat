
console.log('here');
const ingredients = document.querySelector('.ingredients');
const dierections = document.querySelector('.dierections')

document.querySelector('.new-ingredient-btn').addEventListener('click',(eve)=>{
    eve.preventDefault();
    const newIngredent  = document.createElement("textArea");
    newIngredent.className = 'new-ingredient';
    newIngredent.setAttribute('rows', 1)
    newIngredent.setAttribute('cols', 25)
    ingredients.appendChild(newIngredent);

    console.log('lciked');
   
})

document.querySelector('.new-dierections-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('herer')
    const newDierection = document.createElement('textarea');

    newDierection.className = 'new-dierections';
    newDierection.setAttribute('rows', 5);
    newDierection.setAttribute('cols', 70);
    dierections.appendChild(newDierection);
})
