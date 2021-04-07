const quoteText = document.getElementById('quote');
const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// get quote from the api
async function getQuote() {
  showLoadingSpinner();
  // solving the cors issue
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + url);
    const data = await response.json();

    // set author as unknown if there is no author returned
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // if text is large assign long quote class to reduce the font size
    if(data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (err) {
    // getQuote();
    console.log(err);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const url = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(url, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// onLoad 
getQuote();