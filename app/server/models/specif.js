


class partie {

  #joueurs = []; // liste de joueurs
  #jeuDeCarte = []; // liste de l'ensemble des cartes
  #cartesMasque = []; // tableau de 5 cartes 
  #historiqueDesMises = []; // [{ idJoueur, sommeMisee }, ...]
  #mises = 0;
  #misesSecondaires = 0;
  #joueurCourant = 0;
  #revolution = 0;

  constructor() {
    return
  }


  /*
   * IN : [elt1, ...] liste a melanger
   * OUT : [elti, ...] liste melangee
   * FUNCTION : melange une liste
   */
  shuffle(liste) { }

  /*
   * PRE : la liste de carte est deja melange
   * IN : rien
   * OUT : rien
   * FUNCTION : distribu les cartes aux joueurs et selectionne les 5 cartes mystere
   */
  distrubuer() { }


  /*
   * IN : rien
   * OUT : { [c1, ..., c5], idJoueur } tableau de combinaison et identifiant du gagant
   * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
   */
  gagnant() { }


  /*
   * IN : rien
   * OUT : [j1, ...] liste des joueurs actifs
   * FUNCTION : renvoi la liste des joueurs actifs dans la partie
   */
  listeJoueursActifs() { }

  /*
   * IN : JOUEUR
   * OUT : { [c1, ..., c7], idJoueur } tableau des 7 cartes associe a l'id du joueur
   * FUNCTION : compose et renvoi le tableau de 7 cartes pour les combinaisons
   */
  fait7cartes(joueur) { }


  /*
   * IN : [j1, ...] liste des joueurs actifs
   * OUT : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
   * FUNCTION : renvoi le tableau des poids des combinaisons de chaque joueur
   */
  listeCombinaison(listeJoueursActifes) { }

  /*
   * IN : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
   * OUT : [{ poid, main, type }, ...] tableau du/des maximum(s) des poids
   * FUNCTION : tri et renvoi le ou les maximums des poids
   */
  maximums(listePoidMainJoueur) { }




  /*
   * IN : tableau de 7 cartes
   * OUT : objet { poid : NUMBER, type : STRING }
   * FUNCTION : trouve dans les 7 cartes la main la plus puissante
   */
  combinaison({ tableau7cartes, idJoueur }) {

    if (this.estQuinteFlushRoyale(tableau7cartes)) {
      return {
        poid: 15,
        main: [], // tableau de 5 cartes composant la main
        type: "quinteFlush"
      }
    }
  }

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent une quinte flush royale et renvoi la combianaison si elle est trouve.
   */
  estQuinteFlushRoyale(tableau7cartes) { }

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent une quinte flush et renvoi la combianaison si elle est trouve.
   */
  estQuinteFlush(tableau7cartes) { }

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent un carre et renvoi la combianaison si elle est trouve.
   */
  estCarre(tableau7cartes) {
    // Ordonne le tableau
    tableau7cartes.sort(function (a, b) {
      return b - a;
    });

    const compteur = {};
    let monCarre = 0;

    // Utiliser une boucle for pour parcourir le tableau de cartes
    for (let i = 0; i < tableau7cartes.length; i++) {
      const carte = tableau7cartes[i];

      if (!compteur[carte]) {
        compteur[carte] = 1; // Initialiser à 1 si la carte n'existe pas encore dans le compteur
      } else {
        compteur[carte] += 1; // Incrémenter si elle existe déjà

        // Si on trouve 4 cartes du même chiffre, alors c'est un carré
        if (compteur[carte] === 4) {
          // Recherche de la cinquième carte la plus élevée
          let plusHaut = 0;
          for (let j = 0; j < tableau7cartes.length; j++) {
            if (tableau7cartes[j] !== carte) {
              plusHaut = tableau7cartes[j];
              break;
            }
          }

          // Construire la main finale: le carré + la meilleure carte restante
          const maMain = new Array(4).fill(carte).concat(plusHaut);
          return maMain;
        }
      }
    }

    return false; // Retourner false si aucun carré n'est trouvé
  }



  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent un full et renvoi la combianaison si elle est trouve.
   */
  estFull(tableau7cartes) { }

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent une couleur et renvoi la combianaison si elle est trouve.
   */
  estCouleur(tableau7cartes) { }

  /*
   * ...
   */
  estSuite(tableau7cartes) { }

  /*
   * ...
   */
  estBrelan(tableau7cartes) { }

  /*
   * ...
   */
   estDoublePaire(tableau7cartes) {
    // Ordonne le tableau
    tableau7cartes.sort(function (a, b) {
      return b - a;
    });
  
    let maPaire1 = 0;
    let maPaire2 = 0;
    let verificateur = false;
    let plusHaut = 0;
  
    // Chercher mes cartes paires
    for (let i = 0; i < tableau7cartes.length - 1; i++) {
      if (tableau7cartes[i] === tableau7cartes[i + 1]) {
        if (maPaire1 === 0) {
          maPaire1 = tableau7cartes[i];
        } else {
          maPaire2 = tableau7cartes[i];
          verificateur = true;
        }
      }
    }
  
    // Chercher la carte haute
    if (verificateur) {
      for (let j = 0; j < tableau7cartes.length; j++) {
        if (tableau7cartes[j] !== maPaire1 && tableau7cartes[j] !== maPaire2) {
          plusHaut = tableau7cartes[j];
          break;
        }
      }
  
      // Construire la main finale: les deux paires + la meilleure carte restante
      const maMain = [maPaire1, maPaire1, maPaire2, maPaire2, plusHaut];
      return maMain;
    } else {
      // Retourne false si une double paire n'est pas trouvée
      return false;
    }
  }
  
  /*
   * ...
   */

  estPaire(tableau7cartes) {
    // Ordonne le tableau
    tableau7cartes.sort(function (a, b) {
      return b - a;
    });

    const maMain = new Array(5);
    let maPaire = 0;
    let verificateur = false;

    // Cherche la carte paire
    for (let i = 0; i < tableau7cartes.length - 1; i++) {
      if (tableau7cartes[i] === tableau7cartes[i + 1]) {
        maPaire = tableau7cartes[i];
        verificateur = true;
        break;
      }
    }

    if (verificateur) {
      let compteur = 0;

      // Complète la grille des 5 cartes avec les 3 plus grandes cartes.
      for (let t = 0; t < 5; t++) {
        maMain[t] = tableau7cartes[compteur];
        if (tableau7cartes[compteur] === maPaire) {
          maMain[++t] = maPaire;
          compteur += 2;
        }
      }

      // Retourne le tableau contenant la main avec la paire
      return maMain;
    } else {
      // Retourne false si aucune paire n'est trouvée
      return false;
    }
  }


  estQuarteHaute(tableau7cartes) { }



  // verification de deuxieme niveau
  // pas besoin pour le flush et le quinte flush

  /*
   * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
   * OUT : STRING ==> identifiant d' un joueur
   * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des carres
   */
  secondCarre(listeJoueurCombinaison) { }

  /*
   * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
   * OUT : STRING ==> identifiant d' un joueur
   * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des full
   */

    secondFull(listeJoueurCombinaison) {
      
      let meilleurId = tableauxAvecId[0].id;
      let meilleurTableau = tableauxAvecId[0].tableau;
    
      for (let i = 1; i < tableauxAvecId.length; i++) {
          const tableauCourant = tableauxAvecId[i].tableau;
    
          for (let j = 0; j < 5; j++) {
              if (tableauCourant[j] > meilleurTableau[j]) {
                  meilleurId = tableauxAvecId[i].id;
                  meilleurTableau = tableauCourant;
                  break;
              } else if (tableauCourant[j] < meilleurTableau[j]) {
                  break;
              }
          }
      }
    
      return meilleurId;
  }
  

  

  /*
   * ...
   */
  secondSuite(listeJoueurCombinaison) { }

  /*
   * ...
   */
  secondBrelan(listeJoueurCombinaison) { }

  /*
   * ...
   */
  secondDoublePaire(listeJoueurCombinaison) { 
    let meilleurId = tableauxAvecId[0].id;
    let meilleurTableau = tableauxAvecId[0].tableau;
  
    for (let i = 1; i < tableauxAvecId.length; i++) {
        const tableauCourant = tableauxAvecId[i].tableau;
  
        for (let j = 0; j < 5; j++) {
            if (tableauCourant[j] > meilleurTableau[j]) {
                meilleurId = tableauxAvecId[i].id;
                meilleurTableau = tableauCourant;
                break;
            } else if (tableauCourant[j] < meilleurTableau[j]) {
                break;
            }
        }
    }
  
    return meilleurId;
  }

  /*
   * ...
   */
  secondPaire(listeJoueurCombinaison) { }

  /*
   * ...
   */
  secondCarteHaute(listeJoueurCombinaison) { }



  /*
   * IN : rien
   * OUT : rien
   * FUNCTION : initialise la premiere partie
   */
  lancerPartie() { }

  /*
   * IN : rien
   * OUT : rien
   * FUNCTION : 
   *      - decales les utilisateurs
   *      - remet a 0 les historiques et les mises
   *      - reinitialise l'etat des joueurs et vider l'historique
   *      - remelanger et redistribuer les cartes
   */
  reset() { } // redemarer une partie


  /*
   * IN : rien
   * OUT : rien
   * FUNCTION : deroule UNE partie
   */
  deroulerPartie() { }
}


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
  getIdentifiant() { }

  /*
   * IN : rien
   * OUT : [{numero, famille},...] liste de 2 cartes
   * FUNCTION : retourne la liste des cartes du joueur
   */
  getCartes() { }

  /*
   * IN : rien
   * OUT : STRING, l'etat du joueur
   * FUNCTION : retourne l'etat courant du joueur
   */
  getEtat() { }

  /*
   * IN : "actif", "passif"
   * OUT : rien
   * FUNCTION : altere l'etat d'un joueur
   */
  setEtat(etat) { }

  /*
   * IN : [{numero, famille}, ...] liste de deux cartes
   * OUT : rien
   * FUNCTION : initialise les cartes du joueur
   */
  setCartes(listeCarte) { }

  /*
   * IN : NUMBER somme a miser
   * OUT : rien
   * FUNCTION : deduire la somme misee de la somme des jetons
   */
  miser(somme) { }

  /*
   * IN : STRING NUMBER, une action et une mise 
   * OUT : rien
   * FUNCTION : ajoute a l'historique du joueur l'action effectue et la mise associe
   */
  action(action, mise) { }

  constructor(identifiant) {
    this.identifiant = identifiant;
  }
}