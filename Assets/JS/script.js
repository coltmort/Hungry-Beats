
let edamamApiURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=61bbe3eb&app_key=8ee095c4c39545389e1a1212758a8ac8&imageSize=REGULAR&random=true&field=label&field=images&field=source&field=url&field=mealType'
let recievedRecipes = {}
let nextRecipeClickCounter = 0
let recipeTitle = document.querySelector('.recipe-name')
let recipeImage = document.querySelector('.recipe-image')



function getEdamamApi(){
    return new Promise(function(resolve, reject){
    fetch(edamamApiURL)
    .then(response => 
       response.json()
    .then(data => 
        resolve(recievedRecipes = data.hits)
       ))})
}

function displayRecipe() {
    nextRecipeClickCounter++
    recipe = recievedRecipes[nextRecipeClickCounter].recipe
    console.log(recipe)
    recipeImage.setAttribute('src', recipe.images.REGULAR.url)
    recipeTitle.innerText = recipe.label
    
}

getEdamamApi()
    .then(displayRecipe)

