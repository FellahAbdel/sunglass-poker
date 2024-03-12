function estQuinteFlush (tableau7cartes) {

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
    let cartesMemeCouleur = tableau7cartes.filter(carte => carte.color === couleurMajoritaire);
    console.log(cartesMemeCouleur);
    
    // Étape 3: Vérifier si ces cartes forment une suite
    let quinteFlush = estSuite(cartesMemeCouleur);
    if (quinteFlush !== false) {
        return quinteFlush; // Renvoie les cartes de la quinte flush si elles forment une suite
    } else {
        return false; // Pas de quinte flush
    }
}

function estSuite (sevenCardsTab) {
    let tab = [...sevenCardsTab];
    let hand = [];

    tab = trier(tab, (x) => x.number);

    while (tab.length !== 0) {
        let tmp = tab.pop();
        if (hand.length === 0) {
            hand.push(tmp);
        } else if (hand.length < 5) {
            if (tmp.number === hand[hand.length - 1].number - 1){
                hand.push(tmp); 
            } else {
                hand.splice(0, hand.length);
                hand.push(tmp);
            }
        }

    }

    return hand.length === 5 ? hand : false;
}

function trier(list, getter) {

    let tab = [...list];
    let tmp;

    for(let i=0; i<tab.length; i++) {
        for (let j=0; j<tab.length-1; j++) {
            if ( getter(tab[j]) > getter(tab[j+1]) ) {
                tmp = tab[j];
                tab[j] = tab[j+1];
                tab[j+1] = tmp;
            }
        }
    }

    return tab;
}

function testEstQuinteFlush() {
    const tableau7cartes1 = [
        { number: 12, color: 'H' },
        { number: 13, color: 'H' },
        { number: 14, color: 'D' },
        { number: 10, color: 'H' },
        { number: 11, color: 'H' },
        { number: 9, color: 'H' },
        { number: 4, color: 'D' }
    ];
    console.log(estQuinteFlush(tableau7cartes1)); // devrait renvoyer le QUINTE FLUSH 
}
testEstQuinteFlush();