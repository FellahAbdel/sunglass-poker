/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent un carre et renvoi la combianaison si elle est trouve.
 */
function isFourOfAKind(tableau7cartes) {
  // Ordonne le tableau
  let tab = [...tableau7cartes];

  tab.sort(function (a, b) {
    return b.number - a.number;
  });

  let hand = [];

  for (let i=0; i < tab.length; i++) {
    if (hand.length === 0) hand.push(tab[i]);
    else {
      if (hand.length < 4) {
        if (tab[i].number === hand[0].number) {
          hand.push(tab[i]);
        } else {
          // on vide
          hand.splice(0, hand.length);
          // et on ajoute le nouveau
          hand.push(tab[i]);
        }
      }
    }
  }

  if ( hand.length === 4 ) {
    // si on a trouve 4 cartes avec le meme numero
    // on recupere le max des trois cartes restantes
    let max = tab[0];
    for (const card of tab) {
      if ( card.number > max.number ) max=card;
    }
    hand.push(max);
    // on a notre main dans le bon ordre donc on le renvoi
    return hand;
  }

  return false;

}

module.exports = isFourOfAKind;
