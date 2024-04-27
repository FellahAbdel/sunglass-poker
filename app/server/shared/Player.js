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

  constructor(
    playerId,
    name,
    status = "Playing",
    currentBet = 0,
    isActive = true
  ) {
    this.playerId = playerId;
    this.name = name;
    this.status = status;
    this.playerCards = [];
    this.playerActionLog = [];
    this.currentBet = currentBet;
    this.isActive = isActive;
  }

  statusFor(id) {
    const view = {
      playerId: this.playerId,
      name: this.name,
      status: this.status,
      currentBet: this.currentBet,
      isActive: this.isActive,
      timeLastAnswer: this.timeLastAnswer,
      playerMoney: this.playerMoney,
      playerCards: this.playerCards.map((card, index) => this.cardsVisible[index] || id === this.playerId ? card : null),
      playerActionLog: this.playerActionLog
    };
    return view;
  }

  revealCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = true;
    }
  }

  hideCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = false;
    }
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

  /*
   * IN : NUMBER somme a miser
   * OUT : rien
   * FUNCTION : déduire la somme misée de la somme des moneys
   */
  bet(moneyToBet) {
    this.playerMoney -= moneyToBet;
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
  }

  clearHand() {
    this.playerCards = [];
  }

  isPlayerActive() {
    return this.playerState === "active";
  }

  newRoundReset() {
    this.clearHand();
    this.playerActionLog = [];
    this.currentBet = 0;
    this.isActive = true;
    // Ajouter d'autres réinitialisations si nécessaire
  }
}

module.exports = Player;
