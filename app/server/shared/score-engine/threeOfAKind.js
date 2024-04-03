/*
 * ...
 */
function isThreeOfAKind(tableau7cartes) {
  let tab = [...tableau7cartes];
  const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];

  // Étape 1: Trier le tableau de 7 cartes d'ordre décroissant et Extraire les 3 cartes de même numéro
  let brelan = [];
  tab.sort((a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));
  for (let i = 0; i < tab.length - 2; i++) {
    const cartesMemeNumero = tab.filter(
      (carte) => carte.number === tab[i].number
    );
    if (cartesMemeNumero.length === 3) {
      brelan = cartesMemeNumero;
      break;
    }
  }

  // Si aucun brelan trouvé, renvoyer false
  if (brelan.length !== 3) {
    return false;
  }

  // Étape 2: Trier le reste des cartes dans l'ordre décroissant et renvoyer la combinaison des cartes
  const resteCartes = tab.filter((carte) => !brelan.includes(carte));

  // Combinaison des 3 cartes de même numéro et des 2 cartes les plus hautes parmi les restantes
  return [...brelan, ...resteCartes.slice(0, 2)];
}

module.exports = isThreeOfAKind;