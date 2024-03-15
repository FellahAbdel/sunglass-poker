/*
 * IN : tableau de 7 cartes
 * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
 * FUNCTION : determine si les 7 possedent une quinte flush et renvoi la combianaison si elle est trouve.
 */
function isStraightFlush(tableau7cartes) {
  // Étape 1: Vérifier si au moins 5 cartes sont de la même couleur
  let couleurMajoritaire = null;
  let compteurCouleurs = {}; // Compteur pour chaque couleur
  for (let carte of tableau7cartes) {
    if (!compteurCouleurs[carte.color]) {
      compteurCouleurs[carte.color] = 0;
    }
    compteurCouleurs[carte.color]++;
    if (compteurCouleurs[carte.color] >= 5) {
      couleurMajoritaire = carte.color;
      break;
    }
  }

  if (couleurMajoritaire === null) {
    return false; // Pas de couleur majoritaire, pas de quinte flush
  }

  // Étape 2: Filtrer les cartes de la couleur majoritaire
  let cartesMemeCouleur = tableau7cartes.filter(
    (carte) => carte.color === couleurMajoritaire
  );

  // Étape 3: Vérifier si ces cartes forment une suite
  let quinteFlush = self.isStraight(cartesMemeCouleur);
  if (quinteFlush !== false) {
    return quinteFlush; // Renvoie les cartes de la quinte flush si elles forment une suite
  } else {
    return false; // Pas de quinte flush
  }
}
