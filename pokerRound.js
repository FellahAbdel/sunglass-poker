


class partie {

    #joueurs = []; // liste de joueurs
    #jeuDeCarte = []; // liste de l'ensemble des cartes
    #cartesMasque = []; // tableau de 5 cartes 
    #historiqueDesMises = []; // [{ playerId, sommeMisee }, ...]
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
    shuffle (liste) {
        let newList = [];
        let index;

        while (liste.length !== 0) {
            index = Math.floor(Math.random() * (liste.length-1));
            newList.push(liste.splice(index, 1)[0]);
        }

        return newList;
    }
    
    /*
     * PRE : la liste de carte est deja melange
     * IN : rien
     * OUT : rien
     * FUNCTION : distribu les cartes aux joueurs et selectionne les 5 cartes mystere
     */
    distrubuer () {}
    

    /*
     * IN : rien
     * OUT : { [c1, ..., c5], playerId } tableau de combinaison et identifiant du gagnant
     * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
     */
    gagnant () {

        let activeUsers = listeJoueursActifs();
        let combinationList = this.listeCombinaison(activeUsers);
        let maxList = this.maximums(combinationList, (x) => x.poids);

        if (maxList.length > 1) {

            let winners = [];

            switch (maxList[0].type) {
                case "carre":
                    winners = this.secondCarre(maxList);
                    break;
                case "full":
                    winners = this.secondFull(maxList);
                    break;
                case "suite":
                    winners = this.secondSuite(maxList);
                    break;
                case "brelan":
                    winners = this.secondBrelan(maxList);
                    break;
                case "double paire":
                    winners = this.secondDoublePaire(maxList);
                    break;
                case "paire":
                    winners = this.secondPaire(maxList);
                    break;
                case "carte haute":
                    winners = this.secondCarteHaute(maxList);
                    break;
            }

            let res;
            for (let i=0; i < winners.length; i++) {
                for (let j=0; j < maxList.length; j++) {
                    if (winners[i] === maxList[j].playerId) {
                        res.push(maxList[j]);
                    }
                }
            }

            return res;

        } else {
            return [maxList[0]];
        }

    }


    /*
     * IN : rien
     * OUT : [j1, ...] liste des joueurs actifs
     * FUNCTION : renvoi la liste des joueurs actifs dans la partie
     */
    listeJoueursActifs () {}

    /*
     * IN : JOUEUR
     * OUT : { [c1, ..., c7], playerId } tableau des 7 cartes associe a l'id du joueur
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
    maximums (playerHandWeightList, getter) { 
        let maximums = [];
        let maxWeight = getter(playerHandWeightList[0]);

        for (let i=0; i<playerHandWeightList.length; i++) {

            if (getter(playerHandWeightList[i]) > maxWeight) {

                maximums.splice(0, maximums.length);
                maximums.push(playerHandWeightList[i]);
                maxWeight = getter(playerHandWeightList[i]);

            } else if (getter(playerHandWeightList[i]) === maxWeight) {
                maximums.push(playerHandWeightList[i]);
            }
        }

        return maximums;
    }


    trier (list, getter) {

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




    /*
     * IN : tableau de 7 cartes
     * OUT : objet { poid : NUMBER, type : STRING }
     * FUNCTION : trouve dans les 7 cartes la main la plus puissante
     */
    combinaison ({ tableau7cartes, playerId }) {} 

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent une quinte flush royale et renvoi la combianaison si elle est trouve.
     */
    estQuinteFlushRoyale (tableau7cartes) {}

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
    estFull (tableau7cartes) {}

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent une couleur et renvoi la combianaison si elle est trouve.
     */
    estCouleur (sevenCardsTab) {
        let tab = [...sevenCardsTab];
        let colors = [
            [],
            [],
            [],
            []
        ];

        // on repartis les cartes par famille 
        for (let i=0; i<tab.length; i++) {
            switch (tab[i].color) {
                case "diamond" :
                    colors[0].push(tab[i]);
                    break;
                case "heart" :
                    colors[1].push(tab[i]);
                    break;
                case "club" :
                    colors[2].push(tab[i]);
                    break;
                case "spade" :
                    colors[3].push(tab[i]);
                    break;
            }
        }
        
        // 
        for (let i=0; i < colors.length; i++) {

            if (colors[i].length > 5) {

                while (colors[i].length > 5) {
                    let index = 0;

                    for (let j=0; j<colors[i].length; j++) {
                        if (colors[i][j].number < colors[i][index].number) {
                            index = j;
                        }
                    }

                    colors[i].splice(index, 1);
                }

                return colors[i];

            } else if (colors[i].length === 5) {
                return colors[i];
            }
        }

        return false;
    }

    /*
     * ...
     */
    estSuite (sevenCardsTab) {
        let tab = [...sevenCardsTab];
        let hand = [];
        let pluriCouleur = false;

        while (tab.length !== 0) {
            let index = 0;
            for (let i=0; i<tab.length; i++) {
                if (tab[i].number < tab[index].number) {
                    index = i;
                }
            }
            if (hand.length - 1 >= 0) {
                // la main est non vide

                if (tab[index].number === hand[hand.length-1].number + 1) {
                    // les deux chiffres sont consecutifs

                    if (tab[index].color !== hand[hand.length-1].color) {
                        pluriCouleur = true;
                    }
                    if (hand.length === 5) {
                        // pour s'assurer qu'il y ait au plus 5 cartes
                        // les 5 cartes seront les plus grandes
                        hand.splice(0,1);
                    }
                    hand.push(tab[index]);
                    tab.splice(index, 1);
                } else {
                    // si pas condecutifs alors on vide la main
                    hand.splice(0, hand.length);
                    pluriCouleur = false;
                }
            } else {
                hand.push(tab[index]);
                tab.splice(index, 1);
            }
        }

        if (hand.length === 5 && pluriCouleur) {
            return hand;
        } 
        return false;
    }

    /*
     * ...
     */
    estBrelan (tableau7cartes) {}

    /*
     * ...
     */
    estDoublePaire (tableau7cartes) {}

    /*
     * ...
     */
    estPaire (tableau7cartes) {}

    /*
     * ...
     */
    estQuarteHaute (tableau7cartes) {}

    

    // verification de deuxieme niveau
    // pas besoin pour le flush et le quinte flush
    
    /*
     * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
     * OUT : STRING ==> identifiant d' un joueur
     * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des carres
     */
    secondCarre (listeJoueurCombinaison) {
        // je sais que cette liste contient deux elements

        let typeCarre = function (playerHand) {
            let type = {
                type   : null,
                intruder : null,
                id : playerHand.playerId
            }
            
            if (playerHand.hand[0].number === playerHand.hand[1].number) {
                type.type = playerHand.hand[0].number;
                // chercher l'intrus
                for (let i=0; i<playerHand.hand.length; i++) {
                    if (playerHand.hand[i].number !== type.type) {
                        type.intruder = playerHand.hand[i].number;
                    }
                }

            } else {
                if (playerHand.hand[0].number === playerHand.hand[2].number) {
                    type.type = playerHand.hand[0].number;
                    type.intruder = playerHand.hand[1].number;
                } else {
                    type.type = playerHand.hand[1].number;
                    type.intruder = playerHand.hand[0].number;
                }
            }

            return type;
        }

        let tab = [...listeJoueurCombinaison];
        let types = [];

        for (let i=0; i<tab.length; i++) {
            types.push(typeCarre(tab[i]));
        }

        let maxTypes = this.maximums(types, (x) => x.type);

        if (maxTypes.length === 1) {
            return [maxTypes[0].id];

        } else {

            let intruderMax = this.maximums(maxTypes, (x) => x.intruder);

            if (intruderMax.length === 1) {
                return [intruderMax[0].id];

            } else {
                let res = [];
                for (let i=0; i<intruderMax.length; i++) {
                    res.push(intruderMax[i].id);
                }
                return res;
            }
        }
    }

    /*
     * IN : tableau de tableau contenant les 5 cartes composant les mains main [{[], id}, {[], id}, ...]
     * OUT : STRING ==> identifiant d' un joueur
     * FUNCTION : renvoi l'identifiant de l'utilisateur ayant le plus fort des full
     */
    secondFull (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondSuite (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondBrelan (listeJoueurCombinaison) {


        let typeBrelan = function (playerHand, trier) {
            let type = {
                type : null,
                intruder : null,
                id : playerHand.playerId
            }

            let cards = trier(playerHand.hand, (x) => x.number); 
            type.type = cards[2].number;

            if (cards[1].number === cards[2].number) {

                if (cards[0] === cards[1]) {
                    type.intruder = cards[3].number > cards[4].number ? 
                        cards[3].number : cards[4].number;


                } else {
                    type.intruder = cards[0].number > cards[4].number ? 
                        cards[0].number : cards[4].number;

                }

            } else {
                type.intruder = cards[1].number > cards[0].number ? 
                    cards[1].number : cards[0].number;

            }

            return type;
            
        }

        let tab = [...listeJoueurCombinaison];
        let types = []
        for(let i=0; i<tab.length; i++) {
            types.push(typeBrelan(tab[i], this.trier));
        } 

        console.log(types);
        let maxTypes = this.maximums(types, (x) => x.type);

        if (maxTypes.length === 1) {
            return [maxTypes[0].id];

        } else {

            let intruderMax = this.maximums(maxTypes, (x) => x.intruder);

            if (intruderMax.length === 1) {
                return [intruderMax[0].id];

            } else {
                let res = [];
                for (let i=0; i<intruderMax.length; i++) {
                    res.push(intruderMax[i].id);
                }
                return res;
            }
        }
    }

    /*
     * ...
     */
    secondDoublePaire (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondPaire (listeJoueurCombinaison) {}

    /*
     * ...
     */
    secondCarteHaute (listeJoueurCombinaison) {

        const refactor = function (cardList, undo=false) {

            for (let i=0; i < cardList.length; i++) {
                
                if (cardList[i].number === 1 || cardList[i] === 14) {
                    if (undo) {
                        cardList[i].number = 1;
                    } else {
                        cardList[i].number = 14;
                    }
                }
            }
        }

        let tab = [...listeJoueurCombinaison];

        for (let i=0; i<tab.length; i++) {
            // change le 1 en 14 pour en faire la carte la plus haute
            refactor(tab[i].hand);
            tab[i].hand = this.trier(tab[i].hand, (x) => x.number);
        }

        let max ;

        for (let i=4; i>=0; i--) {
            max = this.maximums(tab, (x) => x.hand[i].number);
            if (max.length === 1) return [max[0].playerId];
        }

        // retabli l'etat des cartes
        for (let i=0; i<tab.length; i++) {
            refactor(tab[i].hand, true);
        }

        let res = [];
        for (let i=0; i<max.length; i++) {
            res.push(max[i].playerId)
        }
        
        return res;
    }



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

let p = new partie;
console.log(p.estSuite([
    {number : 5, color : "diamond"},
    {number : 6, color : "spade"},
    {number : 7, color : "heart"},
    {number : 2, color : "club"},
    {number : 9, color : "diamond"},
    {number : 10, color : "spade"},
    {number : 11, color : "heart"}
]));

console.log(p.secondCarteHaute([
    {
        hand : [
            {number : 2, color : "diamond"},
            {number : 1, color : "diamond"},
            {number : 2, color : "heart"},
            {number : 2, color : "spade"},
            {number : 2, color : "club"}
        ],
        playerId : '20'
    },
    {
        hand : [
            {number : 5, color : "diamond"},
            {number : 5, color : "heart"},
            {number : 5, color : "spade"},
            {number : 5, color : "club"},
            {number : 9, color : "diamond"}
        ],
        playerId : '21'
    },
    {
        hand : [
            {number : 5, color : "diamond"},
            {number : 5, color : "heart"},
            {number : 7, color : "diamond"},
            {number : 5, color : "club"},
            {number : 5, color : "spade"}
        ],
        playerId : '21'
    }
]));