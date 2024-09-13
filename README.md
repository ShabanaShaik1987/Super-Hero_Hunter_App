Features: 
•	Home Page
o	Fetches and displays a list of SuperHeros (Characters) on the  page. Also there is a search bar that will filter out the character based on search query. Suppose if we type “bat” in the search box, it will show “batman”. 
[ API example https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>]
o	Each search result of the superhero have a favourite button, clicking on which superhero should be added to “My favorite superheroes” (a list).
o	On clicking any particular search result (any superhero), opens a new page with more information about that superhero (Superhero page).
•	My favourite superheroes Page
o	Displays a list of all the favourite superheroes.
o	 This list is persistent means it will have the same number of superheroes before and after closing the browser.
o	 Each superhero has remove button which removes it from favourites list, clicking on which will remove that superhero from the list.

•	Superhero Page
o	It shows a lot of information about the superhero like their name, photo, bio and other information provided by the API (comics, events, series, stories, etc).

![Screenshot 2024-09-13 202514](https://github.com/user-attachments/assets/c7f8a163-0cf3-4f51-a9d3-b535bc2258bb)
![Screenshot 2024-09-13 202727](https://github.com/user-attachments/assets/368d1b5c-082c-40f5-8f83-28e7dbf9754c)
![Screenshot 2024-09-13 203048](https://github.com/user-attachments/assets/d6a3856d-1e13-4be2-b5ff-fe46ba3b22ea)
