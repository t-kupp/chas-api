const list = document.querySelector("#list");

async function getData() {
  const [postsResponse, commentsResponse] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/comments"),
  ]);
  const postsData = await postsResponse.json();
  const commentsData = await commentsResponse.json();
  displayPosts(postsData, commentsData);
  console.log("postsData:", postsData, "commentsData:", commentsData);
}
getData();

function displayPosts(postsData, commentsData) {
  const posts = postsData.splice(0, 5);

  posts.forEach((post) => {
    // Create post container
    const container = document.createElement("div");
    container.classList.add("post-container");
    list.appendChild(container);

    // Create post title
    const title = document.createElement("p");
    title.classList.add("title");
    title.innerText = post.title;
    container.appendChild(title);

    // Create show comments button
    const button = document.createElement("button");
    button.classList.add("commentsBtn");
    button.innerText = "Comments...";
    container.appendChild(button);

    // EventListener on button to show comments when clicked
    // And remove the button
    button.addEventListener("click", () => {
      displayComments(container, post.id, commentsData);
      button.remove();
    });
  });
}

function displayComments(parentContainer, postId, commentsData) {
  // Find all comments for the corresponding post
  const comments = commentsData.filter((comment) => comment.postId == postId);

  // Render comments
  comments.forEach((element) => {
    // Create comment container
    const container = document.createElement("div");
    container.classList.add("comment-container");
    parentContainer.appendChild(container);

    // Create commenter name
    const name = document.createElement("p");
    name.innerText = element.name;
    name.classList.add("name");
    container.appendChild(name);

    // Create comment
    const comment = document.createElement("p");
    comment.innerText = element.body;
    comment.classList.add("comment");
    container.appendChild(comment);
  });
}
