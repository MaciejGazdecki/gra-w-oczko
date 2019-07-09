(function init() {
    // main variables
    let gameCounter = 0;
    let drawsCounter = 0;
    let gamePlaying;
    let activePlayer = 0;
    let playerSwing = [true, true];

    //results arrays;
    let actualResult = [0, 0];
    let wins = [0, 0];
    let twentyOnesResults = [0, 0];
    let twoAcesResults = [0, 0];
    let gameLostResults = [0, 0];

    //player 0 query selectors
    const gameResult0 = document.querySelector('#result-0');
    const wins0 = document.querySelector('#wins-0');
    const twentyOne0 = document.querySelector('#twenty_ones-0');
    const twoAces0 = document.querySelector('#two_aces-0');
    const lost0 = document.querySelector('#games_lost-0');

    //player 1 query selectors
    const gameResult1 = document.querySelector('#result-1');
    const wins1 = document.querySelector('#wins-1');
    const twentyOne1 = document.querySelector('#twenty_ones-1');
    const twoAces1 = document.querySelector('#two_aces-1');
    const lost1 = document.querySelector('#games_lost-1');

    //popups
    const whoWinsPopup = document.querySelector('.who-wins');
    const twoAcesPopup = document.querySelector('.congratulations_two_aces');

    // cards related things
    const cards_1 = document.querySelectorAll('.card-0');
    const cards_2 = document.querySelectorAll('.card-1');
    const cards = ['11AC', '11AD', '11AH', '10S','2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D',
        '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '10C', '10D', '10H', '10S', '2JC',
        '2JD', '2JH', '2JS', '3QC', '3QD', '3QH', '3QS', '4KC', '4KD', '4KH', '4KS', '11AC', '11AD', '11AH', '11AS'];
    let cardCounter = 0;
    let helperCardCounter = 1;

    //start game function
    function startGame() {
        function shuffle(array) {
            for (let i = 0; i < 10000; i++) {
                array.sort(() => Math.random() - 0.5);
            }
        }
        // shuffle(cards);
        cards_1.forEach(card => card.setAttribute('src', 'images/gray_back.png'));
        cards_2.forEach(card => card.setAttribute('src', 'images/yellow_back.png'));
        twoAcesPopup.style.display = 'none';
        whoWinsPopup.style.display = 'none';
        cardCounter = 0;
        activePlayer = 0;
        helperCardCounter = 1;
        actualResult = [0, 0];
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
    }

    //take card function
    function takeCard() {
        if (gamePlaying) {
            if (actualResult[activePlayer] < 21) {
                if (playerSwing[0] && playerSwing[1]) {
                    document.querySelector(`#card-${activePlayer}-${cardCounter}`).src
                        = `images/${cards[cardCounter]}.png`;
                    actualResult[activePlayer] += parseInt(cards[cardCounter]);
                    document.querySelector(`#result-${activePlayer}`).textContent = actualResult[activePlayer];
                    cardCounter++;
                    activePlayer++;
                    if (activePlayer === 2) activePlayer = 0;
                    if((actualResult[0] === 22 || actualResult[1] === 22) && cardCounter === 4) determineWinner(actualResult);
                    if((actualResult[0] > 21 || actualResult[1] > 21)) determineWinner(actualResult);
                } else if ((!playerSwing[0] && playerSwing[1]) || (playerSwing[0] && !playerSwing[1])) {
                    document.querySelector(`#card-${activePlayer}-${cardCounter + helperCardCounter}`).src
                        = `images/${cards[cardCounter]}.png`;
                    actualResult[activePlayer] += parseInt(cards[cardCounter]);
                    document.querySelector(`#result-${activePlayer}`).textContent = actualResult[activePlayer];
                    cardCounter++;
                    helperCardCounter++;
                    if ((!playerSwing[0] || !playerSwing[1]) && (actualResult[activePlayer] > 21)) determineWinner(actualResult);
                }
            } else if (actualResult[activePlayer] === 21) {
                alert(`Napewno kolejna karta :-)?? Masz już oczko i ${actualResult[activePlayer]} punktów :-) Spasuj`)
            }
        }
    }

    //take point function
    function takePoints() {
        playerSwing[activePlayer] = false;
        activePlayer++;
        if (activePlayer === 2) activePlayer = 0;
        if (!playerSwing[0] && !playerSwing[1]) {
            determineWinner(actualResult);
        }
    }

    //winner determining
    function determineWinner(array) {
        if (array[0] < 21 && array[1] < 21) {
            if (array[0] > array[1]) {
                wins[0]++;
                wins0.textContent = wins[0];
                gameLostResults[1]++;
                lost1.textContent = gameLostResults[1];
                document.querySelector('.who-wins p').textContent = 'GRACZ 1 WYGRYWA!!';
                whoWinsPopup.style.display = 'flex';
            } else if (array[0] < array[1]) {
                wins[1]++;
                wins1.textContent = wins[1];
                gameLostResults[0]++;
                lost0.textContent = gameLostResults[0];
                document.querySelector('.who-wins p').textContent = 'GRACZ 2 WYGRYWA!!';
                whoWinsPopup.style.display = 'flex';
            } else {
                drawsCounter++;
                document.querySelector('#draw').textContent = drawsCounter;
                document.querySelector('.who-wins p').textContent = 'REMIS!!!!';
                whoWinsPopup.style.display = 'flex';
            }
        } else if (((array[0] === 22 || array[1] === 22) && cardCounter === 4) || (array[0] === 22 && array[1] === 22 
            && cardCounter === 4)) {
            if(array[0] ===22 && array[1] === 22) {
                drawsCounter++;
                document.querySelector('#draw').textContent = drawsCounter;
                document.querySelector('.congratulations_two_aces p').textContent = 'NIEBYWAŁY REMIS!!JAK SZÓSTKA W LOTTO!!DWA PERSKIE OCZKA!';
                twoAcesPopup.style.display = 'flex';
            } else if (array[0] === 22) {
                twoAcesResults[0]++;
                twoAces0.textContent = twoAcesResults[0];
                gameLostResults[1]++;
                lost1.textContent = gameLostResults[1];
                document.querySelector('.congratulations_two_aces p').textContent = ' PERSKIE OCZKO DLA GRACZA 1, KTÓRY WYGRYWA!!';
                twoAcesPopup.style.display = 'flex';
            } else if (array[1] === 22) {
                twoAcesResults[1]++;
                twoAces1.textContent = twoAcesResults[1];
                gameLostResults[0]++;
                lost1.textContent = gameLostResults[0];
                document.querySelector('.congratulations_two_aces p').textContent = ' PERSKIE OCZKO DLA GRACZA 2, KTÓRY WYGRYWA!!';
                twoAcesPopup.style.display = 'flex';
            }
        } else if ((array[0] === 21 || array[1] === 21) || (array[0] === 21 && array[1] === 21)){
            if(array[0] ===21 && array[1] === 21) {
                drawsCounter++;
                document.querySelector('#draw').textContent = drawsCounter;
                document.querySelector('.who-wins p').textContent = 'ALE REMIS!!!!DWA OCZKA';
                whoWinsPopup.style.display = 'flex';
            } else if (array[0] === 21) {
                twentyOnesResults[0]++;
                twentyOne0.textContent = twentyOnesResults[0];
                gameLostResults[1]++;
                lost1.textContent = gameLostResults[1];
                document.querySelector('.who-wins p').textContent = 'OCZKO DLA GRACZA 1, KTÓRY WYGRYWA!!';
                whoWinsPopup.style.display = 'flex';
            } else if (array[1] === 21) {
                twentyOnesResults[1]++;
                twentyOne1.textContent = twentyOnesResults[1];
                gameLostResults[0]++;
                lost1.textContent = gameLostResults[0];
                document.querySelector('.who-wins p').textContent = 'OCZKO DLA GRACZA 2, KTÓRY WYGRYWA!!';
                whoWinsPopup.style.display = 'flex';
            }
        } else if (array[0] >= 22 && cardCounter > 4) {
            wins[1]++;
            wins1.textContent = wins[1];
            gameLostResults[0]++;
            lost0.textContent = gameLostResults[0];
            document.querySelector('.who-wins p').textContent = 'GRACZ 2 WYGRYWA!!';
            whoWinsPopup.style.display = 'flex';
        } else if (array[1] >= 22 && cardCounter > 4){
            wins[0]++;
            wins0.textContent = wins[0];
            gameLostResults[1]++;
            lost1.textContent = gameLostResults[1];
            document.querySelector('.who-wins p').textContent = 'GRACZ 1 WYGRYWA!!';
            whoWinsPopup.style.display = 'flex';
        }
        gameCounter++;
        document.querySelector('#game_counter').textContent = gameCounter;
    }

    //buttons event listeners
    document.querySelectorAll('.start').forEach(btn => btn.addEventListener('click', startGame));
    document.querySelector('.take_card').addEventListener('click', takeCard);
    document.querySelector('.stop').addEventListener('click', takePoints);
})();