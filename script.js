let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const backgroundContainer = document.getElementById('background');



const imageUrls = [
    'https://blogs.loc.gov/families/files/2020/11/Haiku-snow-mountain.jpg',
    'https://fydn.imgix.net/m%2Fgen%2Fcanvas-std-landscape-p1%2F83dd2955-2d00-46b7-83e4-e5f2487d4c60.jpg?auto=format%2Ccompress&q=75',
    'https://www.kennedy-center.org/globalassets/education/resources-for-educators/classroom-resources/artsedge/lesson/3-5/you-too-can-haiku/youtoocanhaiku.jpg'
];

console.log(imageUrls);

function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}
async function getRandomImage() {
    try {
        const imageUrl = getRandomImageUrl();
        const response = await axios.get(imageUrl, { responseType: 'blob' });
        const imageUrlObject = URL.createObjectURL(response.data);
        backgroundContainer.style.backgroundImage = `url(${imageUrlObject})`;
    } catch (err) {
        console.error('Error loading image:', err);
    }
}

// Show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true; 
}


function newQuote() {
    loading();

    // Pick a random quote from localQuotes array
    
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown'; 
        
    } else {
        authorText.textContent = quote.author; 
        
    }

    //  Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text; 
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://zenquotes.io/api/quotes';
    try {
        const response = await axios.get(apiUrl);
        const newData = response.data;
        apiQuotes = newData.map(quote => ({
            text: quote.q,
            author: quote.a,
        }));
        newQuote();
    } catch (err) {
        alert(err)
        // Catch error here
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
getRandomImage();



// Quote function for local quotes script

// function newQuote() {
//     // Pick a random quote from localQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     // Check if Author field is blank and replace it with "Unknown"
//     if (!quote.author) {
//         authorText.textContent = 'Unknown'; 
        
//     } else {
//         authorText.textContent = quote.author; 

//     }
//     quoteText.textContent = quote.text; 
// }