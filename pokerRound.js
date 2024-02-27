class PokerRound {
  #joueurs = []; // liste de joueurs
  #jeuDeCarte = []; // liste de l'ensemble des cartes
  #cartesMasque = []; // tableau de 5 cartes
  #historiqueDesMises = []; // [{ idJoueur, sommeMisee }, ...]
  #mises = 0;
  #misesSecondaires = 0;
  #joueurCourant = 0;
  #revolution = 0;

  constructor() {
    return;
  }

  /*
   * IN : [elt1, ...] liste a melanger
   * OUT : [elti, ...] liste melangee
   * FUNCTION : melange une liste
   */
  shuffle(liste) {}

  /*
   * PRE : la liste de carte est deja melange
   * IN : rien
   * OUT : rien
   * FUNCTION : distribu les cartes aux joueurs et selectionne les 5 cartes mystere
   */
  distrubuer() {}

  /*
   * IN : rien
   * OUT : { [c1, ..., c5], idJoueur } tableau de combinaison et identifiant du gagant
   * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
   */
  gagnant() {}

  /*
   * IN : rien
   * OUT : [j1, ...] liste des joueurs actifs
   * FUNCTION : renvoi la liste des joueurs actifs dans la partie
   */
  listeJoueursActifs() {}

  /*
   * IN : JOUEUR
   * OUT : { [c1, ..., c7], idJoueur } tableau des 7 cartes associe a l'id du joueur
   * FUNCTION : compose et renvoi le tableau de 7 cartes pour les combinaisons
   */
  fait7cartes(joueur) {}

  /*
   * IN : [j1, ...] liste des joueurs actifs
   * OUT : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
   * FUNCTION : renvoi le tableau des poids des combinaisons de chaque joueur
   */
  listeCombinaison(activePlayers) {
    return activePlayers.map((player) => {
      return this.combinaison(this.fait7cartes(player));
    });
  }

  /*
   * IN : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
   * OUT : [{ poid, main, type }, ...] tableau du/des maximum(s) des poids
   * FUNCTION : tri et renvoi le ou les maximums des poids
   */
  maximums(listePoidMainJoueur) {}

  /*
   * IN : tableau de 7 cartes
   * OUT : objet { poid : NUMBER, type : STRING }
   * FUNCTION : trouve dans les 7 cartes la main la plus puissante
   */
  combinaison({ tableau7cartes, idJoueur }) {
    // Triez les cartes par valeur (de la plus basse à la plus élevée)
    tableau7cartes.sort((a, b) => a.value - b.value);

    // Appelez des fonctions pour vérifier chaque type de main dans l'ordre de puissance
    const functionsToCall = [
      this.isRoyalFlush,
      this.isStraightFlush,
      this.isFourOfAKind,
      this.isFullHouse,
      this.isFlush,
      this.isStraight,
      this.isThreeOfAKind,
      this.isTwoPair,
      this.isOnePair,
      this.isHighCard,
    ];

    let bestHand = { handType: [], weight: -1 };

    for (let fn of functionsToCall) {
      const hand = fn(tableau7cartes);
      if (hand) {
        if (hand.weight > bestHand.weight) {
          bestHand = hand;
        }
      }
    }

    return bestHand;
  }

  /*
   * IN : tableau de 7 cartes
   * OUT : {[], weight}, objet contenant le tableau qui composent la main. Au plus 5 et le poids associé | False si rien trouve
   * FUNCTION : determine si les 7 possèdent une quinte flush royale et renvoi la combinaison si elle est trouve.
   */
  isRoyalFlush(cards) {
    // Définir les symboles et valeurs des cartes royales
    const royalValues = new Set([10, 11, 12, 13, 14]);
    const royalSymbols = new Set(["C", "D", "H", "S"]); // Cœur, Carreau, Trèfle, Pique

    // Vérifier si les 7 cartes contiennent une quinte flush royale
    for (let symbol of royalSymbols) {
      const royalFlush = [];
      for (let value of royalValues) {
        // Vérifier si la carte royale actuelle est présente dans les 7 cartes
        const royalCard = cards.find(
          (card) => card.symbol === symbol && card.value === value
        );
        if (royalCard) {
          royalFlush.push(royalCard);
        } else {
          break; // S'il manque une carte royale, pas de quinte flush royale
        }
      }
      // Si nous avons trouvé une quinte flush royale, renvoyer les cartes
      if (royalFlush.length === 5) {
        return { handType: royalFlush, weight: 10 };
      }
    }
    // Si aucune quinte flush royale n'est trouvée, renvoyer false
    return false;
  }

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent une quinte flush et renvoi la combianaison si elle est trouve.
   */
  estQuinteFlush(tableau7cartes) {}

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent un carre et renvoi la combianaison si elle est trouve.
   */
  estCarre(tableau7cartes) {}

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent un full et renvoi la combianaison si elle est trouve.
   */
  estFull(tableau7cartes) {}

  /*
   * IN : tableau de 7 cartes
   * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
   * FUNCTION : determine si les 7 possedent une couleur et renvoi la combianaison si elle est trouve.
   */
  estCouleur(tableau7cartes) {}

  /*
   * ...
   */
  estSuite(tableau7cartes) {}

  /*
   * ...
   */
  estBrelan(tableau7cartes) {}

  /*
   * ...
   */
  estDoublePaire(tableau7cartes) {}

  /*
   * ...
   */
  estPaire(tableau7cartes) {}

  /*
   * ...
   */
  estQuarteHaute(tableau7cartes) {}

  // verification de deuxieme niveau
  // pas besoin pour le flush et le quinte flush

  /*
   * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
   * OUT : STRING ==> identifiant d' un joueur
   * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des carres
   */
  secondCarre(listeJoueurCombinaison) {}

  /*
   * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
   * OUT : STRING ==> identifiant d' un joueur
   * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des full
   */
  secondFull(listeJoueurCombinaison) {}

  /*
   * ...
   */
  secondSuite(listeJoueurCombinaison) {}

  /*
   * ...
   */
  secondBrelan(listeJoueurCombinaison) {}

  /*
   * ...
   */
  secondDoublePaire(listeJoueurCombinaison) {}

  /*
   * ...
   */
  secondPaire(listeJoueurCombinaison) {}

  /*
   * ...
   */
  secondCarteHaute(listeJoueurCombinaison) {}

  /*
   * IN : rien
   * OUT : rien
   * FUNCTION : initialise la premiere partie
   */
  lancerPartie() {}

  /*
   * IN : rien
   * OUT : rien
   * FUNCTION :
   *      - decales les utilisateurs
   *      - remet a 0 les historiques et les mises
   *      - reinitialise l'etat des joueurs et vider l'historique
   *      - remelanger et redistribuer les cartes
   */
  reset() {} // redemarer une partie

  /*
   * IN : rien
   * OUT : rien
   * FUNCTION : deroule UNE partie
   */
  deroulerPartie() {}
}

// Exemple d'utilisation
// const hand = [
//   { symbol: "H", value: 10 },
//   { symbol: "H", value: 11 },
//   { symbol: "H", value: 12 },
//   { symbol: "H", value: 13 },
//   { symbol: "H", value: 14 },
//   { symbol: "D", value: 2 },
//   { symbol: "H", value: 9 },
// ];
// const pokerRound = new pokerRound();

// console.log(pokerRound.isRoyalFlush(hand)); // Devrait renvoyer les cinq cartes royales si une quinte flush royale est trouvée, sinon false

function isRoyalFlush(cards) {
  // Définir les symboles et valeurs des cartes royales
  const royalValues = new Set([10, 11, 12, 13, 14]);
  const royalSymbols = new Set(["C", "D", "H", "S"]); // C: Club, D: Diamond, H: Heart, S: Spade
  // Cœur/heart, Carreau/diamond, Trèfle/club, Pique/spade

  // Vérifier si les 7 cartes contiennent une quinte flush royale
  for (let symbol of royalSymbols) {
    const royalFlush = [];
    for (let value of royalValues) {
      // Vérifier si la carte royale actuelle est présente dans les 7 cartes
      // Trouve le première carte vérifiant la condition
      const royalCard = cards.find(
        (card) => card.symbol === symbol && card.value === value
      );
      //   console.log(royalCard);
      if (royalCard) {
        royalFlush.push(royalCard);
      } else {
        break; // S'il manque une carte royale, pas de quinte flush royale
      }
    }
    // Si nous avons trouvé une quinte flush royale, renvoyer les cartes
    if (royalFlush.length === 5) {
      return { royalFlushHand: royalFlush, weight: 10 };
    }
  }
  // Si aucune quinte flush royale n'est trouvée, renvoyer false
  return false;
}

// Exemple d'utilisation
const hand = [
  { symbol: "H", value: 10 },
  { symbol: "H", value: 11 },
  { symbol: "H", value: 12 },
  { symbol: "H", value: 13 },
  { symbol: "H", value: 14 },
  { symbol: "D", value: 2 },
  { symbol: "H", value: 9 },
];

console.log(isRoyalFlush(hand)); // Devrait renvoyer les cinq cartes royales si une quinte flush royale est trouvée, sinon false
