// Initial ratings
const ratings = {
  sony: 4.7,
  samsung: 3.4,
  vizio: 2.3,
  panasonic: 3.6,
  phillips: 4.1
};

const starsTotal = 5;

// Run getRatings when DOM loads
document.addEventListener('DOMContentLoaded', getRatings);

// Form elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

// Init product
let product;

// Product select change
productSelect.addEventListener('change', (e) => {
  product = e.target.value;

  // Enable rating control
  ratingControl.disabled = false;
  ratingControl.value = ratings[product];
});

// Rating control change
ratingControl.addEventListener('blur', (e) => {
  const rating = e.target.value;

  if (rating > 5) {
    alert('please rate 1 - 5');
    return;
  } 
  ratings[product] = rating;
  getRatings();
});

// get ratings
function getRatings () {
  for (let rating in ratings) {
    // get the percentage from the rating
    const starPercentage = (ratings[rating] / starsTotal) * 100;
    
    // round to the nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    
    // set width of stars-inner to the percentage
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
    document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
   
  }
}

// get the stars from the star rating control
const stars = document.querySelectorAll('.star');

// add eventListeners
stars.forEach((star, idx) => {
  star.value = idx + 1;
  ['click', 'mouseover', 'mouseout'].forEach(e => {
    star.addEventListener(e, updateRating);
  });
})


// update the stars and rating
function updateRating(e) {
  const type = e.type;
  const rating = this.value;
  stars.forEach((star, idx) => {
    if (type === 'click') {
      if (idx < rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    }

    if (type === 'mouseover') {
      if (idx < rating) {
        star.classList.add('gold');
      } else {
        
      }
    }

    if (type === 'mouseout') {
        star.classList.remove('gold');
    }
  })
}

// toggle number input and stars control
function toggleStarsControl() {

}