// Retrieve the hero ID from localStorage and parse it
let heroId = JSON.parse(localStorage.getItem("heroId"));

// Initialize a variable to store hero details
let heroDetails = null;

// Selecting various elements from the DOM to display hero details
let titleEle = document.getElementById("name"); // Element to display hero name
let imgEle = document.getElementsByTagName("img")[0]; // First image element to display hero image
let description = document.getElementById("description"); // Element to display hero description
let comics = document.getElementById("comics"); // Element to display the list of comics
let series = document.getElementById("series"); // Element to display the list of series
let releaseDate = document.getElementById("release-data"); // Element to display release/modified date
let seriesNumber = document.getElementById("seriesNumber"); // Element to display the number of series
let comicNumber = document.getElementById("comicNumber"); // Element to display the number of comics

// Function to fetch hero details from the Marvel API based on the hero ID
async function fetchHeroDetails(id) {
    // Fetch the hero details from Marvel API using the given ID
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`);
    
    // Parse the response and store hero details in the heroDetails variable
    heroDetails = (await response.json()).data.results[0];
    console.log(heroDetails); // Log the hero details to the console for debugging

    // Check if the hero has a description, if not, display "Description Not available"
    if (heroDetails.description.length != 0)
        description.innerHTML += `<h4>${heroDetails.description}</h4>`;
    else
        description.innerHTML += `<h4>Description Not available</h4>`;

    // Display the hero name in the title element
    titleEle.innerHTML += `<h4> ${heroDetails.name} </h4>`;

    // Extract and display the release (modified) date in the releaseDate element
    let date = `${heroDetails.modified}`; // Get the modified date string
    let parsedDate = ""; // Initialize an empty string for parsed date
    for (i of date) { // Extract only the date part (YYYY-MM-DD) from the timestamp
        if (('0' <= i && i <= '9') || i == '-')
            parsedDate += i;
        else break;
    }
    releaseDate.innerHTML += `<h4>${parsedDate}</h4>`; // Display the parsed date

    // Set the hero's image using the thumbnail path and extension
    imgEle.setAttribute("src", `${heroDetails.thumbnail.path}.${heroDetails.thumbnail.extension}`);

    // Display the number of series the hero appears in
    seriesNumber.innerHTML += `${heroDetails.series.available}`;

    // Loop through the series and display each one with a series number
    let seriesNum = 1;
    for (i of heroDetails.series.items) {
        series.innerHTML += `<h4>Series Number ${seriesNum}: ${i.name}</h4>`;
        seriesNum++;
    }

    // Display the number of comics the hero appears in
    comicNumber.innerHTML += `${heroDetails.comics.available}`;

    // Loop through the comics and display each one with a comic number
    let comicsNum = 1;
    for (i of heroDetails.comics.items) {
        comics.innerHTML += `<h4>Comic Number ${comicsNum}: ${i.name}</h4>`;
        comicsNum++;
    }
}

// Function to load the hero details when the page is loaded
function heroLoad() {
    fetchHeroDetails(heroId); // Call the function to fetch hero details using the stored hero ID
}

// Call the heroLoad function to fetch and display the hero details on page load
heroLoad();
