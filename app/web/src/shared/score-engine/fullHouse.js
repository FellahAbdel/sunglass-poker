/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent un full et renvoi la combianaison si elle est trouve.
 */
export function isFullHouse(tableau7cartes) {
  let tab = [...tableau7cartes];
  const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // Étape 1: Trier les cartes pour avoir les combinaisons les plus importantes
  tab.sort((a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));

  // Étape 2: Extraire les 3 cartes de même numéro (brelan)
  let brelan = [];
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

  // Étape 3: Rechercher une paire parmi les cartes restantes
  let paire = [];
  const resteCartes = tab.filter((carte) => !brelan.includes(carte));
  for (let i = 0; i < resteCartes.length; i++) {
    const cartesMemeNumero = resteCartes.filter(
      (carte) => carte.number === resteCartes[i].number
    );
    //au cas ou y a un autre brelan mais on prends que la paire
    if (cartesMemeNumero.length === 3 || cartesMemeNumero.length === 2) {
      paire = cartesMemeNumero;
      break;
    }
  }

  // Si aucune paire trouvée, renvoyer false
  if (paire.length !== 3 && paire.length !== 2) {
    return false;
  }
  // Si on a trouvé un brelan et une paire, renvoyer la combinaison complète (full house)
  return [...brelan, ...paire.slice(0, 2)];
}
