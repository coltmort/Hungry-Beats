
let edamamApiURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=61bbe3eb&app_key=8ee095c4c39545389e1a1212758a8ac8&imageSize=REGULAR&random=true&field=label&field=images&field=source&field=url&field=mealType'
let recievedRecipes = {}
let nextRecipeClickCounter = 0
let recipeTitle = document.querySelector('.recipe-name')
let recipeImage = document.querySelector('.recipe-image')
let imageLink = document.querySelectorAll(".imageLink")
let nextRecipeButton = document.querySelector('.next-recipe-button')
let saveRecipeButton = document.querySelector('.save-recipe-button')
let savedRecipeContainer = document.querySelector('.saved-recipe-container')
let cachedRecipes = []
let currentRecipe

nextRecipeButton.addEventListener('click', displayRecipe)
saveRecipeButton.addEventListener('click', saveCurrentRecipe)

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
    imageLink.forEach(e => {
        e.setAttribute('href', currentRecipe.url)
    })
    recipeTitle.innerText = currentRecipe.label

}

function saveCurrentRecipe() {
    cachedRecipes.unshift(currentRecipe)
    localStorage.setItem('cached-recipes', JSON.stringify(cachedRecipes))
    displayCachedRecipes()
}

function refreshCachedRecipes(){
    cachedRecipes = localStorage.getItem('cached-recipes')
}

function displayCachedRecipes(){
    refreshCachedRecipes()
    var parsed = JSON.parse(cachedRecipes)
    console.log('parsed ' + parsed)
    if (parsed) {
        
    
    parsed.forEach(
        element =>{
        console.log(element)
        var cachedURL = element.url
        var cachedIMG = element.images.SMALL
        var cachedTitle = element.label
        var card = document.createElement('div.card.flex.flex-col.border-b.w-2/3')
        var img = document.createElement(`img[src='${cachedIMG}'][href='${cachedURL}']`)
        var title = document.createElement(`a[href${cachedURL}]`)
        title.innerText = cachedTitle
        savedRecipeContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(title)

})
}
}

displayCachedRecipes()

// getEdamamApi()
//     .then(displayRecipe)



// images: {THUMBNAIL: {url: "https://edamam-product-images.s3.amazonaws.com/web…9a94e0a4d33b2b0d0ebb314d41938ffae7dd68821db394e6e", width: 100, height: 100}, SMALL: {url: "https://edamam-product-images.s3.amazonaws.com/web…055a23e5b031e7830e06f9e5fd758895830342da3759d573f", width: 200, height: 200}, REGULAR: {url: "https://edamam-product-images.s3.amazonaws.com/web…151c5e32f1a0e0ecd3858ad8d81dd30aeb7ef92363a8b2476", width: 300, height: 300}}

// label: "Lemon Cranberry Loaves"

// mealType: ["lunch/dinner"] (1)

// source: "Allrecipes"

// url: "https://www.allrecipes.com/recipe/246734/lemon-cranberry-loaves/"