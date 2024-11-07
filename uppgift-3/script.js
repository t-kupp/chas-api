const list = document.querySelector("#list");
const checkbox = document.querySelector("#checkbox");

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((data) => {
    // Draw all tasks on page load
    drawData(data);

    // Add an event listener that calls drawData() if it gets checked/unchecked
    // Also passes the new checkboxes value through (checked = true, unchecked = false)
    checkbox.addEventListener("change", (e) => {
      list.innerHTML = "";
      drawData(data, e.target.checked);
    });
  });

function drawData(data, checked) {
  data.forEach((element) => {
    // Task will not get displayed if checkbox is checked and task is not complete
    // (early return)
    if (checked && !element.completed) {
      return;
    }

    // Create new <li> element
    const newListEntry = document.createElement("li");
    newListEntry.classList.add("task");
    list.appendChild(newListEntry);

    // Create new <p> element for the tasks title
    const newTodoTitle = document.createElement("p");
    newTodoTitle.innerText = element.title;
    newListEntry.appendChild(newTodoTitle);

    // Create new <p> element for the completed indicator
    const newCheckmark = document.createElement("p");
    newCheckmark.innerText = element.completed ? "☑" : "☐";
    newListEntry.appendChild(newCheckmark);
  });
}
