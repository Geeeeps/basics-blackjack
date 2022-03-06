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
var suits = ["diamonds", "clubs", "hearts", "spades"];
var cardName = "";
var cardRank = 0;
var counter = 0;
var randomNum = 0;
var gameMode = "dealCards";
var DEALCARDS = "dealCards";
var DETERMINEPLAYERACE = "determine ace";
var PLAYERTURN = "player turn";
var COMTURN = "com turn";
var DETERMINEWINNER = "determine winner";
var playerCards = [];
var comCards = [];
var comSum = 0;
var playerSum = 0;
var playerDrawnCards = "";
var comDrawnCards = "";

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

var determineBlackjack = function (card1, card2) {
  if (
    (card1 == "ace" &&
      (card2 == "ace" ||
        card2 == "jack" ||
        card2 == "queen" ||
        card2 == "king")) ||
    (card2 == "ace" &&
      (card1 == "ace" ||
        card1 == "jack" ||
        card1 == "queen" ||
        card1 == "king"))
  ) {
    var isItBlackjack = true;
  } else {
    isItBlackjack = false;
  }
  return isItBlackjack;
};

var determineAce01Or11 = function (cardNumber) {
  playerCards[cardNumber].rank = 11;
  return playerCards;
};

// Ace can be 1 or 11
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
    // playerCard1 = { name: "ace", suits: "diamonds", rank: 1 };
    // playerCard2 = { name: "jack", suits: "diamonds", rank: 10 };
    // comCard1 = { name: "7", suits: "diamonds", rank: 7 };
    // comCard2 = { name: "queen", suits: "diamonds", rank: 10 };
    playerCards.push(playerCard1, playerCard2);
    comCards.push(comCard1, comCard2);
    playerSum = calculatePlayerSum(playerCards);

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
    gameMode = PLAYERTURN;

    playerDrawnCards = `You have drawn: <br>
      Card 1: ${playerCards[0].name} of ${playerCards[0].suits} <br>
      Card 2: ${playerCards[1].name} of ${playerCards[1].suits} <br>`;
    comDrawnCards = `The computer has drawn: <br>
      Card 1: ${comCards[0].name} of ${comCards[0].suits} <br>
      Card 2: ${comCards[1].name} of ${comCards[1].suits} <br>`;

    myOutputValue = `Hello there!
      ${playerDrawnCards}<br>
      The total sum of your cards is ${playerSum} <br>
      Please enter 'hit' to draw a card or 'stand' to end your turn`;

    if (playerBlackjack == true && comBlackjack == true) {
      gameMode = DEALCARDS;
      myOutputValue =
        playerDrawnCards +
        comDrawnCards +
        `It's a draw! Both the computer and you have drawn Blackjack!<br> 
      Click on 'submit' to play another round.`;
      return myOutputValue;
    } else if (playerBlackjack == true && comBlackjack == false) {
      gameMode = DEALCARDS;
      myOutputValue = `Hello there! <br>
        ${playerDrawnCards}
        Blackjack! You win!<br>
      Click on 'submit' to play another round.`;
      return myOutputValue;
    } else if (comBlackjack == true && playerBlackjack == false) {
      gameMode = DEALCARDS;
      myOutputValue = `Hello there! <br>
        ${comDrawnCards}
      You lost! Computer got Blackjack!<br> 
      Click on 'submit' to play another round.`;
      return myOutputValue;
    } else if (playerCards[0].name == "ace" || playerCards[1].name == "ace") {
      gameMode = DETERMINEPLAYERACE;
      myOutputValue = `Hello there! <br>
      ${playerDrawnCards} <br>
      You may choose for your ace to be equals to 1 or 11. Please enter the ace card number '1' or '2' to be equal to 11.`;
    }
  } else if (gameMode == DETERMINEPLAYERACE) {
    var index = input - 1;
    if (playerCards[index].name != "ace") {
      return `The indicated card number is not an ace. Please enter the card number of the ace to be counted as 11`;
    } else if (playerCards[index].name == "ace") {
      var playerHandAce11 = determineAce01Or11(index);
      playerSum = calculatePlayerSum(playerHandAce11);
      gameMode = PLAYERTURN;
      myOutputValue = `The total sum of your cards is ${playerSum} <br>
    Please enter 'hit' to draw a card or 'stand' to end your turn`;
    } else return myOutputValue;
  } else if (gameMode == PLAYERTURN) {
    if (input == `hit`) {
      var playerCard3 = dealOneCard(deck);
      // playerCard3 = { name: "ace", suits: "diamonds", rank: 1 };
      playerCards.push(playerCard3);
      playerDrawnCards =
        playerDrawnCards +
        `Card 3: ${playerCard3.name} of ${playerCard3.suits}<br>`;
      if (playerCard3.name == "ace") {
        gameMode = DETERMINEPLAYERACE;
        myOutputValue = `Your next card is: <br>
      ${playerCard3.name} of ${playerCard3.suits}<br><br> ${playerDrawnCards}<br> 
      Please enter the ace card number to be counted as 11`;
      } else if (playerCard3.name != "ace") {
        playerSum = calculatePlayerSum(playerCards);
        console.log("playerSum " + playerSum);
        myOutputValue = `Your third card is:<br>
      ${playerCard3.name} of ${playerCard3.suits}<br><br> ${playerDrawnCards} <br>
      The total sum of your cards is ${playerSum}. <br>
      Please enter 'hit' to draw another card or 'stand' to end your turn.`;
      }
    } else if (input == `stand`) {
      gameMode = COMTURN;
      comSum = calculateComSum(comCards);
      console.log("comSum " + comSum);
      myOutputValue = `${comDrawnCards} <br>
      The total sum of the computer's cards is ${comSum} <br>
      Please click 'submit' for the computer to decide whether to 'hit' or 'stand'`;
    }
  } else if (gameMode == COMTURN) {
    if (comSum < 17) {
      var comCard3 = dealOneCard(deck);
      comCards.push(comCard3);
      comSum = calculateComSum(comCards);
      comDrawnCards = comDrawnCards + `${comCard3.name} of ${comCard3.suits}`;
      myOutputValue = `The computer has drawn a third card: <br><br> 
      ${comCard3.name} of ${comCard3.suits}<br><br>
      The total sum of the computer's cards is ${comSum} <br>
      Please click 'submit' for the computer to decide whether to 'hit' or 'stand'`;
    } else if (comSum >= 17) {
      gameMode = DETERMINEWINNER;
      myOutputValue = `The computer stands. Please click 'submit' again to view the results.`;
    }
  } else if (gameMode == DETERMINEWINNER) {
    if (comSum > 21 && playerSum > 21) {
      myOutputValue = `Draw!<br>
      ${playerDrawnCards} ${comDrawnCards}
      Both of you busted!`;
    }
    if (comSum > 21) {
      myOutputValue = `The computer busted!`;
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
