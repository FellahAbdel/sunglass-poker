function estFull (tableau7cartes) {
    const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        // Étape 1: Trier les cartes pour avoir les combinaisons les plus importantes
        tableau7cartes.sort((a, b) => valeurs.indexOf(b.numero) - valeurs.indexOf(a.numero));

        // Étape 2: Extraire les 3 cartes de même numéro (brelan)
        let brelan = [];
        for (let i = 0; i < tableau7cartes.length - 2; i++) {
            const cartesMemeNumero = tableau7cartes.filter(carte => carte.numero === tableau7cartes[i].numero);
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
        const resteCartes = tableau7cartes.filter(carte => !brelan.includes(carte));
        for (let i = 0; i < resteCartes.length; i++) {
            const cartesMemeNumero = resteCartes.filter(carte => carte.numero === resteCartes[i].numero);
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
        return [...brelan, ...paire.slice(0,2)]; 
}

function estBrelan (tableau7cartes) {
    const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    // Étape 1: Trier le tableau de 7 cartes d'ordre décroissant et Extraire les 3 cartes de même numéro
    let brelan = [];
    tableau7cartes.sort((a,b) => valeurs.indexOf(b.numero) - valeurs.indexOf(a.numero));
    for(let i = 0 ; i < tableau7cartes.length - 2 ; i++){
        const cartesMemeNumero = tableau7cartes.filter(carte => carte.numero === tableau7cartes[i].numero);
        if(cartesMemeNumero.length === 3) {
            brelan = cartesMemeNumero;
            break;
        }
    }

    // Si aucun brelan trouvé, renvoyer false
    if (brelan.length !== 3) {
        return false;
    }

    // Étape 2: Trier le reste des cartes dans l'ordre décroissant et renvoyer la combinaison des cartes
    const resteCartes = tableau7cartes.filter(carte => !brelan.includes(carte));

    // Combinaison des 3 cartes de même numéro et des 2 cartes les plus hautes parmi les restantes
    return [...brelan, ...resteCartes.slice(0, 2)];
}

function estQuinteFlushRoyale (tableau7cartes) {
    const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const familles = ['Coeur', 'Trefle', 'Carreau', 'Pique'];
    const numerosQuinteFlushRoyale = ['A', 'K', 'Q', 'J', '10'];

    // Étape 1: Extraire toutes les cartes de même couleur
    let cartesMemeCouleur = [];
    for (let famille of familles) {
        const cartesFamille = tableau7cartes.filter(carte => carte.famille === famille);
        if (cartesFamille.length >= 5) {
            cartesMemeCouleur = cartesFamille;
            break; // Sortir de la boucle dès qu'on trouve une famille avec au moins 5 cartes
        }
    }

    if(cartesMemeCouleur.length < 5)
        return false;

    // Étape 2: Si plus de cinq cartes de même couleur, trier par numéro dans l'ordre décroissant et prendre les cinq premières
    cartesMemeCouleur.sort((a, b) => valeurs.indexOf(b.numero) - valeurs.indexOf(a.numero));
    if (cartesMemeCouleur.length > 5){
        cartesMemeCouleur = cartesMemeCouleur.slice(0, 5);
    }
        
    // Étape 4: Comparer les cartes avec une quinte flush royale
    const cartesTriees = cartesMemeCouleur.map(carte => carte.numero).join('');
    if (cartesTriees !== numerosQuinteFlushRoyale.join('')) {
        return false; // Pas de quinte flush royale
    }

    // Étape 5: Renvoyer le tableau trié si quinte flush royale
    return cartesMemeCouleur;   
}

function estQuarteHaute (tableau7cartes) {
    const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    // Etape 1 : Trier le tableau de 7 carte par ordre décroissant
    const carteTriees = tableau7cartes.sort((a, b) => valeurs.indexOf(b.numero) - valeurs.indexOf(a.numero));

    // Etape 2 : renvoyer la carte la plus haute càd la première carte dans le tableau
    return carteTriees[0];
}

function secondSuite(listeJoueurCombinaison) {
    const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const mainsTriees = [];
    let joueursAvecCartePlusHaute = [];

    // Étape 1: Trier les mains des joueurs et stocker les mains triées dans un tableau
    for (const joueur of listeJoueurCombinaison) {
        const mainTrie = joueur.main.slice().sort((a, b) => valeurs.indexOf(b.numero) - valeurs.indexOf(a.numero));
        mainsTriees.push(mainTrie);
    }

    // Étape 2: Parcourir chaque main pour vérifier si la carte la plus haute est un As
    for (let main of mainsTriees) {
        let asCommeUn = false;
        if (main[0].numero === 'A') {
            asCommeUn = true;
        }

        // Étape 3: Si un As est détecté comme la carte la plus haute, procéder à l'ajustement
        if (asCommeUn) {
            // Vérifier si la deuxième carte est un 5
            if (main[1].numero === '5') {
                // Déplacer l'As à la fin du tableau et mettre le 5 à sa place au début
                const as = main.shift(); // Retirer l'As du début du tableau
                main.push(as); // Mettre l'As à la fin du tableau
            }
        }
    }
    
    // Étape 4: Trouver la carte la plus haute parmi toutes les mains triées
    let cartePlusHaute = null;

    for (const main of mainsTriees) {
        if (!cartePlusHaute || valeurs.indexOf(main[0].numero) > valeurs.indexOf(cartePlusHaute.numero)) {
            cartePlusHaute = main[0];
        }
    }

    // Étape 5: Trouver les joueurs avec la carte la plus haute et les stocker dans le tableau joueursAvecCartePlusHaute
    for (let i = 0; i < mainsTriees.length; i++) {
        const main = mainsTriees[i];
        if (main[0].numero === cartePlusHaute.numero) {
            joueursAvecCartePlusHaute.push(listeJoueurCombinaison[i].id);
        }
    }

    return joueursAvecCartePlusHaute;
}

function secondPaire (listeJoueurCombinaison) {
    let hautesPaires = []; // Stockage des paires les plus hautes
    let plusHauteValeur = -1; // Valeur numérique de la plus haute paire

    // Etape 1 : Recherche des paires et identification de la plus haute valeur de paire
    for (let joueur of listeJoueurCombinaison) {
        let cartes = joueur.main.map(carte => carte.numero);
        let paire = cartes.find((carte, index) => cartes.indexOf(carte) !== index); // Trouver la paire
        if (paire) {
            let valeur = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'].indexOf(paire);
            if (valeur > plusHauteValeur) {
                plusHauteValeur = valeur; // Mettre à jour la plus haute valeur de paire
                hautesPaires = [{ main: joueur.main.filter(carte => carte.numero !== paire), id: joueur.id }]; // Sauvegarder la main sans la paire
            } else if (valeur === plusHauteValeur) {
                hautesPaires.push({ main: joueur.main.filter(carte => carte.numero !== paire), id: joueur.id }); // Ajouter la main sans la paire à la liste
            }
        }
    }

    // Etape 2 : Comparaison des paires sauvegardées
    if (hautesPaires.length > 1) {
        // Appeler la fonction pour comparer les mains restantes en cas d'égalité
        return secondCarteHaute(hautesPaires);
    } else if (hautesPaires.length === 1) 
        // Renvoyer l'id du joueur avec la paire la plus haute
        return hautesPaires[0].id;
}
/*
// Exemple de test
const listeJoueurCombinaison = [
    { main: [
        { numero: '9', famille: 'Coeur' },
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: '10', famille: 'Coeur' }
    ], id: 'joueur1' },
    { main: [
        { numero: 'A', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: '10', famille: 'Coeur' }
    ], id: 'joueur2' },
    { main: [
        { numero: '3', famille: 'Pique' },
        { numero: '3', famille: 'Pique' },
        { numero: '2', famille: 'Pique' },
        { numero: '5', famille: 'Pique' },
        { numero: 'A', famille: 'Pique' }
    ], id: 'joueur3' },
    { main: [
        { numero: '4', famille: 'Pique' },
        { numero: '3', famille: 'Pique' },
        { numero: '5', famille: 'Pique' },
        { numero: 'A', famille: 'Pique' },
        { numero: 'A', famille: 'Pique' }
    ], id: 'joueur4' }
];

console.log(secondPaire(listeJoueurCombinaison)); // Output attendu: 'joueur1'
/*
console.log(estQuarteHaute(tableau7cartes1)); // Doit renvoyer false
console.log(estQuarteHaute(tableau7cartes2)); // Doit renvoyer un tableau contenant le full house
*/

// Fonction de test pour estFull
function testEstFull() {
    const tableau7cartes1 = [
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'A', famille: 'Coeur' },
        { numero: '10', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: '4', famille: 'Coeur' },
        { numero: '4', famille: 'Carreau' }
    ];
    console.log(estFull(tableau7cartes1)); // devrait renvoyer False

    const tableau7cartes2 = [
        { numero: '2', famille: 'Coeur' },
        { numero: '2', famille: 'Pique' },
        { numero: '5', famille: 'Carreau' },
        { numero: 'A', famille: 'Coeur' },
        { numero: 'A', famille: 'Pique' },
        { numero: 'A', famille: 'Trefle' },
        { numero: '5', famille: 'Carreau' }
    ];
    console.log(estFull(tableau7cartes2)); // devrait renvoyer le FULL HOUSE le plus grand
}

// Fonction de test pour estBrelan
function testEstBrelan() {
    const tableau7cartes1 = [
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'A', famille: 'Coeur' },
        { numero: '10', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: '4', famille: 'Coeur' },
        { numero: '4', famille: 'Carreau' }
    ];
    console.log(estBrelan(tableau7cartes1)); // devrait renvoyer false

    const tableau7cartes2 = [
        { numero: '2', famille: 'Coeur' },
        { numero: '2', famille: 'Pique' },
        { numero: '2', famille: 'Carreau' },
        { numero: 'A', famille: 'Coeur' },
        { numero: 'A', famille: 'Pique' },
        { numero: 'A', famille: 'Trefle' },
        { numero: '5', famille: 'Carreau' }
    ];
    console.log(estBrelan(tableau7cartes2)); // devrait renvoyer le Brelan le plus grand
}

// Fonction de test pour estQuinteFlushRoyale
function testEstQuinteFlushRoyale() {
    const tableau7cartes1 = [
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'A', famille: 'Coeur' },
        { numero: '10', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: '4', famille: 'Coeur' },
        { numero: '4', famille: 'Carreau' }
    ];
    console.log(estQuinteFlushRoyale(tableau7cartes1)); // devrait renvoyer le QUINTE FLUSH ROYALE

    const tableau7cartes2 = [
        { numero: '10', famille: 'Coeur' },
        { numero: 'J', famille: 'Trefle' },
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'A', famille: 'Coeur' },
        { numero: '2', famille: 'Trefle' },
        { numero: '4', famille: 'Carreau' }
    ];
    console.log(estQuinteFlushRoyale(tableau7cartes2)); // devrait renvoyer false

    const tableau7cartes3 = [
        { numero: '10', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'A', famille: 'Coeur' },
        { numero: '4', famille: 'Trefle' },
        { numero: 'A', famille: 'Carreau' }
    ];
    console.log(estQuinteFlushRoyale(tableau7cartes3)); // devrait renvoyer [ { numero: '10', famille: 'Coeur' }, { numero: 'J', famille: 'Coeur' }, { numero: 'Q', famille: 'Coeur' }, { numero: 'K', famille: 'Coeur' }, { numero: 'A', famille: 'Coeur' } ]
}

// Fonction de test pour estQuarteHaute
function testEstQuarteHaute() {
    const tableau7cartes1 = [
        { numero: 'Q', famille: 'Coeur' },
        { numero: 'K', famille: 'Coeur' },
        { numero: 'A', famille: 'Coeur' },
        { numero: '10', famille: 'Coeur' },
        { numero: 'J', famille: 'Coeur' },
        { numero: '4', famille: 'Coeur' },
        { numero: '4', famille: 'Carreau' }
    ];
    console.log(estQuarteHaute(tableau7cartes1)); // devrait renvoyer { numero: 'A', famille: 'Coeur' }

    const tableau7cartes2 = [
        { numero: '2', famille: 'Coeur' },
        { numero: '2', famille: 'Pique' },
        { numero: '2', famille: 'Carreau' },
        { numero: 'A', famille: 'Coeur' },
        { numero: 'A', famille: 'Pique' },
        { numero: 'A', famille: 'Trefle' },
        { numero: '5', famille: 'Carreau' }
    ];
    console.log(estQuarteHaute(tableau7cartes2)); // devrait renvoyer { numero: 'A', famille: 'Coeur' }
}

// Tests pour la fonction secondSuite
function testSecondSuite() {
    const listeJoueurCombinaison = [
        { main: [
            { numero: '2', famille: 'Coeur' },
            { numero: '3', famille: 'Coeur' },
            { numero: '4', famille: 'Coeur' },
            { numero: '5', famille: 'Coeur' },
            { numero: 'A', famille: 'Coeur' }
        ], id: 'joueur1' },
        { main: [
            { numero: '10', famille: 'Trefle' },
            { numero: 'J', famille: 'Trefle' },
            { numero: 'Q', famille: 'Trefle' },
            { numero: 'K', famille: 'Trefle' },
            { numero: 'A', famille: 'Trefle' }
        ], id: 'joueur2' },
        { main: [
            { numero: '2', famille: 'Pique' },
            { numero: '3', famille: 'Pique' },
            { numero: '4', famille: 'Pique' },
            { numero: '5', famille: 'Pique' },
            { numero: '6', famille: 'Pique' }
        ], id: 'joueur3' }
    ];

    console.log(secondSuite(listeJoueurCombinaison)); // Attendu: ['joueur2']
}

// Tests pour la fonction secondPaire
function testSecondPaire() {
    const listeJoueurCombinaison = [
        { main: [
            { numero: '2', famille: 'Coeur' },
            { numero: '2', famille: 'Trefle' },
            { numero: '3', famille: 'Coeur' },
            { numero: '4', famille: 'Pique' },
            { numero: '5', famille: 'Coeur' }
        ], id: 'joueur1' },
        { main: [
            { numero: '6', famille: 'Coeur' },
            { numero: '6', famille: 'Trefle' },
            { numero: '7', famille: 'Coeur' },
            { numero: '8', famille: 'Pique' },
            { numero: '9', famille: 'Coeur' }
        ], id: 'joueur2' },
        { main: [
            { numero: '10', famille: 'Coeur' },
            { numero: 'J', famille: 'Trefle' },
            { numero: 'Q', famille: 'Coeur' },
            { numero: 'K', famille: 'Pique' },
            { numero: 'A', famille: 'Coeur' }
        ], id: 'joueur3' },
        { main: [
            { numero: 'A', famille: 'Coeur' },
            { numero: 'A', famille: 'Trefle' },
            { numero: '3', famille: 'Coeur' },
            { numero: '4', famille: 'Pique' },
            { numero: '5', famille: 'Coeur' }
        ], id: 'joueur4' }
    ];

    console.log(secondPaire(listeJoueurCombinaison)); // Attendu: ['joueur1', 'joueur4']
}

// Appeler les fonctions de test
testEstFull();
testEstBrelan();
testEstQuinteFlushRoyale();
testEstQuarteHaute();
testSecondSuite();
testSecondPaire();
