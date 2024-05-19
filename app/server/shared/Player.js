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
        console.log("proxyMoney called");
        if (property === "playerMoney") {
          target
            .updateMoneyInDatabase(value - target.playerMoney)
            .then(() => {
              target.playerMoney = value;
            })
            .catch((error) => {
              console.error("Failed to update money in database:", error);
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

  async updateMoneyInDatabase(coinsToAdd) {
    const result = await this.updateUserCoins(this.playerId, coinsToAdd);
    if (!result.success) {
      throw new Error(result.message);
    }
  }

  setAfk() {
    this.isAfk = true;
    this.isActive = false;
  }
  unsetAfk() {
    this.isAfk = false;
    this.isActive = true;
  }

  setTapis() {
    this.isTapis = true;
  }

  unsetTapis() {
    this.isTapis = false;
  }

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

  revealCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = true;
    }
  }

  canJoinTable() {
    return this.getPlayerMoney() > 40;
  }

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

  movePlayerToSpectator() {
    this.newRoundReset();
    this.isSpectator = true;
    this.isActive = false;
  }

  hideCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = false;
    }
  }

  seRemplirLesPoches(total) {
    this.localMoney += total;
  }

  settimeLastAnswer(t) {
    this.timeLastAnswer = t;
  }
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

  clearHand() {
    this.playerCards = [];
  }

  isPlayerActive() {
    return this.playerState === "active";
  }

  fold() {
    this.talkedThisTurn = true;
    this.status = "folded";
    this.isActive = false;
  }

  check() {
    this.talkedThisTurn = true;
    this.status = "checked";
  }

  call() {
    this.talkedThisTurn = true;
    this.status = "call";
  }

  playing() {
    this.status = "playing";
  }

  raise() {
    this.talkedThisTurn = true;
    this.status = "raise";
  }

  jesuislewinner() {
    this.status = "winner";
  }

  tapis(amount) {
    this.talkedThisTurn = true;
    this.status = "tapis";
    this.currentBet = amount;
    this.currentBetTurn += amount;
    this.betTotal += amount;
    this.localMoney = 0;
  }

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

  betinitial(amount) {
    if (this.localMoney >= amount) {
      this.currentBet = amount;
      this.currentBetTurn += amount;
      this.localMoney -= amount;
      this.betTotal += amount;
      //status a definir:
      // this.status = "raise";
    }
  }

  betBonus(amount) {
    if (this.localMoney > amount) {
      this.localMoney -= amount;
      this.betTotal += amount;
    }
  }

  newRoundReset() {
    this.clearHand();
    this.playerActionLog = [];
    this.currentBet = 0;
    this.currentBetTurn = 0;
    this.isActive = true;
    // this.isAfk = false;
    this.alreadyWon = false;
    this.cardsVisible = [false, false];
    this.status = "Playing";
    this.betTotal = 0;
    this.talkedThisTurn = false;
    this.decrementalTotal = undefined;
    this.playerMoney = this.localMoney;
    // Ajouter d'autres réinitialisations si nécessaire
  }

  newTurnReset() {
    this.talkedThisTurn = false;
    this.currentBetTurn = 0;
  }
}

module.exports = Player;
