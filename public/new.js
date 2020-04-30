
console.log('here');
const ingredients = document.querySelector('.ingredients');
const direction = document.querySelector('.directions')

document.querySelector('.new-ingredient-btn').addEventListener('click',(eve)=>{

    eve.preventDefault();
    const newIngredent  = document.createElement("textArea");

    newIngredent.className = 'new-ingredient';
    newIngredent.setAttribute('rows', 1);
    newIngredent.setAttribute('cols', 25);
    newIngredent.setAttribute('cols', 25);
    newIngredent.setAttribute('id','ingredients' );
    newIngredent.setAttribute('name',  "ingredients")

    ingredients.appendChild(newIngredent);

    console.log('lciked');
   
})

document.querySelector('.new-direction-btn').addEventListener('click',(e)=>{

    e.preventDefault();

    console.log('herer')
    const newDierection = document.createElement('textarea');

    newDierection.className = 'new-direction';
    newDierection.setAttribute('rows', 5);
    newDierection.setAttribute('cols', 50);
    newDierection.setAttribute('id','direction' );    
    newDierection.setAttribute('name',  "direction");
    direction.appendChild(newDierection);
})
