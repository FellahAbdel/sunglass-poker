export class Player {
  #playerId = 0;
  #playerState = "";
  #playerMoney = 1000;
  #playerCards = []; // tableau de deux cartes au maximum
  #playerTotalBet = 0;
  #playerActionLog = [
    // {action, mise} ex: [{"fold", 0}, {"raise", 120}, ...]
  ]; //

  constructor(playerId, playerState, playerMoney) {
    this.#playerId = playerId;
    this.#playerState = playerState;
    this.#playerMoney = playerMoney;
  }

  /*
   * IN : rien
   * OUT : NUMBER playerId
   * FUNCTION : retourne l'playerId du joueur
   */
  getPlayerId() {
    return this.#playerId;
  }

  /*
   * IN : rien
   * OUT : [{numéro, famille},...] liste de 2 cartes
   * FUNCTION : retourne la liste des cartes du joueur
   */
  getPlayerCards() {
    return this.#playerCards;
  }

  /*
   * IN : rien
   * OUT : STRING, l’état du joueur
   * FUNCTION : retourne l'état courant du joueur
   */
  getPlayerState() {
    return this.#playerState;
  }

  /*
   * IN : rien
   * OUT : NUMBER, la somme restante du joueur
   * FUNCTION : retourne l'état courant du joueur
   */
  getPlayerMoney() {
    return this.#playerMoney;
  }

  /*
   * IN : rien
   * OUT : NUMBER, la somme totale des paris du joueur
   * FUNCTION : retourne la somme totale des paris du joueur
   */
  getPlayerTotalBet () {
    return this.#playerTotalBet;
  }

  /*
   * IN : "actif", "passif"
   * OUT : rien
   * FUNCTION : altère l'état d'un joueur
   */
  setPlayerState(state) {
    this.#playerState = state;
  }

  /*
   * IN : NUMBER somme d'argent a initialiser
   * OUT : rien
   * FUNCTION : initialise la somme disponible du joueur
   */
  setPlayerMoney(amount) {
    this.#playerMoney = amount;
  }

  /*
   * IN : [{numéro, famille}, ...] liste de deux cartes
   * OUT : rien
   * FUNCTION : initialise les cartes du joueur
   */
  setCards(randomCardsList) {
    this.#playerCards = randomCardsList;
  }

  /*
   * IN : NUMBER somme a miser
   * OUT : rien
   * FUNCTION : déduire la somme misée de la somme des moneys
   */
  bet(moneyToBet) {
    this.#playerMoney -= moneyToBet;
    this.#playerTotalBet += moneyToBet;
  }

  /*
   * IN : NUMBER somme a crediter
   * OUT : rien
   * FUNCTION : ajouter une somme a celle du joueur
   */
  addMoney(amount) {
    this.#playerMoney += amount;
  }

  /*
   * IN : STRING NUMBER, une action et une mise
   * OUT : rien
   * FUNCTION : ajoute a l'historique du joueur l'action effectue et la mise associe
   */
  action(playerAction, playerMoneyBet) {
    this.#playerActionLog.push({ action: playerAction, bet: playerMoneyBet });
  }
}
