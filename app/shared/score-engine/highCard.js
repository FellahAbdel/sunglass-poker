/*
 * IN : tableau de 2 cartes
 * OUT : la carte la plus elevée dans la main du joueur/ne retourne pas de booléens
 * FUNCTION : determine la carte la plus élevée.
 */
function isHighCard(tableau2cartes) {
  let tab = [...tableau2cartes];
  const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // Etape 1 : Trier le tableau de 7 carte par ordre décroissant
  const carteTriees = tab.sort(
    (a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number)
  );

  // Etape 2 : renvoyer la carte la plus haute càd la première carte dans le tableau
  return carteTriees.splice(0, 5);
}
