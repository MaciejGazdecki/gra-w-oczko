(function init() {
    // all results and game control variables
    const gameResult = document.querySelector('#result');
    const average = document.querySelector('#average');
    const allResults = document.querySelector('#all_results');
    const youLostPopup = document.querySelector('.you_lost');
    const congratulationsPopup = document.querySelector('.congratulations');
    const twoAcesPopup = document.querySelector('.congratulations_two_aces');
    const resultsArray = [];
    let actualResult = 0;
    let gamePlaying;


    // cards related things
    const allCards = document.querySelectorAll('.card');
    const cards = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '10C', '10D', '10H', '10S', '2JC', '2JD', '2JH', '2JS', '3QC', '3QD', '3QH', '3QS', '4KC', '4KD', '4KH', '4KS', '11AC', '11AD', '11AH', '11AS'];
    let cardCounter = 0;

    //start game function
    function startGame() {
        function shuffle(array) { //simple shuffling algorithm, is not ideal, but works
            for (let i = 0; i < 10000; i++) {
                array.sort(() => Math.random() - 0.5);
            }
        }
        shuffle(cards);
        gameResult.textContent = 0;
        allCards.forEach(card => card.setAttribute('src', 'images/gray_back.png'));
        youLostPopup.style.display = 'none';
        congratulationsPopup.style.display = 'none';
        twoAcesPopup.style.display = 'none';
        cardCounter = 0;
        actualResult = 0;
        gamePlaying = true;
    }


    //take card function
    function takeCard() {
        if (gamePlaying) {
            if (actualResult <= 21) {
                document.querySelector(`#card-${cardCounter + 1}`).src = `images/${cards[cardCounter]}.png`;
                actualResult += parseInt(cards[cardCounter]);
                gameResult.textContent = actualResult;
                cardCounter++;
            } else if (actualResult === 22 && cardCounter === 2) {//when the actualesult is 22 and cardCounter is 2 it means that 
                //there are two cards only  with value 11 it must be aces
                gamePlaying = false;
                twoAcesPopup.style.display = 'flex';
            } else {
                gamePlaying = false;
                youLostPopup.style.display = 'flex';
            }
        }
    }


    //take point function
    function takePoints() {
        if (actualResult > 0 && actualResult < 21) {
            resultsArray.push(actualResult);
            allResults.textContent = resultsArray;
            average.textContent = Math.round((resultsArray.reduce((x, y) => x + y)) / resultsArray.length);
            startGame();
        } else if (actualResult === 21) {
            gamePlaying = false;
            resultsArray.push(actualResult);
            allResults.textContent = resultsArray;
            average.textContent = Math.round((resultsArray.reduce((x, y) => x + y)) / resultsArray.length);
            congratulationsPopup.style.display = 'flex'
        } else if (actualResult === 22 && cardCounter === 2) {
            gamePlaying = false;
            resultsArray.push(actualResult);
            allResults.textContent = resultsArray;
            average.textContent = Math.round((resultsArray.reduce((x, y) => x + y)) / resultsArray.length);
            twoAcesPopup.style.display = 'flex';
        } else {
            gamePlaying = false;
            youLostPopup.style.display = 'flex';
        }
    }

    //event listeners

    document.querySelectorAll('.start').forEach(btn => btn.addEventListener('click', startGame));
    document.querySelector('.take_card').addEventListener('click', takeCard);
    document.querySelector('.stop').addEventListener('click', takePoints);
})();