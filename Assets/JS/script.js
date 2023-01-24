let edamamApiURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=61bbe3eb&app_key=8ee095c4c39545389e1a1212758a8ac8&imageSize=REGULAR&random=true&field=label&field=images&field=source&field=url&field=mealType'
let recievedRecipes = {}
let nextRecipeClickCounter = 0

function getEdamamApi(){
    return new Promise(()=>
    fetch(edamamApiURL)
    .then((response)=> {
        console.log(response.status)
       response.json().then(function (data) {
            recievedRecipes = data.hits
            console.log(recievedRecipes)
       })}))
}


getEdamamApi().then(displayRecipe())

function displayRecipe() {
    nextRecipeClickCounter++
    console.log('display ' + recievedRecipes)
    let recipeImageURL = recievedRecipes[0].recipe.images.REGULAR.url
    console.log(recipeImageURL)

}
