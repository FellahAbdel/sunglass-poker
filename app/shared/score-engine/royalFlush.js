/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent une quinte flush royale et renvoi la combianaison si elle est trouve.
 */
function isRoyalFlush(cards) {
  // Définir les symboles et valeurs des cartes royales
  const royalValues = new Set([10, 11, 12, 13, 14]);
  const royalSymbols = new Set(["C", "D", "H", "S"]); // C: Club, D: Diamond, H: Heart, S: Spade
  // Cœur/heart, Carreau/diamond, Trèfle/club, Pique/spade

  // Vérifier si les 7 cartes contiennent une quinte flush royale
  for (let suit of royalSymbols) {
    const royalFlush = [];
    for (let value of royalValues) {
      // Vérifier si la carte royale actuelle est présente dans les 7 cartes
      // Trouve le première carte vérifiant la condition
      const royalCard = cards.find(
        (card) => card.suit === suit && card.value === value
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

module.exports = isRoyalFlush;
