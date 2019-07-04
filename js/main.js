(function init() {
    // all results and game control variables
    const gameResult = document.querySelector('#result');
    const allResults = document.querySelector('#not_wins');
    const twentyOnes = document.querySelector('#twenty_ones');
    const twoAces = document.querySelector('#two_aces');
    const mainGameCounter = document.querySelector('#game_counter');
    const youLostPopup = document.querySelector('.you_lost');
    const congratulationsPopup = document.querySelector('.congratulations');
    const twoAcesPopup = document.querySelector('.congratulations_two_aces');
    let notWins = 0;
    let twentyOnesResults = 0;
    let twoAcesResults = 0;
    let gameLostResults = 0;
    let actualResult = 0;
    let gameCounter = 0;
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
        if(actualResult >= 22 && cardCounter > 2) {
            gameLostResults++;
            document.querySelector('#games_lost').textContent = gameLostResults;
        }
        cardCounter = 0;
        if (actualResult > 0) {
            gameCounter++;
            mainGameCounter.textContent = gameCounter;
        }
        showPercentages();
        actualResult = 0;
        gamePlaying = true;
    }

    //take card function
    function takeCard() {
        if (gamePlaying) {
            if (actualResult < 21) {
                document.querySelector(`#card-${cardCounter + 1}`).src = `images/${cards[cardCounter]}.png`;
                actualResult += parseInt(cards[cardCounter]);
                gameResult.textContent = actualResult;
                cardCounter++;
            } else if (actualResult === 21) {
                gamePlaying = false;
                twentyOnesResults++;
                twentyOnes.textContent = twentyOnesResults;
                congratulationsPopup.style.display = 'flex';
            } else if (actualResult === 22 && cardCounter === 2) {//when the actualesult is 22 and cardCounter is 2 it means that
                //there are two cards only  with value 11 it must be aces
                gamePlaying = false;
                twoAcesResults++;
                twoAces.textContent = twoAcesResults;
                twoAcesPopup.style.display = 'flex';
            } else {
                gamePlaying = false;
                youLostPopup.style.display = 'flex';
            }
        }
    }

    //take point function
    function takePoints() {
        if (actualResult === 0) {
            startGame();
        } else if (actualResult > 0 && actualResult < 21) {
            notWins++;
            allResults.textContent = notWins;
            startGame();
        } else if (actualResult === 21) {
            gamePlaying = false;
            twentyOnesResults++;
            twentyOnes.textContent = twentyOnesResults;
            congratulationsPopup.style.display = 'flex'
        } else if (actualResult === 22 && cardCounter === 2) {
            gamePlaying = false;
            twoAcesResults++;
            twoAces.textContent = twoAcesResults;
            twoAcesPopup.style.display = 'flex';
        } else {
            gamePlaying = false;
            youLostPopup.style.display = 'flex';
        }
    }

    //percentage show
    function showPercentages () {
        if (gameCounter > 0) {
            document.querySelector('#notwins').textContent = `${((notWins / gameCounter) * 100).toFixed(2)}%`;
            document.querySelector('#twentyones').textContent = `${((twentyOnesResults / gameCounter) * 100).toFixed(2)}%`;
            document.querySelector('#twoaces').textContent = `${((twoAcesResults / gameCounter) * 100).toFixed(2)}%`;
            document.querySelector('#lost').textContent = `${((gameLostResults / gameCounter) * 100).toFixed(2)}%`;
        }
    }

    //event listeners
    document.querySelectorAll('.start').forEach(btn => btn.addEventListener('click', startGame));
    document.querySelector('.take_card').addEventListener('click', takeCard);
    document.querySelector('.stop').addEventListener('click', takePoints);
})();