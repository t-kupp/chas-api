const list = document.querySelector("#list");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => displayData(data));

function displayData(arr) {
  arr.forEach((person) => {
    // Create new list element
    const newListEntry = document.createElement("li");
    list.appendChild(newListEntry);
    newListEntry.classList.add("person");

    // Persons name
    const newName = document.createElement("a");
    newListEntry.appendChild(newName);
    newName.classList.add("name");
    newName.href = `https://${person.website}/`;
    newName.target = "_blank";
    newName.innerText = person.name;

    // Persons email
    const newEmail = document.createElement("a");
    newListEntry.appendChild(newEmail);
    newEmail.href = `mailto:${person.email}`;
    newEmail.innerText = person.email;
  });
}
