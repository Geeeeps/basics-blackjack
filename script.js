// Create a deck of cards
// Shuffle the deck
// Deal two cards to player and computer
// User determines whether to hit or stand
// If hit, deal player with another card
// If stand & if computer cards < 17, hit computer another card, else computer stands
// If sum of player cards > sum of com cards, player wins
// If sum of com cards > sum of player cards, com wins

var deck = [];
var suits = ["diamonds", "clubs", "hearts", "spades"];
var cardName = "";
var cardRank = 0;
var counter = 0;
var randomNum = 0;
var gameMode = "dealCards";
var DEALCARDS = "dealCards";
var PLAYERTURN = "player turn";
var COMTURN = "com turn";
var DETERMINEWINNER = "determine winner";
var playerCards = [];
var comCards = [];
var comSum = 0;
var playerSum = 0;

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

var calculateComSum = function (comCards) {
  counter = 0;
  comSum = 0;
  while (counter < comCards.length) {
    comSum = comSum + comCards[counter].rank;
    counter = counter + 1;
  }
  return comSum;
};

var calculatePlayerSum = function (playerCards) {
  counter = 0;
  playerSum = 0;
  while (counter < playerCards.length) {
    playerSum = playerSum + playerCards[counter].rank;
    counter = counter + 1;
  }
  return playerSum;
};

// if player or computer gets blackjack, game ends.
// else if player choose to hit or stand
var main = function (input) {
  var myOutputValue = "";
  if (gameMode == DEALCARDS) {
    var mixedDeck = shuffleDeck(deck);
    var playerCard1 = dealOneCard(deck);
    var comCard1 = dealOneCard(deck);
    var playerCard2 = dealOneCard(deck);
    var comCard2 = dealOneCard(deck);
    playerCards.push(playerCard1, playerCard2);
    comCards.push(comCard1, comCard2);
    playerSum = calculatePlayerSum(playerCards);
    console.log(mixedDeck);
    console.log("player cards " + playerCards[0].name + playerCards[0].suits);
    console.log("player cards " + playerCards[1].name + playerCards[1].suits);
    console.log("Computer cards " + comCards[0].name + comCards[0].suits);
    console.log("Computer cards " + comCards[1].name + comCards[1].suits);
    gameMode = PLAYERTURN;
    myOutputValue = `Hello there! <br>
      You have drawn: <br><br>
      ${playerCards[0].name} of ${playerCards[0].suits} <br>
      ${playerCards[1].name} of ${playerCards[1].suits} <br><br>
      The total sum of your cards is ${playerSum} <br>
      Please enter 'hit' to draw a card or 'stand' to end your turn`;
    if (
      (playerCards[0].name == "ace" &&
        (playerCards[1].name == "jack" ||
          playerCards[1].name == "queen" ||
          playerCards[1].name == "king")) ||
      (playerCards[1].name == "ace" &&
        (playerCards[0].name == "jack" ||
          playerCards[0].name == "queen" ||
          playerCards[0].name == "king"))
    ) {
      myOutputValue = "Blackjack! Player wins";
      return myOutputValue;
    } else if (
      (comCards[0].name == "ace" &&
        (comCards[1].name == "jack" ||
          comCards[1].name == "queen" ||
          comCards[1].name == "king")) ||
      (comCards[1].name == "ace" &&
        (comCards[0].name == "jack" ||
          comCards[0].name == "queen" ||
          comCards[0].name == "king"))
    ) {
      myOutputValue = "Blackjack! Computer wins";
      return myOutputValue;
    }
  } else if (gameMode == PLAYERTURN) {
    if (input == `hit`) {
      var playerCard3 = dealOneCard(deck);
      playerCards.push(playerCard3);
      playerSum = calculatePlayerSum(playerCards);
      console.log("playerSum " + playerSum);
      myOutputValue = `Your third card is:<br><br>
      ${playerCard3.name} of ${playerCard3.suits}<br><br>
      The total sum of your cards is ${playerSum} <br>
      Please enter 'hit' to draw another card or 'stand' to end your turn`;
    } else if (input == `stand`) {
      gameMode = COMTURN;
      comSum = calculateComSum(comCards);
      console.log("comSum " + comSum);
      myOutputValue = `The computer has drawn: <br><br>
      ${comCards[0].name} of ${comCards[0].suits}<br>
      ${comCards[1].name} of ${comCards[1].suits} <br><br>
      The total sum of the computer's cards is ${comSum} <br>
      Please click 'submit' for the computer to decide whether to 'hit' or 'stand'`;
    }
  } else if (gameMode == COMTURN) {
    if (comSum < 17) {
      var comCard3 = dealOneCard(deck);
      comCards.push(comCard3);
      comSum = calculateComSum(comCards);
      myOutputValue = `The computer has drawn a third card: <br><br> 
      ${comCard3.name} of ${comCard3.suits}<br><br>
      The total sum of the computer's cards is ${comSum} <br>
      Please click 'submit' for the computer to decide whether to 'hit' or 'stand'`;
    }
    gameMode = DETERMINEWINNER;
  } else if (gameMode == DETERMINEWINNER) {
    if (comSum > 21) {
      myOutputValue = `The computer loses!`;
    } else if (playerSum > 21) {
      myOutputValue = `You lose!`;
    } else if (comSum < playerSum) {
      myOutputValue = `You win!<br>
      The computer has drawn a total sum of ${comSum}<br>
      and you have drawn a total sum of ${playerSum}<br>`;
    } else if (comSum > playerSum) {
      myOutputValue = `The computer wins!<br>
      The computer has drawn a total sum of ${comSum}<br>
      and you have drawn a total sum of ${playerSum}<br>`;
    } else if (comSum == playerSum) {
      myOutputValue = `Draw!<br>
      Both the computer and you have drawn ${playerSum}!<br><br>
      Click 'submit' to start playing another round of blackjack.`;
    }
    gameMode = DEALCARDS;
  }

  return myOutputValue;
};
