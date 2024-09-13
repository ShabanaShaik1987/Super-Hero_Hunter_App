document.addEventListener('DOMContentLoaded', () => {
    // -----------------------Selecting the elements from DOM-----------------------
    let listOfHeroInDom = document.getElementById("heroList"); // UL element where hero list will be displayed
    let errorMessage = document.getElementById("errorMessage"); // Element to show any error messages
    let inputBar = document.getElementById("inputBar"); // Input field for hero search
    let btnSearch = document.getElementById("btnsearch"); // Search button element
    let btnReset = document.getElementById("btnclear"); // Reset button element
    let listOfHeros = []; // Array to store search results of heroes
    let favList = []; // Array to store IDs of favorite heroes

    // Function to add heroes to the DOM
    function addHerosToDOM(hero) {
        // Create a list item for each hero
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${hero.thumbnail.path + "." + hero.thumbnail.extension}" id="poster" alt="${hero.name} poster">
            <h2 id="heroTitle" data-id=${hero.id}>${hero.name}</h2>
            <button id="details" data-id="${hero.id}">Details</button>
            <button id="favBtn" data-id="${hero.id}" data-title="${hero.name}">Add to Favourites</button>
        `;
        // Append the hero list item to the hero list in the DOM
        listOfHeroInDom.appendChild(li);
    }

    // Function to render hero list after searching
    function renderHeroList() {
        listOfHeroInDom.innerHTML = ""; // Clear the current list
        if (listOfHeros.length === 0) { // Check if no heroes are found
            errorMessage.innerHTML = `No superhero found with that name`; // Show error if no heroes
            return;
        }
        errorMessage.innerHTML = ""; // Clear error message
        // Loop through each hero in the search results and add to the DOM
        listOfHeros.forEach(hero => addHerosToDOM(hero));
    }

    // API call to search for heroes based on user input
    async function searchInput(text) {
        if (text.length !== 0) { // Ensure input is not empty
             const publicKey = "0e75ac2f10a1ece0900e6cd77e499306"; // Public Marvel API key
             const privateKey = "1b986c332dd6636362059776097650d7b2d88d26"; // Private Marvel API key
            //  const publicKey = "2d498890403133a04816924bfb353e1a"; // Public Marvel API key
            // const privateKey = "16c333043f5456bd74998aa52a945cfe63bfa379"; // Private Marvel API key
            const timestamp = new Date().getTime(); // Timestamp for hashing the request
            const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(); // Generate hash for API
            //const hash1="b852511c68e2955c6e14cd4e24b4f517";
            const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&nameStartsWith=${text}&apikey=${publicKey}&hash=${hash}`; // API endpoint

            try {
                // Fetch data from Marvel API
                let response = await fetch(apiUrl);
                let data1 = await response.json(); // Parse the JSON response
                listOfHeros = data1.data.results; // Store search results in listOfHeros array
                renderHeroList(); // Render the list of heroes
            } catch (error) {
                console.error('Error fetching heroes:', error); // Log any errors
                errorMessage.innerHTML = 'Failed to fetch heroes. Please try again later.'; // Show error message
            }
        }
    }

    // Function to add hero to favorites list
    function addToFav(heroId, heroTitle) {
        if (favList.includes(heroId)) { // Check if the hero is already in the favorite list
            errorMessage.innerHTML = "This hero is already in the Fav List"; // Show error if hero is already added
            setTimeout(() => {
                errorMessage.innerHTML = ""; // Clear error message after 3 seconds
            }, 3000);
            return;
        }
        favList.push(heroId); // Add hero ID to favorites list
        errorMessage.innerHTML = `${heroTitle} added to the fav List`; // Show success message
        setTimeout(() => {
            errorMessage.innerHTML = ""; // Clear success message after 3 seconds
        }, 3000);
    }

    // Function to handle the search button click
    function handleSearchClick() {
        let text = inputBar.value; // Get the value from the input bar
        searchInput(text); // Call the searchInput function with the user's input
    }

    // Event listener for the search button
    btnSearch.addEventListener("click", handleSearchClick);

    // Function to handle clicks on the details or favorite buttons
    function handleClick(e) {
        if (e.target.id === "details") { // Check if the clicked element is the "details" button
            let heroId = e.target.dataset.id; // Get the hero ID from the data attribute
            localStorage.setItem("heroId", JSON.stringify(heroId)); // Store hero ID in localStorage
            window.open("./details.html"); // Open the details page
        }
        if (e.target.id === "favBtn") { // Check if the clicked element is the "Add to Favourites" button
            addToFav(e.target.dataset.id, e.target.dataset.title); // Add hero to favorites
        }
        if (e.target.id === "favourite") { // Check if the clicked element is the "Favourites" button
            localStorage.setItem("favHeros", JSON.stringify(favList)); // Store favorite heroes in localStorage
            window.open("./fav.html"); // Open the favorites page
        }
    }

    // Global click event listener to handle all clicks on the page
    document.addEventListener("click", handleClick);

    // Event listener for the reset button to clear search input and list
    btnReset.addEventListener("click", () => {
        inputBar.value = ""; // Clear the input field
        listOfHeroInDom.innerHTML = ""; // Clear the current hero list
        errorMessage.innerHTML = ""; // Clear any error message
    });
});
