//Variables

const cards = document.getElementsByClassName('card');

const match = document.getElementsByClassName('match');

const deck = document.querySelector('.deck');

const modal = document.querySelector('.modal');

const rest = document.querySelector('.rest');

let mins = document.querySelector('.minutes');

let secs = document.querySelector('.seconds');

let restart = document.querySelector('.restart');

let moves = document.querySelector('.moves');

let movesCounter = 0;

let stars = document.querySelectorAll('.fa-star');

let closeButton = document.querySelector('.close');

let modalMoves = document.querySelector('.moves-span');

let modalTime = document.querySelector('.times-span');

let rating = document.querySelector('.rating-span');


//A list that holds the cards

let cardList = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

//Array to store opened cards (Max 2, then is reseted for a new match)

let openedCards = [];

//Array to store cards once they are already matched

let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Display the shuffled cards on the page

function startGame() {

    let newCardList = shuffle(cardList);

    for (let i = 0; i < newCardList.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class ="${cardList[i]}"></i>`
        deck.appendChild(card);
    }
}

startGame();

// Event Listener to flip cards

function flipCards() {
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', checkPair);

        function checkPair() {

            //Condition that checks if max 2 cards were clicked

            if (openedCards.length === 1) {
                cards[i].classList.add('open', 'show', 'disabled');

                openedCards.push(cards[i]);
            
                // Condition that checks if clicked cards match

                if(openedCards[0].innerHTML === openedCards[1].innerHTML) {
                    openedCards[0].classList.add('match');
                    openedCards[1].classList.add('match');

                    matchedCards.push(cards[i]);

                    addOne();
                    removeStars();

                    //Array resets after the 2nd card is clicked.

                    openedCards = [];

                    // Is the game Over? Every card has found it's pair?

                    gameOver();


                } else {

                    //If cards don't match, 0.5sec later they are flipped back and the array is reseted for a new match.  

                    setTimeout(function flipBack () {
                        openedCards[0].classList.remove('open', 'show', 'disabled');
                        openedCards[1].classList.remove('open', 'show', 'disabled');

                        addOne();
                        removeStars();

                        openedCards = [];

                    }, 500)              
                }

            // If only one was clicked, then it pushes it to the array

            } else {
                cards[i].classList.add('open', 'show', 'disabled');
                openedCards.push(cards[i]);

            };
        };
    };
};

flipCards();

// Moves Counter

function addOne() {    
    movesCounter++;
    moves.innerHTML = movesCounter;
    modalMoves.innerHTML = movesCounter;

}

// Stack Overflow Timer (https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript/7910506)


let totalSeconds = 0;

let intervalo = setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secs.innerHTML = pad(totalSeconds % 60);
    mins.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
    } else {
    return valString;
    }
}


// If every card has a match, a Game Over pop up will show.

function gameOver() {
    if(matchedCards.length === 8) {

        clearInterval(intervalo);

        modalTime.innerHTML = `${mins.innerHTML}:${secs.innerHTML}`;

        modal.style.display = 'flex';

        rest.addEventListener('click', restartGame);
                
    }
}

gameOver();

// Rating System

let removeStars = function () {
    if (movesCounter === 15) {
        stars[0].classList.remove('fa-star');
        rating.innerHTML = 2; 
    } else if (movesCounter === 20) {
        stars[1].classList.remove('fa-star');
        rating.innerHTML = 1; 
    } 
}
   

// Restart buttons event listener

restart.addEventListener('click', restartGame);
rest.addEventListener('click', restartGame);

function restartGame() {

    // Remove Cards (Otherwise they will duplicate inside the deck)

    deck.innerHTML = '';

    //Start Again

    startGame();
    flipCards();

    //Reset Timer

    mins.innerHTML = '00';
    secs.innerHTML = '00';
    clearInterval(intervalo);
    totalSeconds = 0;
    intervalo = setInterval(setTime, 1000);

    //Reset Stars (TODO: Try to improve this way)

    stars[0].classList.add('fa-star');
    stars[1].classList.add('fa-star');



    //Opened Cards and Matched Cards back to 
    
    openedCards = [];

    matchedCards = [];

    //Moves back to 0 
    
    movesCounter = 0;
    moves.innerHTML = movesCounter;
    modalMoves.innerHTML = movesCounter;
  
    // Modal Dissapears
    modal.style.display = 'none';
   
}

//Close button on modal

closeButton.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
};

/*
* BUGS TO REPAIR
*
*   If cards are spammed, they dont flip back.
*
*
*
*
*/
