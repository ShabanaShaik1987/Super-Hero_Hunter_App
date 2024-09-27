// Selecting the hero list container from the DOM where heroes will be displayed
let listOfHeroInDom = document.getElementById("heroList");
console.log("Working");
// Fetching the list of favorite heroes from localStorage and parsing it into an array
let listOfHeros = JSON.parse(localStorage.getItem("favHeros"));
// Function to add a hero to the DOM
function addHerosToDOM(hero) {
    let li = document.createElement("li"); // Create a new list item for each hero
    li.setAttribute("id", `${hero.id}`); // Set the hero's ID as the element's ID
    li.innerHTML = 
    `
    <img src="${hero.thumbnail.path + "." + hero.thumbnail.extension}" id="poster"  >
    <h4 id="heroTitle" data-id=${hero.id}>${hero.name}</h4>
    <button id="details" data-id="${hero.id}"> Details </button>
    <button id="delete" data-id="${hero.id}"> Delete </button>
    `; // Create the inner HTML structure, including the hero's image, name, and buttons for details and deletion
    listOfHeroInDom.append(li); // Append the hero's list item to the DOM
}
// Function to fetch and render the list of favorite heroes from the Marvel API
async function renderHeroList() {
    listOfHeroInDom.innerHTML = ""; // Clear the current list of heroes in the DOM
    const publicKey = "0e75ac2f10a1ece0900e6cd77e499306"; // Public Marvel API key
    const privateKey = "1b986c332dd6636362059776097650d7b2d88d26"; // Private Marvel API key 
   const timestamp = new Date().getTime(); // Timestamp for hashing the request
   const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(); // Generate hash for API
    for (let i = 0; i < listOfHeros.length; i++) { // Loop through each favorite hero ID
        id = listOfHeros[i]; // Get the current hero ID
        // Marvel API URL to fetch the hero details using the ID
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=0e75ac2f10a1ece0900e6cd77e499306&hash=${hash}&ts=${timestamp}`);
        // Parse the response and extract the hero details from the API response
        heroDetails = (await response.json()).data.results[0];
        //console.log(heroDetails);
        // Add the hero to the DOM using the addHerosToDOM function
        addHerosToDOM(heroDetails);
    }
}
// Function to handle click events for both "Details" and "Delete" buttons
function handleKeyAndClick(e) {
    // Check if the "Details" button was clicked
    if (e.target.id === "details") {
        let heroId = e.target.dataset.id; // Get the hero ID from the clicked button's data attribute
        localStorage.setItem("heroId", JSON.stringify(heroId)); // Store the hero ID in localStorage for use on the details page
        window.open("./details.html"); // Open the details page in a new tab/window
    }

    // Check if the "Delete" button was clicked
    if (e.target.id === "delete") {
        let heroId = e.target.dataset.id; // Get the hero ID from the clicked button's data attribute
        // Filter the current favorite list to remove the hero
        const newFav = listOfHeros.filter(function (id) {
            return heroId !== id; // Only keep heroes that don't match the deleted hero's ID
        });
        listOfHeros = [...newFav]; // Update the listOfHeros array with the filtered favorite list
        // Update the favorite heroes list in localStorage with the new filtered list
        localStorage.setItem("favHeros", JSON.stringify(newFav));

        // Find the corresponding hero element in the DOM and hide it
        let ele = document.getElementById(heroId);
        ele.style.display = "none"; // Hide the deleted hero element from the DOM
    }
}
// Add a global event listener to the document for handling clicks on any button
document.addEventListener("click", handleKeyAndClick);
// Call the function to render the list of favorite heroes on page load
renderHeroList();
