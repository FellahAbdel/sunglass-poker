// Import necessary classes
const Game = require("./Game");
const Player = require("./Player");

// Create a new game instance
const pokerGame = new Game();

// Add players to the game
const player1 = new Player(1, "Alice");
player1.setPlayerState("active");

const player2 = new Player(2, "Bob");
player2.setPlayerState("active");

const player3 = new Player(3, "Charlie");
player3.setPlayerState("left");

pokerGame.addPlayer(player1);
pokerGame.addPlayer(player2);
pokerGame.addPlayer(player3);

const activePlayers = pokerGame.getActivePlayers();
console.log("Active players:");
activePlayers.forEach((player) => {
  console.log(player.name);
});
// Start the game
console.log("Starting the poker game...");
pokerGame.start();

// Show hands after dealing
console.log("Hands after dealing:");
pokerGame.showHands();

// Simulate some gameplay
console.log("Simulating gameplay...");
// Here you can add your own logic for betting rounds, player actions, etc.

// After the gameplay, show hands again
console.log("Hands after gameplay:");
pokerGame.showHands();
