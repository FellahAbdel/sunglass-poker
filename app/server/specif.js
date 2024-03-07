


class partie {

    #joueurs = []; // liste de joueurs
    #jeuDeCarte = []; // liste de l'ensemble des cartes
    #cartesMasque = []; // tableau de 5 cartes 
    #historiqueDesMises = []; // [{ idJoueur, sommeMisee }, ...]
    #mises = 0;
    #misesSecondaires = 0;
    #joueurCourant = 0;
    #revolution = 0;

    constructor () {
        return 
    }


    /*
     * IN : [elt1, ...] liste a melanger
     * OUT : [elti, ...] liste melangee
     * FUNCTION : melange une liste
     */
    shuffle (liste) {}
    
    /*
     * PRE : la liste de carte est deja melange
     * IN : rien
     * OUT : rien
     * FUNCTION : distribue les cartes aux joueurs et selectionne les 5 cartes masquées
     */
    distrubuer () {}
    

    /*
     * IN : rien
     * OUT : { [c1, ..., c5], idJoueur } tableau de combinaison et identifiant du gagant
     * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
     */
    gagnant () {}


    /*
     * IN : rien
     * OUT : [j1, ...] liste des joueurs actifs
     * FUNCTION : renvoi la liste des joueurs actifs dans la partie
     */
    listeJoueursActifs () {}

    /*
     * IN : JOUEUR
     * OUT : { [c1, ..., c7], idJoueur } tableau des 7 cartes associe a l'id du joueur
     * FUNCTION : compose et renvoi le tableau de 7 cartes pour les combinaisons
     */
    fait7cartes (joueur) {}


    /*
     * IN : [j1, ...] liste des joueurs actifs
     * OUT : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
     * FUNCTION : renvoi le tableau des poids des combinaisons de chaque joueur
     */
    listeCombinaison (listeJoueursActifes) {}

    /*
     * IN : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
     * OUT : [{ poid, main, type }, ...] tableau du/des maximum(s) des poids
     * FUNCTION : tri et renvoi le ou les maximums des poids
     */
    maximums (listePoidMainJoueur) {}




    /*
     * IN : tableau de 7 cartes
     * OUT : objet { poid : NUMBER, type : STRING }
     * FUNCTION : trouve dans les 7 cartes la main la plus puissante
     */
    combinaison ({ tableau7cartes, idJoueur }) {
        
        if (this.estQuinteFlushRoyale(tableau7cartes)) {
            return {
                poid : 15,
                main : [], // tableau de 5 cartes composant la main
                type : "quinteFlush"
            }
        }
    } 

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent une quinte flush royale et renvoi la combianaison si elle est trouve.
     */
    estQuinteFlushRoyale (tableau7cartes) {
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

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent une quinte flush et renvoi la combianaison si elle est trouve.
     */
    estQuinteFlush (tableau7cartes) {}

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent un carre et renvoi la combianaison si elle est trouve.
     */
    estCarre (tableau7cartes) {}

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent un full et renvoi la combianaison si elle est trouve.
     */
    estFull (tableau7cartes) {
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
            const cartesMemeNumero = resteCartes.filter(carte => carte.numero === tableau7cartes[i].numero);
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

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent une couleur et renvoi la combianaison si elle est trouve.
     */
    estCouleur (tableau7cartes) {}

    /*
     * ...
     */
    estSuite (tableau7cartes) {}

    /*
     * ...
     */
    estBrelan (tableau7cartes) {
        const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        // Étape 1: Trier le tableau de 7 cartes d'ordre décroissant et Extraire les 3 cartes de même numéro
        let brelan = [];
        tableau7cartes.sort((a,b) => valeurs.indexOf(b.numero) - valeurs.indexOf(a.numero));
        for(let i = 0 ; i < tableau7cartes.length - 2 ; i++){
            const cartesMemeNumero = tableau7cartes.filter(carte => carte.numero === tableau7cartes[i].numero);
            if(cartesMemeNumero.length === 3) {
                brelan = cartesMemeNumero;$
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

    /*
     * ...
     */
    estDoublePaire (tableau7cartes) {}

    /*
     * ...
     */
    estPaire (tableau7cartes) {}

    /* 
     * IN : tableau de 2 cartes
     * OUT : la carte la plus elevée dans la main du joueur/ne retourne pas de booléens
     * FUNCTION : determine la carte la plus élevée.
     */
    estQuarteHaute (tableau2cartes) {
        const valeurs = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        // Extraire les numéros des deux cartes
        const numeroCarte1 = tableau2cartes[0].numero;
        const numeroCarte2 = tableau2cartes[1].numero;

        // Comparer les numéros des cartes
        const indexCarte1 = valeurs.indexOf(numeroCarte1);
        const indexCarte2 = valeurs.indexOf(numeroCarte2);

        // Renvoyer la carte avec le numéro le plus élevé
        if (indexCarte1 > indexCarte2) {
            return tableau2cartes[0]; // Carte 1 est la plus haute
        } else {
            return tableau2cartes[1]; // Carte 2 est la plus haute ou les deux ont le même numéro
        }
    }

    

    // verification de deuxieme niveau
    // pas besoin pour le flush et le quinte flush
    
    /*
     * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
     * OUT : STRING ==> identifiant d' un joueur
     * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des carres
     */
    secondCarre (listeJoueurCombinaison) {}

    /*
     * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
     * OUT : STRING ==> identifiant d'un joueur
     * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des full
     */
    secondFull (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondSuite (listeJoueurCombinaison) {
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

    /*
     * ...
     */
    secondBrelan (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondDoublePaire (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondPaire (listeJoueurCombinaison) {
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
     * ...
     */
    secondCarteHaute (listeJoueurCombinaison) {}



    /*
     * IN : rien
     * OUT : rien
     * FUNCTION : initialise la premiere partie
     */
    lancerPartie () {}

    /*
     * IN : rien
     * OUT : rien
     * FUNCTION : 
     *      - decales les utilisateurs
     *      - remet a 0 les historiques et les mises
     *      - reinitialise l'etat des joueurs et vider l'historique
     *      - remelanger et redistribuer les cartes
     */
    reset () {} // redemarer une partie


    /*
     * IN : rien
     * OUT : rien
     * FUNCTION : deroule UNE partie
     */
    deroulerPartie () {}
}


class Joueur {

    #identifiant = 0;
    #etat = "";
    #jeton = 1000;
    #carte = []; // tableau de deux cartes
    #historique = [
        [], // {action, mise} ex: [{"fold", 0}, {"mise", 120}, ...]
    ]; // 

    /*
     * IN : rien
     * OUT : NUMBER identifiant
     * FUNCTION : retourne l'identifiant du joueur
     */
    getIdentifiant() {}

    /*
     * IN : rien
     * OUT : [{numero, famille},...] liste de 2 cartes
     * FUNCTION : retourne la liste des cartes du joueur
     */
    getCartes() {}

    /*
     * IN : rien
     * OUT : STRING, l'etat du joueur
     * FUNCTION : retourne l'etat courant du joueur
     */
    getEtat() {}

    /*
     * IN : "actif", "passif"
     * OUT : rien
     * FUNCTION : altere l'etat d'un joueur
     */
    setEtat (etat) {}

    /*
     * IN : [{numero, famille}, ...] liste de deux cartes
     * OUT : rien
     * FUNCTION : initialise les cartes du joueur
     */
    setCartes(listeCarte) {}

    /*
     * IN : NUMBER somme a miser
     * OUT : rien
     * FUNCTION : deduire la somme misee de la somme des jetons
     */
    miser(somme) {}

    /*
     * IN : STRING NUMBER, une action et une mise 
     * OUT : rien
     * FUNCTION : ajoute a l'historique du joueur l'action effectue et la mise associe
     */
    action(action, mise) {}

    constructor (identifiant) {
        this.identifiant = identifiant;
    }
}


