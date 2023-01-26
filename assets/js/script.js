
let edamamApiURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=61bbe3eb&app_key=8ee095c4c39545389e1a1212758a8ac8&imageSize=REGULAR&random=true&field=label&field=images&field=source&field=url&field=mealType'
let recievedRecipes = {}
let nextRecipeClickCounter = 0
let recipeTitle = document.querySelector('.recipe-name')
let recipeImage = document.querySelector('.recipe-image')
let nextRecipeButton = document.querySelector('.next-recipe-button')
let saveRecipeButton = document.querySelector('.save-recipe-button')
let cachedRecipes = []
let currentRecipe

nextRecipeButton.addEventListener('click', displayRecipe)
saveRecipeButton.addEventListener('click', saveCurrentRecipe)

const player = SC.Widget(document.querySelector('iframe'));
const volumeSlider = document.querySelector('.volume-slider');
const volumeDisplay = document.querySelector('.volume-display');

player.bind(SC.Widget.Events.READY, function() {
player.getVolume(function(volume) {
volumeSlider.value = volume;
volumeDisplay.innerText = volume + '%';
});
});

volumeSlider.addEventListener('input', function() {
player.setVolume(this.value);
volumeDisplay.innerText = this.value + '%';
});

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
    currentRecipe = recievedRecipes[nextRecipeClickCounter].recipe
    console.log(currentRecipe)
    recipeImage.setAttribute('src', currentRecipe.images.REGULAR.url)
    recipeTitle.innerText = currentRecipe.label
    
}

function saveCurrentRecipe(){
    cachedRecipes.unshift(currentRecipe)
    localStorage.setItem('cached-recipes', JSON.stringify(cachedRecipes))
}

getEdamamApi()
    .then(displayRecipe)

