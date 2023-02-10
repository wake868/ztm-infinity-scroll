// Unsplash API
const apiKey = "_1CKchQncU2Dow3jy6XdJEQD9WMd2b9e1tk9K4pVc8I";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=5`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

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

    // Event listener check when each is finished loading
    image.addEventListener("load", imageLoaded);

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

    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// After the page has fully loaded with the initial set of 5 photos change count to grab to 30.
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30`;
});

// On Load
getPhotos();
