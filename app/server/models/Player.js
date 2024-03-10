<<<<<<< HEAD
class Joueur {

  #identifiant = 0;
  #etat = "";
  #jeton = 1000;
  #carte = []; // tableau de deux cartes
  #historique = [
      [], // {action, mise} ex: [{"fold", 0}, {"mise", 120}, ...]
  ]; // 

  /*
   * IN : rien
   * OUT : NUMBER identifiant
   * FUNCTION : retourne l'identifiant du joueur
   */
  getIdentifiant() {}

  /*
   * IN : rien
   * OUT : [{numero, famille},...] liste de 2 cartes
   * FUNCTION : retourne la liste des cartes du joueur
   */
  getCartes() {}

  /*
   * IN : rien
   * OUT : STRING, l'etat du joueur
   * FUNCTION : retourne l'etat courant du joueur
   */
  getEtat() {}
=======
class Player {
  #playerId = 0;
  #playerState = "";
  #playerMoney = 1000;
  #playerCards = []; // tableau de deux cartes au maximum
  #playerActionLog = [
    // {action, mise} ex: [{"fold", 0}, {"raise", 120}, ...]
  ]; //

  constructor(playerId) {
    this.#playerId = playerId;
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
>>>>>>> feature/back-end-function-merge

  /*
   * IN : "actif", "passif"
   * OUT : rien
<<<<<<< HEAD
   * FUNCTION : altere l'etat d'un joueur
   */
  setEtat (etat) {}

  /*
   * IN : [{numero, famille}, ...] liste de deux cartes
   * OUT : rien
   * FUNCTION : initialise les cartes du joueur
   */
  setCartes(listeCarte) {}
=======
   * FUNCTION : altère l'état d'un joueur
   */
  setPlayerState(state) {
    this.#playerState = state;
  }

  /*
   * IN : [{numéro, famille}, ...] liste de deux cartes
   * OUT : rien
   * FUNCTION : initialise les cartes du joueur
   */
  setCards(randomCardsList) {
    this.#playerCards = randomCardsList;
  }
>>>>>>> feature/back-end-function-merge

  /*
   * IN : NUMBER somme a miser
   * OUT : rien
<<<<<<< HEAD
   * FUNCTION : deduire la somme misee de la somme des jetons
   */
  miser(somme) {}

  /*
   * IN : STRING NUMBER, une action et une mise 
   * OUT : rien
   * FUNCTION : ajoute a l'historique du joueur l'action effectue et la mise associe
   */
  action(action, mise) {}

  constructor (identifiant) {
      this.identifiant = identifiant;
  }
}


=======
   * FUNCTION : déduire la somme misée de la somme des moneys
   */
  bet(moneyToBet) {
    this.#playerMoney -= moneyToBet;
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

p = new Player(1);
p.setPlayerState("actif");
console.log(p.getPlayerId());
console.log(p.getPlayerState());
p.action("raise", 100);
// console.log(p.#playerActionLog);
>>>>>>> feature/back-end-function-merge
