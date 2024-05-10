/*
 * IN : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
 * OUT : [{ poid, main, type }, ...] tableau du/des maximum(s) des poids
 * FUNCTION : tri et renvoi le ou les maximums des poids
 */
function maximums(playerHandWeightList, getter) {
  let maximums = [];
  let maxWeight = getter(playerHandWeightList[0]);

  for (let i = 0; i < playerHandWeightList.length; i++) {
    if (getter(playerHandWeightList[i]) > maxWeight) {
      maximums.splice(0, maximums.length);
      maximums.push(playerHandWeightList[i]);
      maxWeight = getter(playerHandWeightList[i]);
    } else if (getter(playerHandWeightList[i]) === maxWeight) {
      maximums.push(playerHandWeightList[i]);
    }
  }

  return maximums;
}

/*
 * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
 * OUT : STRING ==> identifiant d' un joueur
 * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des carres
 */
function secondCarre(listeJoueurCombinaison) {
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

  let maxTypes = maximums(types, (x) => x.type);

  if (maxTypes.length === 1) {
    return [maxTypes[0].id];
  } else {
    let intruderMax = maximums(maxTypes, (x) => x.intruder);

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
function secondFull(tableauxAvecId) {
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
function secondSuite(listeJoueurCombinaison) {
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
function secondBrelan(listeJoueurCombinaison) {
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
          cards[3].number > cards[4].number ? cards[3].number : cards[4].number;
      } else {
        type.intruder =
          cards[0].number > cards[4].number ? cards[0].number : cards[4].number;
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
    types.push(typeBrelan(tab[i], trier));
  }

  let maxTypes = maximums(types, (x) => x.type);

  if (maxTypes.length === 1) {
    return [maxTypes[0].id];
  } else {
    let intruderMax = maximums(maxTypes, (x) => x.intruder);

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
function secondDoublePaire(tableauxAvecId) {
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

function secondPaire(maxList) {
  // Identifier la paire la plus haute et les joueurs qui la détiennent
  let highestPairValue = -1;
  let playersWithHighestPair = [];

  maxList.forEach((entry) => {
    let hand = entry.hand;

    // Trouver la valeur de la paire dans la main de chaque joueur
    let cardCounts = {};
    hand.forEach((card) => {
      cardCounts[card.number] = (cardCounts[card.number] || 0) + 1;
    });

    console.log("cards count", cardCounts);

    // Identifier la paire la plus haute dans cette main
    let highestPairInHand = -1;
    for (let number in cardCounts) {
      if (cardCounts[number] === 2) {
        let value = parseInt(number);

        if (value === 1) {
          value = 14; // Traitez l'As comme 14
        }

        if (value > highestPairInHand) {
          highestPairInHand = value;
        }
      }
    }

    // Mettre à jour la paire la plus haute et les joueurs correspondants
    if (highestPairInHand > highestPairValue) {
      highestPairValue = highestPairInHand;
      playersWithHighestPair = [entry];
    } else if (highestPairInHand === highestPairValue) {
      playersWithHighestPair.push(entry);
    }
  });

  // Si un seul joueur a la paire la plus haute, il est le gagnant
  if (playersWithHighestPair.length === 1) {
    return [playersWithHighestPair[0].id];
  }

  // Si plusieurs joueurs ont la même paire la plus haute, comparer les cartes restantes
  for (let i = 0; i < playersWithHighestPair.length; i++) {
    // Exclure la paire de la main et trier par valeur décroissante
    playersWithHighestPair[i].hand = playersWithHighestPair[i].hand.filter(
      (card) => card.number !== highestPairValue
    );
    playersWithHighestPair[i].hand.sort((a, b) => b.number - a.number);
  }

  // Comparer les cartes restantes des joueurs
  for (let i = 0; i < playersWithHighestPair[0].hand.length; i++) {
    let maxCardValue = -1;
    let potentialWinners = [];

    playersWithHighestPair.forEach((player) => {
      if (player.hand[i].number > maxCardValue) {
        maxCardValue = player.hand[i].number;
        potentialWinners = [player];
      } else if (player.hand[i].number === maxCardValue) {
        potentialWinners.push(player);
      }
    });

    // Si un seul joueur a la carte la plus haute, il est le gagnant
    if (potentialWinners.length === 1) {
      return [potentialWinners[0].id];
    }
  }

  // Si tout est égal, renvoyer les identifiants de tous les joueurs avec la paire la plus haute
  return playersWithHighestPair.map((player) => player.id);
}

/*
 * ...
 */
function secondCarteHaute(listeJoueurCombinaison) {
  let tab = [...listeJoueurCombinaison];

  for (let i = 0; i < tab.length; i++) {
    // change le 1 en 14 pour en faire la carte la plus haute
    tab[i].hand.sort((a, b) => b.number - a.number);
  }

  let max = tab;

  for (let i = 0; i < tab[0].hand.length; i++) {
    max = maximums(max, (x) => x.hand[i].number);
    if (max.length === 1) return [max[0].id];
  }

  let res = [];
  for (let i = 0; i < max.length; i++) {
    res.push(max[i].id);
  }

  return res;
}

module.exports = {
  maximums,
  secondCarre,
  secondFull,
  secondSuite,
  secondBrelan,
  secondDoublePaire,
  secondPaire,
  secondCarteHaute,
};
