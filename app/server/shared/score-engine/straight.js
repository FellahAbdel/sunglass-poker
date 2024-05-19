/*
 * ...
 */

/*function isStraight(sevenCardsTab, refact = false) {

  let tab = [...sevenCardsTab];
  let hand = [];

  tab.sort((a, b) => a.number - b.number);

  while (tab.length !== 0) {
    let tmp = tab.pop();

    if (hand.length === 0) {
      hand.push(tmp);
    } else if (hand.length < 5) {
      if (tmp.number === hand[hand.length - 1].number - 1) {
        hand.push(tmp);
      } else {
        hand.splice(0, hand.length);
        hand.push(tmp);
      }
    }
  }

  return hand.length === 5 ? hand : false;
}*/

function isStraight(sevenCardsTab) {
  let tab = [...sevenCardsTab];
  let hand = []; // Main pour accumuler les suites potentielles

  // Ajouter une carte avec la valeur 1 si une carte avec la valeur 14 est présente
  if (tab.some((card) => card.number === 14)) {
    tab.push({ number: 1 });
  }

  // Trier les cartes par ordre croissant de leur valeur
  tab.sort((a, b) => a.number - b.number);

  // Parcourir les cartes pour vérifier les suites
  while (tab.length !== 0) {
    let tmp = tab.pop(); // Prendre la dernière carte (la plus haute restante)

    if (hand.length === 0) {
      hand.push(tmp); // Si la main est vide, ajouter la carte
    } else {
      // S'il y a déjà des cartes dans la main, vérifier si la nouvelle carte continue la suite
      if (tmp.number === hand[hand.length - 1].number - 1) {
        hand.push(tmp); // Ajouter la carte si elle est consécutive à la dernière de la main
      } else if (tmp.number === hand[hand.length - 1].number) {
        // Ignorer les doublons, mais continuer à vérifier les suites sans réinitialiser
        continue;
      } else if (hand.length < 5) {
        hand.splice(0, hand.length); // Réinitialiser la main si la suite est interrompue et non par un doublon
        hand.push(tmp); // Commencer une nouvelle suite avec la carte actuelle
      }
    }
  }

  // Retourner la main si elle contient une suite de 5 cartes, sinon retourner false
  return hand.length >= 5 ? hand.slice(0, 5) : false;
}

module.exports = isStraight;
