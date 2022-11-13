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

