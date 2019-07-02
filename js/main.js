

//query selectors and all variables and arrays
//btns
const startBtns = document.querySelectorAll('.start');
const takeCardBtn = document.querySelector('.take_card');
const stopBtn = document.querySelector('.stop');

//results
const gameResult = document.querySelector('#result');
const average = document.querySelector('#average');
const allResults = document.querySelector('#all_results');
const resultsArray = [];
allResults.textContent = resultsArray;
let actualResult = 0;


// cards related things
const allCards = document.querySelectorAll('.card');
const cards = ['2C','2D','2H','2S','3C','3D','3H','3S','4C','4D','4H','4S','5C','5D','5H','5S','6C','6D','6H','6S','7C','7D','7H','7S','8C','8D','8H','8S','9C','9D','9H','9S','10C','10D','10H','10S','2JC','2JD','2JH','2JS','3QC','3QD','3QH','3QS','4KC','4KD','4KH','4KS','11AC','11AD','11AH','11AS'];
let cardCounter = 0;

//start game function
function startGame() {
    function shuffle(array) {
    for(let i = 0; i < 10000; i++) {
        array.sort(() => Math.random() - 0.5);
        }
    }
    shuffle(cards);
    gameResult.textContent = 0;
    allCards.forEach(card => card.setAttribute('src','images/gray_back.png'));
    document.querySelector('.you_lost').style.display = 'none';
    cardCounter = 0;
    actualResult = 0;
}
//take card function
function takeCard () {
    if(actualResult <= 21) {
    document.querySelector(`#card-${cardCounter+1}`).src = `images/${cards[cardCounter]}.png`;
    actualResult += parseInt(cards[cardCounter]);
    gameResult.textContent = actualResult;
    cardCounter++;
    } else {
        document.querySelector('.you_lost').style.display = 'flex';

    }
}
//event listeners

startBtns.forEach(btn => btn.addEventListener('click', startGame));
takeCardBtn.addEventListener('click',takeCard);
