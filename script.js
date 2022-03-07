// (Input 1): Player clicks submit to start the game
// - Create a deck of cards
// - Shuffle the deck
// - Deal two cards to player and computer
// (Output 1): Player sees the cards they are dealt with
// (Input 1): User determines whether to hit or stand
// - If hit, deal player with another card
// (Output 2a): Show player his new card and new sum
// - If stand, computer's turn
// (Output 2b): show computer cards
// (input 3): if computer cards < 17, hit computer another card, else computer stands
// (output 3a): (com hits) show computer new cards
// (output 3b): (com stands)
// - Determine winnind conditions
//   - If sum of player / com cards > 21, party loses
//   - If sum of player cards > sum of com cards, player wins
//   - If sum of com cards > sum of player cards, com wins

var deck = [];
var mixedDeck = [];
var suits = ["diamonds", "clubs", "hearts", "spades"];
var cardName = "";
var cardRank = 0;
var counter = 0;
var randomNum = 0;
var gameMode = "shuffle deck";
var SHUFFLEDECK = "shuffle deck";
var DEALCARDS = "deal cards";
var DETERMINEPLAYERACE = "determine ace";
var PLAYERTURN = "player turn";
var PLAYERHIT = "player hit";
var PLAYERSTAND = "player stand";
var COMTURN = "com turn";
var DETERMINEWINNER = "determine winner";
var playerCards = [];
var playerCardsAce11 = [];
var comCards = [];
var comSumAce01 = 0;
var comSumAce11 = 0;
var comFinalSum = 0;
var playerSumAce01 = 0;
var playerSumAce11 = 0;
var playerFinalSum = 0;
var playerDrawnCards = "";
var comDrawnCards = "";
var submitButton = document.querySelector("#submit-button");
var standButton = "";

var makeDeck = function () {
  var counter = 0;
  while (counter < suits.length) {
    var currentSuit = suits[counter];
    var cardCounter = 1;
    while (cardCounter <= 13) {
      cardName = cardCounter.toString();
      cardRank = cardCounter;
      if (cardCounter == 1) {
        cardName = "ace";
        cardRank = 1;
      } else if (cardCounter == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (cardCounter == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (cardCounter == 13) {
        cardName = "king";
        cardRank = 10;
      }
      var card = {
        name: cardName.toString(),
        suits: currentSuit,
        rank: cardRank,
      };
      deck.push(card);
      cardCounter = cardCounter + 1;
    }
    counter = counter + 1;
  }
  return deck;
};

deck = makeDeck();

//to shuffle the deck, generate a randomNum, swap the card associated with the randomNum within the deck with the last card. Put it into a loop to run 52 times.
var generateRandomNum = function (deckSize) {
  var randomNum = Math.floor(Math.random() * deckSize);
  return randomNum;
};

var shuffleDeck = function (deck) {
  counter = 0;
  while (counter < deck.length) {
    randomNum = generateRandomNum(deck.length);
    var card1 = deck[counter];
    var card2 = deck[randomNum];
    deck[counter] = card2;
    deck[randomNum] = card1;
    counter = counter + 1;
  }
  return deck;
};

// 3) Deal two cards to player and computer
var dealOneCard = function (deck) {
  var chosenNum = generateRandomNum(deck.length);
  var card = deck.pop(chosenNum);
  return card;
};

var determineBlackjack = function (card1, card2) {
  if (
    (card1 == "ace" &&
      (card2 == "jack" || card2 == "queen" || card2 == "king")) ||
    (card2 == "ace" && (card1 == "jack" || card1 == "queen" || card1 == "king"))
  ) {
    var isItBlackjack = true;
  } else {
    isItBlackjack = false;
  }
  return isItBlackjack;
};

var checkForAce = function (cards) {
  counter = 0;
  while (counter < cards.length) {
    if (cards[counter].name == "ace") {
      var isThereAce = true;
    }
    counter = counter + 1;
  }
  return isThereAce;
};

var calculateSumAce01 = function (cards) {
  counter = 0;
  var sumAce01 = 0;
  while (counter < cards.length) {
    sumAce01 = sumAce01 + cards[counter].rank;
    counter = counter + 1;
  }
  return sumAce01;
};

var calculateSumAce11 = function (cards) {
  counter = 0;
  var sumAce11 = 0;
  while (counter < cards.length) {
    sumAce11 = sumAce11 + cards[counter].rank;
    counter = counter + 1;
  }
  sumAce11 = sumAce11 + 10;
  return sumAce11;
};

var determineFinalSum = function (sumAce01, sumAce11) {
  if (sumAce11 > 21) {
    finalSum = sumAce01;
  } else if (sumAce11 <= 21) {
    finalSum = sumAce11;
  }
  return finalSum;
};

var endTurn = function () {
  gameMode = PLAYERSTAND;
  var input = document.querySelector("#input-field");
  var result = main(input.value);
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  input.value = "";
  return gameMode;
};

var insertAfter = function (newButton, currentButton) {
  currentButton.parentNode.insertBefore(newButton, currentButton.nextSibling);
};

var createButton = function () {
  var newButton = document.createElement("button");
  newButton.innerText = "Stand";
  newButton.addEventListener("click", endTurn);
  insertAfter(newButton, submitButton);
};

var getBlackJackImage = function () {
  var image =
    '<img src="https://i.pinimg.com/originals/6f/7a/43/6f7a43afaa6992391e51b7798881c845.png"/>';
  return image;
};

var getYouWinImage = function () {
  var image =
    '<img src="https://media.istockphoto.com/vectors/you-win-message-comic-speech-bubble-effects-in-pop-art-style-vector-id1249638308?k=20&m=1249638308&s=170667a&w=0&h=SPxO-C5UNyahFlfcopJEulCFIpXERSQqoUo1XX5nCAg="/>';
  return image;
};

var getYouLoseImage = function () {
  var image =
    '<img src ="https://png.pngitem.com/pimgs/s/208-2086644_you-lost-transparent-hd-png-download.png"/>';
  return image;
};

var getYouDrawImage = function () {
  var image =
    '<img src ="https://www.roomrecess.com/mobile/EggHeads/img/tieGame.png"/>';
  return image;
};

// if player or computer gets blackjack, game ends.
// else if player choose to hit or stand
var main = function (input) {
  var myOutputValue = "";
  if (gameMode == SHUFFLEDECK) {
    mixedDeck = [];
    mixedDeck = shuffleDeck(deck);
    submitButton.innerText = "deal cards";
    gameMode = PLAYERTURN;
    myOutputValue = "Please click on 'deal cards' to get your cards!";
  } else if (gameMode == PLAYERTURN) {
    var playerCard1 = dealOneCard(deck);
    var comCard1 = dealOneCard(deck);
    var playerCard2 = dealOneCard(deck);
    var comCard2 = dealOneCard(deck);

    // playerCard1 = { name: "8", suits: "diamonds", rank: 8 };
    // playerCard2 = { name: "10", suits: "diamonds", rank: 10 };
    // comCard1 = { name: "8", suits: "diamonds", rank: 8 };
    // comCard2 = { name: "queen", suits: "diamonds", rank: 10 };

    playerCards.push(playerCard1, playerCard2);
    comCards.push(comCard1, comCard2);
    var playerCardsAceCheck = checkForAce(playerCards);
    playerSumAce01 = calculateSumAce01(playerCards);

    var playerBlackjack = determineBlackjack(
      playerCards[0].name,
      playerCards[1].name
    );
    var comBlackjack = determineBlackjack(comCards[0].name, comCards[1].name);
    console.log(mixedDeck);
    console.log("player card 1 " + playerCards[0].name + playerCards[0].suits);
    console.log("player card 2 " + playerCards[1].name + playerCards[1].suits);
    console.log("Computer card 1 " + comCards[0].name + comCards[0].suits);
    console.log("Computer card 2 " + comCards[1].name + comCards[1].suits);

    gameMode = PLAYERHIT;

    submitButton.innerText = "Hit";
    standButton = createButton();

    playerDrawnCards = `You have drawn: <br>
      Card 1: ${playerCards[0].name} of ${playerCards[0].suits} <br>
      Card 2: ${playerCards[1].name} of ${playerCards[1].suits} <br>`;
    comDrawnCards = `The computer has drawn: <br>
      Card 1: ${comCards[0].name} of ${comCards[0].suits} <br>
      Card 2: ${comCards[1].name} of ${comCards[1].suits} <br>`;

    myOutputValue = `Hello there!
      ${playerDrawnCards}<br>
      The total sum of your cards is ${playerSumAce01} <br>
      Please click 'hit' to draw a card or 'stand' to end your turn`;

    //CHECK FOR BLACKJACK
    if (playerBlackjack == true && comBlackjack == true) {
      submitButton.innerText = "Next";
      gameMode = SHUFFLEDECK;
      myOutputValue =
        playerDrawnCards +
        comDrawnCards +
        `It's a draw! Both the computer and you have drawn Blackjack!<br> 
      Click on 'Next' to play another round.`;
      return myOutputValue;
    } else if (playerBlackjack == true && comBlackjack == false) {
      submitButton.innerText = "Next";
      gameMode = SHUFFLEDECK;
      var blackjackImage = getBlackJackImage();
      myOutputValue = `Hello there! <br>
        ${playerDrawnCards}
        Blackjack! You win!<br>
        ${blackjackImage}
      Click on 'Next' to play another round.`;
      return myOutputValue;
    } else if (comBlackjack == true && playerBlackjack == false) {
      submitButton.innerText = "Next";
      gameMode = SHUFFLEDECK;
      myOutputValue = `Hello there! <br>
        ${comDrawnCards}
      You lost! Computer got Blackjack!<br> 
      Click on 'Next' to play another round.`;
      return myOutputValue;
    } else if (playerCardsAceCheck == true) {
      playerSumAce11 = calculateSumAce11(playerCards);
      myOutputValue = `Hello there!
      ${playerDrawnCards} <br>
      The total sum of your cards is ${playerSumAce01} or ${playerSumAce11}<br>
      Please enter 'hit' to draw a card or 'stand' to end your turn`;
    }
  } else if (gameMode == PLAYERHIT) {
    var playerCard3 = dealOneCard(deck);
    // playerCard3 = { name: "10", suits: "diamonds", rank: 10 };
    playerCards.push(playerCard3);
    playerSumAce01 = calculateSumAce01(playerCards);
    var playerCardsAceCheck = checkForAce(playerCards);
    console.log("playerSumAce01 " + playerSumAce01);
    console.log("playerSumAce11 " + playerSumAce11);
    playerDrawnCards =
      playerDrawnCards +
      `Card 3: ${playerCard3.name} of ${playerCard3.suits}<br>`;
    myOutputValue = `Your third card is:<br>
      ${playerCard3.name} of ${playerCard3.suits}<br><br> ${playerDrawnCards} <br>
      The total sum of your cards is ${playerSumAce01}. <br><br>
      Please click 'hit' to draw another card or 'stand' to end your turn.`;

    if (playerCardsAceCheck == true) {
      playerSumAce11 = calculateSumAce11(playerCards);
      myOutputValue = `${playerDrawnCards} <br>
      The total sum of your cards is ${playerSumAce01} or ${playerSumAce11}<br><br>
      Please click 'hit' to draw a card or 'stand' to end your turn`;
    }
  } else if (gameMode == PLAYERSTAND) {
    submitButton.innerText = "Next";
    gameMode = COMTURN;
    comSumAce01 = calculateSumAce01(comCards);
    var comCardsAceCheck = checkForAce(comCards);
    console.log("comSum " + comSumAce01);
    myOutputValue = `${playerDrawnCards}<br>
      ${comDrawnCards} <br>
      The total sum of the computer's cards is ${comSumAce01}. <br><br>
      Please click 'Next' for the computer to decide whether to 'hit' or 'stand'`;

    if (comCardsAceCheck == true) {
      comSumAce11 = calculateSumAce11(comCards);
      myOutputValue = `${playerDrawnCards}<br>
        The total sum of the computer's cards is ${comSumAce01} or ${comSumAce11}. <br><br>
      Please click 'Next' and the computer will decide whether to 'hit' or 'stand'`;
    }
  } else if (gameMode == COMTURN) {
    if (comSumAce01 < 17 && comSumAce11 < 17) {
      var comCard3 = dealOneCard(deck);
      // comCard3 = { name: "9", suits: "diamonds", rank: 9 };
      comCards.push(comCard3);
      comSumAce01 = calculateSumAce01(comCards);
      var comCardsAceCheck = checkForAce(comCards);

      comDrawnCards =
        comDrawnCards + `${comCards[2].name} of ${comCards[2].suits}`;
      myOutputValue = `The computer has drawn a third card: <br><br> 
      ${comCard3.name} of ${comCard3.suits}<br><br>
      The total sum of the computer's cards is ${comSumAce01} <br>
      Please click 'Next' for the computer to decide whether to 'hit' or 'stand'`;

      if (comCardsAceCheck == true) {
        comSumAce11 = calculateSumAce11(comCards);
        myOutputValue = `The computer has drawn a third card: <br> 
      ${comCard3.name} of ${comCard3.suits}<br><br>
      ${comDrawnCards}<br>
      The total sum of the computer's cards is ${comSumAce01} or ${comSumAce11} <br>
      Please click 'Next' for the computer to decide whether to 'hit' or 'stand'`;
      }
    } else {
      gameMode = DETERMINEWINNER;
      myOutputValue = `The computer stands. Please click 'Next' again to view the results.`;
    }
  } else if (gameMode == DETERMINEWINNER) {
    playerSumAce11 = calculateSumAce11(playerCards);
    comSumAce11 = calculateSumAce11(comCards);
    playerFinalSum = determineFinalSum(playerSumAce01, playerSumAce11);
    comFinalSum = determineFinalSum(comSumAce01, comSumAce11);
    var youWin = getYouWinImage();
    var youLost = getYouLoseImage();
    var youDraw = getYouDrawImage();

    if (comFinalSum > 21 && playerFinalSum > 21) {
      myOutputValue = `Draw!<br>
      ${youDraw}<br><br>
      ${playerDrawnCards} <br>
      ${comDrawnCards}<br><Br>
      Both of you busted!`;
    } else if (comFinalSum > 21) {
      myOutputValue = `The computer busted!<br>
      ${youWin}<br><br>
      ${playerDrawnCards} <br>
      ${comDrawnCards}`;
    } else if (playerFinalSum > 21) {
      myOutputValue = `You busted!<br>
      ${youLost}<br><br>
       ${playerDrawnCards} <br>
       ${comDrawnCards}`;
    } else if (comFinalSum < playerFinalSum) {
      myOutputValue = `You win!<br>
      ${youWin}<br><br>
       ${playerDrawnCards}
      Your total sum is ${playerFinalSum}<br><br>
      ${comDrawnCards}
      Its total sum is ${comFinalSum}`;
    } else if (comFinalSum > playerFinalSum) {
      myOutputValue = `The computer wins!<br>
      ${youLost}<br><br>
       ${playerDrawnCards}
      Your total sum is ${playerFinalSum}<br><br>
      ${comDrawnCards}
      Its total sum is ${comFinalSum}`;
    } else if (comFinalSum == playerFinalSum) {
      myOutputValue = `Draw!<br>
      ${youDraw}<br><br>
      ${playerDrawnCards} <br> ${comDrawnCards}
      Both the computer and you have drawn ${playerFinalSum}!<br><br>
      Click 'Next' to start playing another round of blackjack.`;
    }
    gameMode = SHUFFLEDECK;
  }

  return myOutputValue;
};
