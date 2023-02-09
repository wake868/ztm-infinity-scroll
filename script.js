// Unsplash API
const count = 10;
const apiKey = "_1CKchQncU2Dow3jy6XdJEQD9WMd2b9e1tk9K4pVc8I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and photos
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Creating <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });

    // Create image for photo
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Put <img> inside <a>, then put both inside the imageContainer Element
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();

    console.log(data);
  } catch (error) {}
}

// On Load
getPhotos();
