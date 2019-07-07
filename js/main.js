(function init() {
    // main variables
    const mainGameCounter = document.querySelector('#game_counter');
    let gameCounter = 0;
    let gamePlaying;
    let activePlayer = 0;
    let playerSwing = [true, true];
    let helperCardCounter = 1;

    //player 0 query selectors
    const gameResult0 = document.querySelector('#result-0');
    const wins0 = document.querySelector('#wins-0');
    const twentyOnes0 = document.querySelector('#twenty_ones-0');
    const twoAces0 = document.querySelector('#two_aces-0');
    const lost0 = document.querySelector('#games_lost-0');

    //player 1 query selectors
    const gameResult1 = document.querySelector('#result-1');
    const wins1 = document.querySelector('#wins-2');
    const twentyOne1 = document.querySelector('#twenty_ones-1');
    const twoAces1 = document.querySelector('#two_aces-1');
    const lost1 = document.querySelector('#games_lost-1');

    //results arrays;
    let actualResult = [0,0];
    let wins = [0,0];
    let twentyOnesResults = [0,0];
    let twoAcesResults = [0,0];
    let gameLostResults = [0,0];

    //popups
    const youLostPopup = document.querySelector('.you_lost');
    const congratulationsPopup = document.querySelector('.congratulations');
    const twoAcesPopup = document.querySelector('.congratulations_two_aces');

    // cards related things
    const cards_1 = document.querySelectorAll('.card-0');
    const cards_2 = document.querySelectorAll('.card-1');
    const cards = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D',
        '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '10C', '10D', '10H', '10S', '2JC',
        '2JD', '2JH', '2JS', '3QC', '3QD', '3QH', '3QS', '4KC', '4KD', '4KH', '4KS', '11AC', '11AD', '11AH', '11AS'];
    let cardCounter = 0;

    //start game function
    function startGame() {
        function shuffle(array) { //simple shuffling algorithm, is not ideal, but works
            for (let i = 0; i < 10000; i++) {
                array.sort(() => Math.random() - 0.5);
            }
        }
        shuffle(cards);
        cards_1.forEach(card => card.setAttribute('src', 'images/gray_back.png'));
        cards_2.forEach(card => card.setAttribute('src', 'images/yellow_back.png'));
        youLostPopup.style.display = 'none';
        congratulationsPopup.style.display = 'none';
        twoAcesPopup.style.display = 'none';
        // if(actualResult >= 22 && cardCounter > 2) {
        //     gameLostResults++;
        //     document.querySelector('#games_lost').textContent = gameLostResults;
        // }
        cardCounter = 0;
        activePlayer = 0;
        helperCardCounter = 1;
        // if (actualResult > 0) {
        //     gameCounter++;
        //     mainGameCounter.textContent = gameCounter;
        // }
        actualResult = [0,0];
        gamePlaying = true;
        playerSwing = [true, true];
        document.querySelector(`#card-0-${cardCounter}`).src = `images/${cards[cardCounter]}.png`;
        actualResult[0] = parseInt(cards[cardCounter]);
        cardCounter++;
        document.querySelector(`#card-1-${cardCounter}`).src = `images/${cards[cardCounter]}.png`;
        actualResult[1] = parseInt(cards[cardCounter]);
        cardCounter++;
        gameResult0.textContent = actualResult[0];
        gameResult1.textContent = actualResult[1];
        console.log(cards);
    }

    //take card function
    function takeCard() {
        if (gamePlaying) {
            if (actualResult[activePlayer] < 21) {
                if(playerSwing[0] && playerSwing[1]) {
                    document.querySelector(`#card-${activePlayer}-${cardCounter}`).src
                        = `images/${cards[cardCounter]}.png`;
                    actualResult[activePlayer] += parseInt(cards[cardCounter]);
                    document.querySelector(`#result-${activePlayer}`).textContent = actualResult[activePlayer];
                    cardCounter++;
                    activePlayer++;
                    if (activePlayer === 2) activePlayer = 0;
                } else {
                    document.querySelector(`#card-${activePlayer}-${cardCounter+helperCardCounter}`).src
                        = `images/${cards[cardCounter]}.png`;
                    actualResult[activePlayer] += parseInt(cards[cardCounter]);
                    document.querySelector(`#result-${activePlayer}`).textContent = actualResult[activePlayer];
                    cardCounter++;
                    helperCardCounter++;
                }
            } else if (actualResult[activePlayer] === 21) {
                gamePlaying = false;
                twentyOnesResults[activePlayer]++;
                document.querySelector(`#twenty_ones-${activePlayer}`).textContent = twentyOnesResults[activePlayer];
                congratulationsPopup.style.display = 'flex';
            } else if (actualResult[activePlayer] === 22 && cardCounter === 2) {//when the actualesult is 22 and cardCounter is 2 it means that
                //there are two cards only  with value 11 it must be aces
                gamePlaying = false;
                twoAcesResults[activePlayer]++;
                document.querySelector(`#two_aces-${activePlayer}`).textContent = twoAcesResults[activePlayer];
                twoAcesPopup.style.display = 'flex';
            } else {
                gamePlaying = false;
                youLostPopup.style.display = 'flex';
            }
        }
    }

    //take point function
    function takePoints() {
        if (actualResult[activePlayer] === 0 && cardCounter === 0) {
            gamePlaying = false;
        } else if (actualResult[activePlayer] > 0 && actualResult[activePlayer] < 21) {
            playerSwing[activePlayer] = false;
            activePlayer++;
            if(activePlayer === 2) activePlayer = 0;
        } else if (actualResult[activePlayer] === 21) {
            gamePlaying = false;
            twentyOnesResults++;
            twentyOnes.textContent = twentyOnesResults;
            congratulationsPopup.style.display = 'flex'
        } else if (actualResult[activePlayer] === 22 && cardCounter === 2) {
            gamePlaying = false;
            twoAcesResults++;
            twoAces.textContent = twoAcesResults;
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