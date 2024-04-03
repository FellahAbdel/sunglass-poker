class ScoreEngine {
  /*
   * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
   * OUT : STRING ==> identifiant d' un joueur
   * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des carres
   */
  secondCarre(listeJoueurCombinaison, self = this) {
    // je sais que cette liste contient deux elements

    let typeCarre = function (playerHand) {
      let type = {
        type: null,
        intruder: null,
        id: playerHand.id,
      };

      if (playerHand.hand[0].number === playerHand.hand[1].number) {
        type.type = playerHand.hand[0].number;
        // chercher l'intrus
        for (let i = 0; i < playerHand.hand.length; i++) {
          if (playerHand.hand[i].number !== type.type) {
            type.intruder = playerHand.hand[i].number;
          }
        }
      } else {
        if (playerHand.hand[0].number === playerHand.hand[2].number) {
          type.type = playerHand.hand[0].number;
          type.intruder = playerHand.hand[1].number;
        } else {
          type.type = playerHand.hand[1].number;
          type.intruder = playerHand.hand[0].number;
        }
      }

      return type;
    };

    let tab = [...listeJoueurCombinaison];
    let types = [];

    for (let i = 0; i < tab.length; i++) {
      types.push(typeCarre(tab[i]));
    }

    let maxTypes = self.maximums(types, (x) => x.type);

    if (maxTypes.length === 1) {
      return [maxTypes[0].id];
    } else {
      let intruderMax = self.maximums(maxTypes, (x) => x.intruder);

      if (intruderMax.length === 1) {
        return [intruderMax[0].id];
      } else {
        let res = [];
        for (let i = 0; i < intruderMax.length; i++) {
          res.push(intruderMax[i].id);
        }
        return res;
      }
    }
  }

  /*
   * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
   * OUT : STRING ==> identifiant d' un joueur
   * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des full
   */
  secondFull(tableauxAvecId) {
    let meilleurId = tableauxAvecId[0].id;
    let meilleurTableau = tableauxAvecId[0].hand;
    let meilleursIds = [meilleurId];

    for (let i = 1; i < tableauxAvecId.length; i++) {
      const tableauCourant = tableauxAvecId[i].hand;
      let isBetter = false;

      for (let j = 0; j < 5; j++) {
        if (tableauCourant[j].number > meilleurTableau[j].number) {
          meilleurId = tableauxAvecId[i].id;
          meilleurTableau = tableauCourant;
          meilleursIds = [meilleurId];
          isBetter = true;
          break;
        } else if (tableauCourant[j].number < meilleurTableau[j].number) {
          isBetter = true;
          break;
        }
      }

      if (!isBetter) {
        meilleursIds.push(tableauxAvecId[i].id);
      }
    }

    return [meilleursIds];
  }

  /*
   * ...
   */
  secondSuite(listeJoueurCombinaison) {
    const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const mainsTriees = [];
    let joueursAvecCartePlusHaute = [];

    // Étape 1: Trier les mains des joueurs et stocker les mains triées dans un tableau
    for (const joueur of listeJoueurCombinaison) {
      const mainTrie = joueur.hand
        .slice()
        .sort((a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));
      mainsTriees.push(mainTrie);
    }

    // Étape 2: Parcourir chaque main pour vérifier si la carte la plus haute est un As
    for (let main of mainsTriees) {
      let asCommeUn = false;
      if (main[0].number === 14) {
        asCommeUn = true;
      }

      // Étape 3: Si un As est détecté comme la carte la plus haute, procéder à l'ajustement
      if (asCommeUn) {
        // Vérifier si la deuxième carte est un 5
        if (main[1].number === 5) {
          // Déplacer l'As à la fin du tableau et mettre le 5 à sa place au début
          const as = main.shift(); // Retirer l'As du début du tableau
          main.push(as); // Mettre l'As à la fin du tableau
        }
      }
    }

    // Étape 4: Trouver la carte la plus haute parmi toutes les mains triées
    let cartePlusHaute = null;

    for (const main of mainsTriees) {
      if (
        !cartePlusHaute ||
        valeurs.indexOf(main[0].number) > valeurs.indexOf(cartePlusHaute.number)
      ) {
        cartePlusHaute = main[0];
      }
    }

    // Étape 5: Trouver les joueurs avec la carte la plus haute et les stocker dans le tableau joueursAvecCartePlusHaute
    for (let i = 0; i < mainsTriees.length; i++) {
      const main = mainsTriees[i];
      if (main[0].number === cartePlusHaute.number) {
        joueursAvecCartePlusHaute.push(listeJoueurCombinaison[i].id);
      }
    }

    return joueursAvecCartePlusHaute;
  }

  /*
   * ...
   */
  secondBrelan(listeJoueurCombinaison, self = this) {
    let typeBrelan = function (playerHand, trier) {
      let type = {
        type: null,
        intruder: null,
        id: playerHand.id,
      };

      let cards = trier(playerHand.hand, (x) => x.number);
      type.type = cards[2].number;

      if (cards[1].number === cards[2].number) {
        if (cards[0] === cards[1]) {
          type.intruder =
            cards[3].number > cards[4].number
              ? cards[3].number
              : cards[4].number;
        } else {
          type.intruder =
            cards[0].number > cards[4].number
              ? cards[0].number
              : cards[4].number;
        }
      } else {
        type.intruder =
          cards[1].number > cards[0].number ? cards[1].number : cards[0].number;
      }

      return type;
    };

    let tab = [...listeJoueurCombinaison];
    let types = [];
    for (let i = 0; i < tab.length; i++) {
      types.push(typeBrelan(tab[i], self.trier));
    }

    let maxTypes = self.maximums(types, (x) => x.type);

    if (maxTypes.length === 1) {
      return [maxTypes[0].id];
    } else {
      let intruderMax = self.maximums(maxTypes, (x) => x.intruder);

      if (intruderMax.length === 1) {
        return [intruderMax[0].id];
      } else {
        let res = [];
        for (let i = 0; i < intruderMax.length; i++) {
          res.push(intruderMax[i].id);
        }
        return res;
      }
    }
  }

  /*
   * ...
   */
  secondDoublePaire(tableauxAvecId) {
    let meilleurId = tableauxAvecId[0].id;
    let meilleurTableau = tableauxAvecId[0].hand;
    let meilleursIds = [meilleurId];

    for (let i = 1; i < tableauxAvecId.length; i++) {
      const tableauCourant = tableauxAvecId[i].hand;
      let isBetter = false;

      for (let j = 0; j < 5; j++) {
        if (tableauCourant[j].number > meilleurTableau[j].number) {
          meilleurId = tableauxAvecId[i].id;
          meilleurTableau = tableauCourant;
          meilleursIds = [meilleurId];
          isBetter = true;
          break;
        } else if (tableauCourant[j].number < meilleurTableau[j].number) {
          isBetter = true;
          break;
        }
      }

      if (!isBetter) {
        meilleursIds.push(tableauxAvecId[i].id);
      }
    }

    return [meilleursIds];
  }
  /*
   * ...
   */
  secondPaire(listeJoueurCombinaison, self = this) {
    let tab = [...listeJoueurCombinaison];
    let hautesPaires = []; // Stockage des paires les plus hautes
    let plusHauteValeur = -1; // Valeur numérique de la plus haute paire

    // Etape 1 : Recherche des paires et identification de la plus haute valeur de paire
    for (let joueur of tab) {
      let cartes = joueur.hand.map((carte) => carte.number);
      let paire = cartes.find(
        (carte, index) => cartes.indexOf(carte) !== index
      ); // Trouver la paire

      let cartePaire = [];
      cartePaire.push(joueur.hand.find((elt) => elt.number === paire));
      cartePaire.push(
        joueur.hand.find(
          (elt) => elt.number === paire && elt.color !== cartePaire[0].color
        )
      );

      if (paire) {
        let valeur = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].indexOf(
          paire
        );

        if (valeur > plusHauteValeur) {
          plusHauteValeur = valeur; // Mettre à jour la plus haute valeur de paire
          hautesPaires = [
            {
              hand: joueur.hand.filter(
                (carte) =>
                  carte.number !== paire ||
                  (carte.color !== cartePaire[0].color &&
                    carte.color !== cartePaire[1].color)
              ),
              id: joueur.id,
            },
          ]; // Sauvegarder la main sans la paire
        } else if (valeur === plusHauteValeur) {
          hautesPaires.push({
            hand: joueur.hand.filter(
              (carte) =>
                carte.number !== paire ||
                (carte.color !== cartePaire[0].color &&
                  carte.color !== cartePaire[1].color)
            ),
            id: joueur.id,
          }); // Ajouter la main sans la paire à la liste
        }
      }
    }

    // Etape 2 : Comparaison des paires sauvegardées
    if (hautesPaires.length > 1) {
      // Appeler la fonction pour comparer les mains restantes en cas d'égalité
      return self.secondCarteHaute(hautesPaires);
    } else if (hautesPaires.length === 1)
      // Renvoyer l'id du joueur avec la paire la plus haute
      return hautesPaires[0].id;
  }

  /*
   * ...
   */
  secondCarteHaute(listeJoueurCombinaison, self = this) {
    let tab = [...listeJoueurCombinaison];

    for (let i = 0; i < tab.length; i++) {
      // change le 1 en 14 pour en faire la carte la plus haute
      tab[i].hand.sort((a, b) => b.number - a.number);
    }

    let max = tab;

    for (let i = 0; i < tab[0].hand.length; i++) {
      max = self.maximums(max, (x) => x.hand[i].number);
      if (max.length === 1) return [max[0].id];
    }

    let res = [];
    for (let i = 0; i < max.length; i++) {
      res.push(max[i].id);
    }

    return res;
  }
}

module.exports = ScoreEngine;