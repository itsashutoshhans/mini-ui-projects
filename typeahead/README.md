## A few points to take care while implementing the typeahead
1. Multiple results of the same string  
We can use hyphen and summary to differentiate

2. Highlighting the entered string or may be the suffix or prefix

3. Performance
  - cancelling the previous request
  - caching
  - debouncing

4. Event handling on new character, backspace and copy-paste

## Technical details
```js
const regex = new RegExp(`${searchText}`, `gi`);
```

> Copy paste is taken care by input event listener

### debounce
```js
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
```

### highlighting the searched text
```js
// highlight the searchedText
const regex = new RegExp(searchText, 'gi');
const displayName = suggestion.foodName.replace(regex, `<span><b>${searchText}</b></span>`);
return (
  `
  <li onclick="handleSuggestionClick(this)">
    ${displayName}
  </li>
  `
)
```


