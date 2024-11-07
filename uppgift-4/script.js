const list = document.querySelector("#list");
const imgContainer = document.querySelector("#imgContainer");

// Fetch the album data
fetch("https://jsonplaceholder.typicode.com/albums")
  .then((response) => response.json())
  .then((albumData) => {
    // Fetch the photo data
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((photoData) => {
        // Fill the list with all album titles
        drawList(albumData);

        // Initialize album images for first album on page load
        drawImages(photoData, 1);

        // Add event listener that passes the album ID and photoData into drawImages()
        // every time a new album is selected
        list.addEventListener("change", (e) => {
          imgContainer.innerHTML = "";
          drawImages(photoData, e.target.value);
        });
      });
  });

function drawList(albumData) {
  albumData.forEach((album) => {
    // Build new list item with album title
    const newListEntry = document.createElement("option");
    newListEntry.innerText = `${album.title} (ID: ${album.id})`;
    newListEntry.value = album.id;
    list.appendChild(newListEntry);
  });
}

function drawImages(photoData, albumId) {
  // Filter photos to only include the first 5 photos that are matching the albumId
  const filteredPhotos = photoData.filter((photo) => photo.albumId == albumId).slice(0, 5);

  // Render the filtered fotos
  filteredPhotos.forEach((photo) => {
    const newImg = document.createElement("img");
    newImg.src = photo.url;
    newImg.alt = `photo-id: ${photo.albumId}`;
    newImg.classList.add("albumImage");
    imgContainer.appendChild(newImg);
  });
}
