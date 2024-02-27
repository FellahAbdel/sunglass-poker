


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
     * OUT : { [c1, ..., c5], idJoueur } tableau de combinaison et identifiant du gagant
     * FUNCTION : identifie le joueur gagnant de la partie et la main avec laquelle il a gagne
     */
    gagnant () {
        // let listeMainJoueur = [];
        // let liste = []
        // for (let i=0; i<this.#joueurs) {
        //     let obj = {
        //         main : null,
        //         idJoueur : listeMainJoueur[i].idJoueur
        //     }
        //     obj.main = this.estCarre(listeMainJoueur[i].cartes)
        // }
    }


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
    maximums (listePoidMainJoueur, accesseur) { 
        let maximums = [];
        let poidMax = accesseur(listePoidMainJoueur[0]);

        for (let i=0; i<listePoidMainJoueur.length; i++) {

            if (accesseur(listePoidMainJoueur[i]) > poidMax) {

                maximums.splice(0, maximums.length);
                maximums.push(listePoidMainJoueur[i]);
                poidMax = accesseur(listePoidMainJoueur[i]);

            } else if (accesseur(listePoidMainJoueur[i]) === poidMax) {
                maximums.push(listePoidMainJoueur[i]);
            }
        }

        return maximums;
    }


    trier (liste, accesseur) {

        let tab = [...liste];
        let tmp;

        for(let i=0; i<tab.length; i++) {
            for (let j=0; j<tab.length-1; j++) {
                if ( accesseur(tab[j]) > accesseur(tab[j+1]) ) {
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
    estCouleur (tableau7cartes) {
        let tab = [...tableau7cartes];
        let familles = [
            [],
            [],
            [],
            []
        ];

        // on repartis les cartes par familles 
        for (let i=0; i<tab.length; i++) {
            switch (tab[i].famille) {
                case "carre" :
                    familles[0].push(tab[i]);
                    break;
                case "coeur" :
                    familles[1].push(tab[i]);
                    break;
                case "trefle" :
                    familles[2].push(tab[i]);
                    break;
                case "pique" :
                    familles[3].push(tab[i]);
                    break;
            }
        }
        
        // 
        for (let i=0; i < familles.length; i++) {

            if (familles[i].length > 5) {

                while (familles[i].length > 5) {
                    let indice = 0;

                    for (let j=0; j<familles[i].length; j++) {
                        if (familles[i][j].numero < familles[i][indice].numero) {
                            indice = j;
                        }
                    }

                    familles[i].splice(indice, 1);
                }

                return familles[i];

            } else if (familles[i].length === 5) {
                return familles[i];
            }
        }

        return false;
    }

    /*
     * ...
     */
    estSuite (tableau7cartes) {
        let tab = [...tableau7cartes];
        let main = [];
        let pluriCouleur = false;

        while (tab.length !== 0) {
            let indice = 0;
            for (let i=0; i<tab.length; i++) {
                if (tab[i].numero < tab[indice].numero) {
                    indice = i;
                }
            }
            if (main.length - 1 >= 0) {
                // la main est non vide

                if (tab[indice].numero === main[main.length-1].numero + 1) {
                    // les deux chiffres sont consecutifs

                    if (tab[indice].famille !== main[main.length-1].famille) {
                        pluriCouleur = true;
                    }
                    if (main.length === 5) {
                        // pour s'assurer qu'il y ait au plus 5 cartes
                        // les 5 cartes seront les plus grandes
                        main.splice(0,1);
                    }
                    main.push(tab[indice]);
                    tab.splice(indice, 1);
                } else {
                    // si pas condecutifs alors on vide la main
                    main.splice(0, main.length);
                    pluriCouleur = false;
                }
            } else {
                main.push(tab[indice]);
                tab.splice(indice, 1);
            }
        }

        console.log("pluriCouleur : ", pluriCouleur);
        if (main.length === 5 && pluriCouleur) {
            return main;
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

        let typeCarre = function (mainJoueur) {
            let type = {
                type   : null,
                intrus : null,
                id : mainJoueur.idJoueur
            }
            
            if (mainJoueur.main[0].numero === mainJoueur.main[1].numero) {
                type.type = mainJoueur.main[0].numero;
                // chercher l'intrus
                for (let i=0; i<mainJoueur.main.length; i++) {
                    if (mainJoueur.main[i].numero !== type.type) {
                        type.intrus = mainJoueur.main[i].numero;
                    }
                }

            } else {
                if (mainJoueur.main[0].numero === mainJoueur.main[2].numero) {
                    type.type = mainJoueur.main[0].numero;
                    type.intrus = mainJoueur.main[1].numero;
                } else {
                    type.type = mainJoueur.main[1].numero;
                    type.intrus = mainJoueur.main[0].numero;
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

            let maxIntrus = this.maximums(maxTypes, (x) => x.intrus);

            if (maxIntrus.length === 1) {
                return [maxIntrus[0].id];

            } else {
                let res = [];
                for (let i=0; i<maxIntrus.length; i++) {
                    res.push(maxIntrus[i].id);
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


        let typeBrelan = function (mainJoueur, trier) {
            let type = {
                type : null,
                intrus : null,
                id : mainJoueur.idJoueur
            }

            let cartes = trier(mainJoueur.main, (x) => x.numero); 
            type.type = cartes[2].numero;

            if (cartes[1].numero === cartes[2].numero) {

                if (cartes[0] === cartes[1]) {
                    type.intrus = cartes[3].numero > cartes[4].numero ? 
                        cartes[3].numero : cartes[4].numero;


                } else {
                    type.intrus = cartes[0].numero > cartes[4].numero ? 
                        cartes[0].numero : cartes[4].numero;

                }

            } else {
                type.intrus = cartes[1].numero > cartes[0].numero ? 
                    cartes[1].numero : cartes[0].numero;

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

            let maxIntrus = this.maximums(maxTypes, (x) => x.intrus);

            if (maxIntrus.length === 1) {
                return [maxIntrus[0].id];

            } else {
                let res = [];
                for (let i=0; i<maxIntrus.length; i++) {
                    res.push(maxIntrus[i].id);
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

        let tab = [...listeJoueurCombinaison];

        for (let i=0; i<tab.length; i++) {
            tab[i].main = this.trier(tab[i].main, (x) => x.numero);
        }

        let max ;

        for (let i=4; i>=0; i--) {
            max = this.maximums(tab, (x) => x.main[i].numero);
            console.log(max);
            if (max.length === 1) return [max[0].idJoueur];
        }

        let res = [];
        for (let i=0; i<max.length; i++) {
            res.push(max[i].idJoueur)
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