import { createElement, createElements } from "./helper.js";

const starCount = 5;
let rating = 0;
let filled = 0;

// get the elements
const starContainer = document.getElementById('starContainer');
const ratingInfo = document.getElementById('ratingInfo');

// create elements
starContainer.appendChild(
  // fragment
  createElements(starCount, index => createElement('div', { 'class': 'star star-empty', 'data-index': index }), 1)
);

const stars = starContainer.querySelectorAll('.star');

// event listeners
['mouseover', 'mouseleave', 'click'].forEach(e => {
  starContainer.addEventListener(e, updateRating);
});

// event handlers
function updateRating(e) {
  // click
  if (e.type === 'click') {
    const target = event.target;
    if (target.classList.contains('star')) {
      rating = +target.dataset.index;
      setRating(rating);
    }
  }

  // hover
  if (e.type === "mouseover") {
    const target = e.target;
    if (target.classList.contains('star')) {
      const index = target.dataset.index;
      fillStars(+index);
    }
  }

  // leave
  if (e.type === "mouseleave") {
    fillStars(+rating);
  }
}

function fillStars(index) {
  let previousFilled = filled;
  for (let i = previousFilled; i < index; i++) {
    stars[i].classList.add('star-filled');
    stars[i].classList.remove('star-empty');
  }

  for (let i = index; i < previousFilled; i++) {
    stars[i].classList.remove('star-filled');
    stars[i].classList.add('star-empty');
  }

  filled = index;
}

function setRating (rating) {
  ratingInfo.textContent = `You rated ${rating}!`;
}