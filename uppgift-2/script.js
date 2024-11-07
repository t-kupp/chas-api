const list = document.querySelector("#list");
const searchBox = document.querySelector("#searchBox");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    // First time displaying whole data
    displayData(data);
    // Adding an event listener for the search box textfield
    // Executes every time the user inputs a character
    searchBox.addEventListener("keyup", () => {
      list.innerHTML = "";
      displayData(data);
    });
  });

function displayData(data) {
  data.forEach((element) => {
    // Checks if the current title matches the search box input
    // If the it does not match, the current title will be skipped (early return)
    if (!element.title.includes(searchBox.value)) {
      return;
    }
    // Appends the current title to the list
    const newListEntry = document.createElement("li");
    list.appendChild(newListEntry);
    newListEntry.innerHTML = element.title;
  });
}
