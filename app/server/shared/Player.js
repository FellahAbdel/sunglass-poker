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
  playerBonus = {H:0, D:0, C:0, S:0, ready:false};

  constructor(
    playerId,
    name,
    coins,
    status = "Playing",
    currentBet = 0,
    currentBetTurn = 0,
    betTotal=0,
    isActive = true,
    isSpectator = false,
    isTapis=false
  ) {
    this.playerId = playerId;
    this.name = name;
    this.status = status;
    this.playerCards = [];
    this.playerActionLog = [];
    this.currentBet = currentBet;
    this.currentBetTurn = currentBetTurn;
    this.betTotal=betTotal;
    this.isActive = isActive;
    this.isYou = false;
    this.isAfk = false;
    this.isTapis=isTapis;
    this.isSpectator = isSpectator;
    this.playerMoney=coins;
  }

  setAfk(){
    this.isAfk = true;
    this.isActive = false;
  }
  unsetAfk(){
    this.isAfk = false;
    this.isActive = true;
  }

  setTapis(){
    this.isTapis = true;
  }

  unsetTapis(){
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
      playerMoney: this.playerMoney,
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
  toggleSpectator() {
    this.isSpectator = !this.isSpectator;
    if (this.isSpectator) {
      this.isActive = false;
    }
  }

  hideCard(cardIndex) {
    if (this.playerCards.length > cardIndex) {
      this.cardsVisible[cardIndex] = false;
    }
  }

  seRemplirLesPoches(total) {
    this.playerMoney += total;
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

  /*
   * IN : NUMBER somme a miser
   * OUT : rien
   * FUNCTION : déduire la somme misée de la somme des moneys
   */
  // bet(moneyToBet) {
  //   this.playerMoney -= moneyToBet;
  // }

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

    if (this.playerBonus.H === this.bonusMax && this.playerBonus.D === this.bonusMax
        && this.playerBonus.S === this.bonusMax && this.playerBonus.C === this.bonusMax
    ) this.playerBonus.ready = true;
  }

  clearHand() {
    this.playerCards = [];
  }

  isPlayerActive() {
    return this.playerState === "active";
  }

  fold() {
    this.status = "folded";
    this.isActive = false;
  }

  check() {
    this.status = "checked";
  }

  call() {
    this.status = "call";
  }

  
  playing() {
    this.status = "playing";
  }
  
  raise() {
    this.status = "raise";
  }
  
  jesuislewinner() {
    this.status = "winner";
  }

  tapis(amount){
    this.status="tapis";
    this.currentBet = amount;
    this.currentBetTurn += amount;
    this.betTotal += amount;
    this.playerMoney -= amount;
  }
  
  bet(amount) {
    if (this.playerMoney > amount) {
      this.currentBet = amount;
      this.currentBetTurn += amount;
      this.playerMoney -= amount;
      this.status = "call";
      this.betTotal+=amount;
    }
  }

  betinitial(amount) {
    if (this.playerMoney > amount) {
      this.currentBet = amount;
      this.currentBetTurn += amount;
      this.playerMoney -= amount;
      this.betTotal+=amount;
      //status a definir:
      // this.status = "raise";
    }
  }

  betBonus(amount) {
    if (this.playerMoney > amount) {
      this.playerMoney -= amount;
    }
  }

  newRoundReset() {
    this.clearHand();
    this.playerActionLog = [];
    this.currentBet = 0;
    this.currentBetTurn = 0;
    this.isActive = true;
    this.cardsVisible = [false, false];
    this.status = "Playing";
    this.betTotal=0;
    // Ajouter d'autres réinitialisations si nécessaire
  }

  newTurnReset() {
    this.currentBetTurn = 0;
  }
}

module.exports = Player;
