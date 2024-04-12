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

  const compteur = {};

  // Utiliser une boucle for pour parcourir le tableau de cartes
  for (let i = 0; i < tab.length; i++) {
    const carte = tab[i];

    if (!compteur[carte.number]) {
      compteur[carte.number] = 1; // Initialiser à 1 si la carte n'existe pas encore dans le compteur
    } else {
      compteur[carte.number] += 1; // Incrémenter si elle existe déjà

      // Si on trouve 4 cartes du même chiffre, alors c'est un carré
      if (compteur[carte.number] === 4) {
        // Construire la main finale: le carré + la meilleure carte restante
        const maMain = [];

        // Ajouter les 4 cartes du carré avec leurs couleurs respectives
        for (let j = 0; j < 4; j++) {
          maMain.push({ number: carte.number, color: tab[i - j].color });
        }

        // Trouver la meilleure carte restante
        let plusHauteRestante = null;
        for (let j = 0; j < tab.length; j++) {
          if (
            tab[j].number !== carte.number &&
            (plusHauteRestante === null ||
              tab[j].number > plusHauteRestante.number)
          ) {
            plusHauteRestante = tab[j];
          }
        }

        // Ajouter la meilleure carte restante
        if (plusHauteRestante) {
          maMain.push({
            number: plusHauteRestante.number,
            color: plusHauteRestante.color,
          });
        }

        return maMain;
      }
    }
  }

  return false; // Retourner false si aucun carré n'est trouvé
}

module.exports = isFourOfAKind;
