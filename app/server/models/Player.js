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

  /*
   * IN : "actif", "passif"
   * OUT : rien
   * FUNCTION : altere l'etat d'un joueur
   */
  setEtat (etat) {}

  /*
   * IN : [{numero, famille}, ...] liste de deux cartes
   * OUT : rien
   * FUNCTION : initialise les cartes du joueur
   */
  setCartes(listeCarte) {}

  /*
   * IN : NUMBER somme a miser
   * OUT : rien
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


