const tableau7cartes = [2, 2, 2, 2, 8, 9, 14];

function estPaire(tableau7cartes) {
    // Ordonne le tableau
    tableau7cartes.sort(function (a, b) {
        return b - a;
    });

    const maMainP = new Array(5);
    let maPaire = 0;
    let verificateur = false;

    // Cherche la carte paire
    for (let i = 0; i < tableau7cartes.length - 1; i++) {
        if (tableau7cartes[i] === tableau7cartes[i + 1]) {
            maPaire = tableau7cartes[i];
            verificateur = true;
            break;
        }
    }

    if (verificateur) {
        let compteur = 0;

        maMainP[0]=maPaire;
        maMainP[1]=maPaire;

        // Complète la grille des 5 cartes avec les 3 plus grandes cartes.
        for (let t = 2; t < 5; t++) {
            if (tableau7cartes[compteur] === maPaire) {
                compteur = compteur + 2;
                maMainP[t] = tableau7cartes[compteur];

            } else {
                maMainP[t] = tableau7cartes[compteur];
                compteur++;
            }
        }

        // Retourne le tableau contenant la main avec la paire
        return maMainP;
    } else {
        // Retourne false si aucune paire n'est trouvée
        return false;
    }
}

// Appel de la fonction et affichage du résultat
const maMainP = estPaire(tableau7cartes);


function estCarre(tableau7cartes) {
    // Ordonne le tableau
    tableau7cartes.sort(function (a, b) {
      return b - a;
    });







    const compteur = {};
    let monCarre = 0;

    // Utiliser une boucle for pour parcourir le tableau de cartes
    for (let i = 0; i < tableau7cartes.length; i++) {
      const carte = tableau7cartes[i];

      if (!compteur[carte]) {
        compteur[carte] = 1; // Initialiser à 1 si la carte n'existe pas encore dans le compteur
      } else {
        compteur[carte] += 1; // Incrémenter si elle existe déjà

        // Si on trouve 4 cartes du même chiffre, alors c'est un carré
        if (compteur[carte] === 4) {
          // Recherche de la cinquième carte la plus élevée
          let plusHaut = 0;
          for (let j = 0; j < tableau7cartes.length; j++) {
            if (tableau7cartes[j] !== carte) {
              plusHaut = tableau7cartes[j];
              break;
            }
          }

          // Construire la main finale: le carré + la meilleure carte restante
          const maMain = new Array(4).fill(carte).concat(plusHaut);
          return maMain;
        }
      }
    }

    return false; // Retourner false si aucun carré n'est trouvé
}

function estDoublePaire(tableau7cartes) {
    // Ordonne le tableau
    tableau7cartes.sort(function (la, b) {
      return b - a;
    });
  
    let maPaire1 = 0;
    let maPaire2 = 0;
    let verificateur = false;
    let plusHaut = 0;
  
    // Chercher mes cartes paires
    for (let i = 0; i < tableau7cartes.length - 1; i++) {
      if (tableau7cartes[i] == tableau7cartes[i + 1]) {
        if (maPaire1 === 0) {
          maPaire1 = tableau7cartes[i];
        } else {
          maPaire2 = tableau7cartes[i];
          verificateur = true;
          break;
        }
      }
    }
  
    // Chercher la carte haute
    if (verificateur) {
      for (let j = 0; j < tableau7cartes.length; j++) {
        if (tableau7cartes[j] !== maPaire1 && tableau7cartes[j] !== maPaire2) {
          plusHaut = tableau7cartes[j];
          break;
        }
      }
  
      // Construire la main finale: les deux paires + la meilleure carte restante
      const maMainD = [maPaire1, maPaire1, maPaire2, maPaire2, plusHaut];
      return maMainD;
    } else {
      // Retourne false si une double paire n'est pas trouvée
      return false;
    }
}

function meilleurTableauAvecIdentifiant(...tableauxAvecId) {
  let meilleurId = tableauxAvecId[0].id;
  let meilleurTableau = tableauxAvecId[0].tableau;

  for (let i = 1; i < tableauxAvecId.length; i++) {
      const tableauCourant = tableauxAvecId[i].tableau;

      for (let j = 0; j < 5; j++) {
          if (tableauCourant[j] > meilleurTableau[j]) {
              meilleurId = tableauxAvecId[i].id;
              meilleurTableau = tableauCourant;
              break;
          } else if (tableauCourant[j] < meilleurTableau[j]) {
              break;
          }
      }
  }

  return meilleurId;
}

const tableauAvecId1 = { id: "A", tableau: [2, 2, 3, 4, 5] };
const tableauAvecId2 = { id: "B", tableau: [8, 8, 1, 1, 6] };
const tableauAvecId3 = { id: "C", tableau: [10, 10, 3, 4, 5]};

const meilleurIdResultat = meilleurTableauAvecIdentifiant(tableauAvecId1, tableauAvecId2, tableauAvecId3);
console.log("L'identifiant du meilleur tableau est :", meilleurIdResultat);


// Test de la fonction

  const maMainD =estCarre(tableau7cartes);
console.log(maMainD);