/**
 * @file Player.js
 * @module Player
 */
class Player {
  cardsVisible = [false, false];
  timeLastAnswer = 0;
  playerId = 0;
  playerState = "";
  playerMoney = 1000;
  playerCards = []; // tableau de deux cartes au maximum
  playerActionLog = [
    // {action, mise} ex: [{"fold", 0}, {"raise", 120}, ...]
  ]; //
  playerHandName = "";
  bonusMax = 2;
  playerBonus = { H: 0, D: 0, C: 0, S: 0, ready: false };

  constructor(
    playerId,
    name,
    coins,
    status = "Playing",
    currentBet = 0,
    currentBetTurn = 0,
    betTotal = 0,
    isActive = true,
    isSpectator = false,
    isTapis = false,
    alreadyWon = false
  ) {
    this.playerId = playerId;
    this.name = name;
    this.status = status;
    this.playerCards = [];
    this.playerActionLog = [];
    this.currentBet = currentBet;
    this.currentBetTurn = currentBetTurn;
    this.betTotal = betTotal;
    this.isActive = isActive;
    this.isYou = false;
    this.isAfk = false;
    this.isTapis = isTapis;
    this.isSpectator = isSpectator;
    this.playerMoney = coins;
    this.alreadyWon = alreadyWon;
    this.alltalkedThisTurn = false;
    this.localMoney = coins;
    this.decrementalTotal = undefined;

    return new Proxy(this, {
      set: (target, property, value) => {
        if (property === "playerMoney") {
          target
            .updateMoneyInDatabase(value - target.playerMoney)
            .then(() => {
              target.playerMoney = value;
            })
            .catch((error) => {
              csl.error("Failed to update money in database:", error);
            });
        } else {
          target[property] = value;
        }
        return true;
      },
      get: (target, property) => {
        if (property === "playerMoney") {
          return target.playerMoney;
        }
        return target[property];
      },
    });
  }

  /**
   * in the name
   * @param {int} coinsToAdd
   */
  async updateMoneyInDatabase(coinsToAdd) {
    const result = await this.updateUserCoins(this.playerId, coinsToAdd);
    if (!result.success) {
      throw new Error(result.message);
    }
  }

  /**
   * set the Player in AFK
   */
  setAfk() {
    this.isAfk = true;
    this.isActive = false;
  }

  /**
   * unset the AFK player
   */
  unsetAfk() {
    this.isAfk = false;
    this.isActive = true;
  }

  /**
   * Set the player allin
   */
  setTapis() {
    this.isTapis = true;
  }

  /**
   * Unset the allin player
   */
  unsetTapis() {
    this.isTapis = false;
  }

  /**
   * give all the status of the player
   * @param {id} id
   * @returns the info of the player id
   */
  statusFor(id) {
    const view = {
      playerId: this.playerId,
      name: this.name,
      status: this.status,
      currentBet: this.currentBet,
      currentBetTurn: this.currentBetTurn,
      isActive: this.isActive,
      isSpectator: this.isSpectator,
      timeLastAnswer: this.timeLastAnswer,
      playerMoney: this.localMoney,
      playerCards: this.playerCards.map((card, index) =>
        this.cardsVisible[index] || id === this.playerId ? card : null
      ),
      playerActionLog: this.playerActionLog,
      cardsVisible: this.cardsVisible,
      isYou: id === this.playerId ? true : false,
      playerHandName: this.playerHandName,
      playerBonus: this.playerBonus,
    };
    return view;
  }

  /**
   * reveal the player card index
   * @param {int} cardIndex
   */
  revealCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = true;
    }
  }

  /**
   * check if the player have enough money to join a game
   * @returns true if player have more than 40SC | false otherwise
   */
  canJoinTable() {
    return this.getPlayerMoney() > 40;
  }

  /**
   * change the player to spectator or unspecator
   * @returns
   */
  toggleSpectator() {
    if (this.isSpectator && !this.canJoinTable()) {
      this.movePlayerToSpectator();
      return;
    }
    if (!this.isSpectator) {
      this.movePlayerToSpectator();
      return;
    } else {
      this.isSpectator = false;
      this.isActive = true;
      return;
    }
  }

  /**
   * move the player to spectator and reset his status
   */
  movePlayerToSpectator() {
    this.newRoundReset();
    this.isSpectator = true;
    this.isActive = false;
  }

  /**
   * hide the playerCard index
   * @param {int} cardIndex
   */
  hideCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = false;
    }
  }

  /**
   * Put the pot in my pocket (when he win the game the player get the money)
   * @param {int} total
   */
  seRemplirLesPoches(total) {
    this.localMoney += total;
  }

  /**
   * Sets the time of the last answer.
   * @param {int} t - The time of the last answer.
   */
  settimeLastAnswer(t) {
    this.timeLastAnswer = t;
  }

  /**
   * Gets the time of the last answer.
   * @returns {int} - The time of the last answer.
   */
  gettimeLastAnswer() {
    return this.timeLastAnswer;
  }

  // Methods to get and set status
  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  /*
   * IN : rien
   * OUT : NUMBER playerId
   * FUNCTION : retourne l'playerId du joueur
   */
  getPlayerId() {
    return this.playerId;
  }

  /*
   * IN : rien
   * OUT : [{numéro, famille},...] liste de 2 cartes
   * FUNCTION : retourne la liste des cartes du joueur
   */
  getPlayerCards() {
    return this.playerCards;
  }

  /*
   * IN : rien
   * OUT : STRING, l’état du joueur
   * FUNCTION : retourne l'état courant du joueur
   */
  getPlayerState() {
    return this.playerState;
  }

  getPlayerMoney() {
    return this.playerMoney;
  }

  getPlayerActionLog() {
    return this.playerActionLog;
  }

  getPlayerBonus() {
    return this.playerBonus;
  }

  /**
   * Resets the player's bonus points to zero and marks them as not ready.
   */
  resetPlayerBonus() {
    this.playerBonus.C = 0;
    this.playerBonus.H = 0;
    this.playerBonus.D = 0;
    this.playerBonus.S = 0;
    this.playerBonus.ready = false;
  }

  /*
   * IN : "actif", "passif"
   * OUT : rien
   * FUNCTION : altère l'état d'un joueur
   */
  setPlayerState(state) {
    this.playerState = state;
  }

  /*
   * IN : [{numéro, famille}, ...] liste de deux cartes
   * OUT : rien
   * FUNCTION : initialise les cartes du joueur
   */
  setCards(randomCardsList) {
    this.playerCards = randomCardsList;
  }

  /**
   *
   * @returns how many the player bet in the turn
   */
  howmanyBetTurn() {
    return this.currentBetTurn;
  }

  /*
   * IN : STRING NUMBER, une action et une mise
   * OUT : rien
   * FUNCTION : ajoute a l'historique du joueur l'action effectue et la mise associe
   */
  action(playerAction, playerMoneyBet) {
    this.playerActionLog.push({ action: playerAction, bet: playerMoneyBet });
  }

  /**
   * add the card in the bonus of the player
   * @param {*} card
   */
  addCard(card) {
    this.playerCards.push(card);

    let color = card.getNumberAndColor()[1];
    if (this.playerBonus[color] < this.bonusMax) this.playerBonus[color]++;

    if (
      this.playerBonus.H === this.bonusMax &&
      this.playerBonus.D === this.bonusMax &&
      this.playerBonus.S === this.bonusMax &&
      this.playerBonus.C === this.bonusMax
    )
      this.playerBonus.ready = true;
  }

  /**
   * Clears the player's hand by removing all cards.
   */
  clearHand() {
    this.playerCards = [];
  }

  /**
   * Checks if the player is currently active.
   * @returns {boolean} - True if the player is active, otherwise false.
   */
  isPlayerActive() {
    return this.playerState === "active";
  }

  /**
   * Folds the player's hand, marking them as folded and inactive for the current round.
   */
  fold() {
    this.talkedThisTurn = true;
    this.status = "folded";
    this.isActive = false;
  }

  /**
   * Checks the player's hand, marking them as checked for the current round.
   */
  check() {
    this.talkedThisTurn = true;
    this.status = "checked";
  }

  /**
   * Calls the current bet, marking the player as having called for the current round.
   */
  call() {
    this.talkedThisTurn = true;
    this.status = "call";
  }

  /**
   * Marks the player as actively playing in the current round.
   */
  playing() {
    this.status = "playing";
  }

  /**
   * Raises the current bet, marking the player as having raised for the current round.
   */
  raise() {
    this.talkedThisTurn = true;
    this.status = "raise";
  }

  /**
   * put the winner status
   */
  jesuislewinner() {
    this.status = "winner";
  }

  /**
   * all in the player
   * @param {int} amount
   */
  tapis(amount) {
    this.talkedThisTurn = true;
    this.status = "tapis";
    this.currentBet = amount;
    this.currentBetTurn += amount;
    this.betTotal += amount;
    this.localMoney = 0;
  }

  /**
   * The player places a bet in the game.
   * @param {int} amount - amount of the bet
   */
  bet(amount) {
    if (this.localMoney >= amount) {
      this.talkedThisTurn = true;
      this.currentBet = amount;
      this.currentBetTurn += amount;
      this.localMoney -= amount;
      // this.status = "call";
      this.betTotal += amount;
    }
  }

  /**
   * special case of the bet for the initial blind
   * @param {int} amount
   */
  betinitial(amount) {
    if (this.localMoney >= amount) {
      this.currentBet = amount;
      this.currentBetTurn += amount;
      this.localMoney -= amount;
      this.betTotal += amount;
    }
  }

  /**
   * bet the bonus in the Total pot
   * @param {int} amount
   */
  betBonus(amount) {
    if (this.localMoney > amount) {
      this.localMoney -= amount;
      this.betTotal += amount;
    }
  }

  /**
   * Resets the player's state for a new round in the game.
   */
  newRoundReset() {
    this.clearHand();
    this.playerActionLog = [];
    this.currentBet = 0;
    this.currentBetTurn = 0;
    this.isActive = true;
    this.alreadyWon = false;
    this.isTapis = false;
    this.cardsVisible = [false, false];
    this.status = "Playing";
    this.betTotal = 0;
    this.talkedThisTurn = false;
    this.decrementalTotal = undefined;
    this.playerMoney = this.localMoney;
    // Ajouter d'autres réinitialisations si nécessaire
  }

  /**
   * Resets the player's state for a new turn.
   */
  newTurnReset() {
    this.talkedThisTurn = false;
    this.currentBetTurn = 0;
  }
}

module.exports = Player;
