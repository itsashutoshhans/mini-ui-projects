const search = document.querySelector('#search');
const test = document.querySelector('#test');
const suggestionsList = document.querySelector('.suggestions-list');
const URL = 'https://gist.githubusercontent.com/itsashutoshhans/9efde041a5d640c29baeb5d14ebed60c/raw/e941b7dccc5551bbd5d6951a1f1d1758b040f42d/food-items.json';

// handlers
const searchFoodItems = debounce(async (searchText) => {
  const foodItems = await getFoodItems();
  let suggestions = getMatches(searchText, foodItems);
  if (searchText.length === 0) {
    suggestions = [];
    suggestionsList.innerHTML = '';
    return;
  }
  updateHtml(searchText, suggestions);
});

const getFoodItems = async () => {
  const response = await fetch(URL);
  const foodItems = await response.json();
  return foodItems;
}

const getMatches = (searchText, foodItems) => {
  return foodItems.filter(footItem => {
    const regex = new RegExp(`${searchText}`, `gi`);
    return footItem.foodName.match(regex);
  })
}

const updateHtml = (searchText, suggestions) => {
  if (suggestions.length > 0) {
    const html = suggestions.map(suggestion => {
      // highlight the searchedText
      const regex = new RegExp(searchText, 'gi');
      const displayName = suggestion.foodName.replace(regex, `<span><b>${searchText}</b></span>`);
      return (
        `
        <li onclick="handleSuggestionClick(this)">
          ${displayName}
        </li>
        `
    )}).join('');
    suggestionsList.innerHTML = html;
  } else {
    suggestionsList.innerHTML = '<div><p>No Results Found</p></div>';
  }
};

const handleSuggestionClick = (element) => {
  search.value = element.innerText;
  suggestionsList.innerHTML = '';
}

// debounce
function debounce(fn, delay=500) {
  let timeoutId;

  return (...args) => {
    // cancel the previous timer if any
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  }
};

// event listeners
search.addEventListener('input', (event) => {
  searchFoodItems(search.value);
});