
let edamamApiURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=61bbe3eb&app_key=8ee095c4c39545389e1a1212758a8ac8&imageSize=REGULAR&random=true&field=label&field=images&field=source&field=url&field=mealType'
let recievedRecipes = {}
let recipeTitle = document.querySelector('.recipe-name')
let recipeImage = document.querySelector('.recipe-image')
let imageLink = document.querySelectorAll(".imageLink")
let nextRecipeButton = document.querySelector('.next-recipe-button')
let saveRecipeButton = document.querySelector('.save-recipe-button')
let applyFilterButton = document.getElementById("filter-apply")
let cachedRecipes = []
let currentRecipe
let nextRecipeClickCounter

nextRecipeButton.addEventListener('click', displayRecipe)
saveRecipeButton.addEventListener('click', saveCurrentRecipe)
applyFilterButton.addEventListener("click",()=>{
    getEdamamApi()
        .then(displayRecipe)
})

const player = SC.Widget(document.querySelector('iframe'));
const volumeSlider = document.querySelector('.volume-slider'); // Select the volume slider element from the HTML
const volumeDisplay = document.querySelector('.volume-display'); // Select the element that displays the current volume level

player.bind(SC.Widget.Events.READY, function() {
    player.getVolume(function(volume) {
        volumeSlider.value = volume; // Sets the volume slider's value to the current volume level
        volumeDisplay.innerText = volume + '%'; // Updates the volume display to show the current volume level
    });
});

// Adds event listener to the volume slider to change the volume when the user moves the slider
volumeSlider.addEventListener('input', function() {
    player.setVolume(this.value); // Sets the volume of the player to the value of the slider
    volumeDisplay.innerText = this.value + '%'; // Updates the volume display to show the new volume level
});

function getEdamamApi(){
    nextRecipeClickCounter = 0
    let checknuts = document.getElementById('check-nuts')
    let checkmilk = document.getElementById('check-milk')
    let checkgluten = document.getElementById('check-gluten')
    let checksoy = document.getElementById('check-soy')
    if (checknuts.checked == true) edamamApiURL += "&health=tree-nut-free"
    if (checkmilk.checked == true) edamamApiURL += "&health=dairy-free"
    if (checkgluten.checked == true) edamamApiURL += "&health=gluten-free"
    if (checksoy.checked == true) edamamApiURL += "&health=soy-free"

    return new Promise(function(resolve, reject){
    fetch(edamamApiURL)
    .then(response => 
       response.json()
    .then(data => 
        resolve(recievedRecipes = data.hits)
       ))})
}

function displayRecipe() {
    if (nextRecipeClickCounter+1 == recievedRecipes.length){
        getEdamamApi()
    }
    currentRecipe = recievedRecipes[nextRecipeClickCounter].recipe
    console.log(currentRecipe)
    recipeImage.setAttribute('src', currentRecipe.images.REGULAR.url)
    imageLink.forEach(e => {
        e.setAttribute('href', currentRecipe.url)
    })
    recipeTitle.innerText = currentRecipe.label
    nextRecipeClickCounter++
}

function saveCurrentRecipe() {
    cachedRecipes.unshift(currentRecipe)
    localStorage.setItem('cached-recipes', JSON.stringify(cachedRecipes))
}

getEdamamApi()
    .then(displayRecipe)

