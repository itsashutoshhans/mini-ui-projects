const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Unsplash API
const count = 10;
const apiKey = '7hI5QFwYC1QlqX6y_ccVi1rtoswNdkKE3l1xomJBhGY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all the images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  console.log('fetching photos...')
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (error) {
    // catch error here
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// on Load
getPhotos();