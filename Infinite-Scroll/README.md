## Technical Details
- Tracking the scroll
```
window.addEventListener('scroll', () => {})
```

- Load more condition
```
// window.scrollY = 
// window.innerHeight = 
// document.body.offsetHeight
if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000) {
    getPhotos();
  }
```

- Performance
  - Scroll events can fire at a high rate, the event handler shouldn't execute computationally expensive operations such as DOM modifications
  - call api only once for the trigger condition
  - track images being loaded using a variable and once the images are loaded then only signal the handler to call another set of api

```
// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
```

```
if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
```