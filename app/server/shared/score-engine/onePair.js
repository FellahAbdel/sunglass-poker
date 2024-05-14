/*
 * ...
 */
function isOnePair(tableau7cartes) {
  
  if (tableau7cartes.length !== 7) {
    return false;
  }

  let tab = [...tableau7cartes];
  // Ordonne le tableau
  tab.sort(function (a, b) {
    return b.number - a.number;
  });

  const maMain = new Array(5);
  let p1c1 = null;
  let p1c2 = null;
  let verificateur = false;

  // Cherche la carte paire
  for (let i = 0; i < tab.length - 1; i++) {
    if (tab[i].number === tab[i + 1].number) {
      p1c1 = tab[i];
      p1c2 = tab[i + 1];
      verificateur = true;
      break;
    }
  }

  if (verificateur) {
    let compteur = 0;

    // Complète la grille des 5 cartes avec les 3 plus grandes cartes.
    maMain[0] = p1c1;
    maMain[1] = p1c2;

    for (let t = 2; t < 5; t++) {
      if (tab[compteur]?.number === p1c1.number) {
        compteur += 2;
      }
      maMain[t] = tab[compteur];
      compteur++;
    }

    // Retourne le tableau contenant la main avec la paire
    return maMain;
  } else {
    // Retourne false si aucune paire n'est trouvée
    return false;
  }
}

module.exports = isOnePair;
