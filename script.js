// script.js
const imageContainer = document.getElementById('image__container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


const apiUrl = 'http://localhost:3000/getRandomPhotos';

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    // Run function for each object in photosArray up to the count
    photosArray.forEach((photo) => {
        // Creating anchors for Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // OnLoad
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Function to get ten random photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        console.log(err);
    }
}

// Add event listener for scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos();
    }
});

// Initial load of photos
getPhotos();
