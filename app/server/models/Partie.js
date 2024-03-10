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
     * FUNCTION : distribue les cartes aux joueurs et selectionne les 5 cartes masquées
     */
    distribuer () {
        // Distribuer les cartes à chaque joueur
        for (let i = 0; i < this.#joueurs.length; i++) {
            const joueur = this.#joueurs[i];
            if (joueur.carte.length < 2) { // Vérifier si le joueur a moins de 2 cartes
                joueur.carte.push(this.#jeuDeCarte.shift()); // Distribuer la première carte au joueur
                joueur.carte.push(this.#jeuDeCarte.shift()); // Distribuer la deuxième carte au joueur
            }
        }
        // Ajouter les 5 premières cartes de jeuDeCarte à cartesMasque
        this.#cartesMasque = this.#jeuDeCarte.slice(0, 5);
    }
    
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
     * OUT : { [c1, ..., c7], idJoueur } tableau des 7 cartes associe a l'id du joueur
     * FUNCTION : compose et renvoi le tableau de 7 cartes pour les combinaisons
     */
    fait7cartes (joueur) {}


    /*
     * IN : [j1, ...] liste des joueurs actifs
     * OUT : [{ poid, main, type }, ...] tableau des poids des mains des joueurs
     * FUNCTION : renvoi le tableau des poids des combinaisons de chaque joueur
     */
    listeCombinaison(activePlayers) {
        return activePlayers.map((player) => {
          return this.combinaison(this.fait7cartes(player));
        });
      }
    
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
    combinaison({ tableau7cartes, idJoueur }) {
        // Triez les cartes par valeur (de la plus basse à la plus élevée)
        tableau7cartes.sort((a, b) => a.value - b.value);
    
        // Appelez des fonctions pour vérifier chaque type de main dans l'ordre de puissance
        const functionsToCall = [
          this.isRoyalFlush,
          this.isStraightFlush,
          this.isFourOfAKind,
          this.isFullHouse,
          this.isFlush,
          this.isStraight,
          this.isThreeOfAKind,
          this.isTwoPair,
          this.isOnePair,
          this.isHighCard,
        ];
    
        let bestHand = { handType: [], weight: -1 };
    
        for (let fn of functionsToCall) {
          const hand = fn(tableau7cartes);
          if (hand) {
            if (hand.weight > bestHand.weight) {
              bestHand = hand;
            }
          }
        }
    
        return bestHand;
    }
    

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent une quinte flush royale et renvoi la combianaison si elle est trouve.
     */
    estQuinteFlushRoyale(cards) {
        // Définir les symboles et valeurs des cartes royales
        const royalValues = new Set([10, 11, 12, 13, 14]);
        const royalSymbols = new Set(["C", "D", "H", "S"]); // C: Club, D: Diamond, H: Heart, S: Spade
        // Cœur/heart, Carreau/diamond, Trèfle/club, Pique/spade
      
        // Vérifier si les 7 cartes contiennent une quinte flush royale
        for (let symbol of royalSymbols) {
          const royalFlush = [];
          for (let value of royalValues) {
            // Vérifier si la carte royale actuelle est présente dans les 7 cartes
            // Trouve le première carte vérifiant la condition
            const royalCard = cards.find(
              (card) => card.symbol === symbol && card.value === value
            );
            //   console.log(royalCard);
            if (royalCard) {
              royalFlush.push(royalCard);
            } else {
              break; // S'il manque une carte royale, pas de quinte flush royale
            }
          }
          // Si nous avons trouvé une quinte flush royale, renvoyer les cartes
          if (royalFlush.length === 5) {
            return { royalFlushHand: royalFlush, weight: 10 };
          }
        }
        // Si aucune quinte flush royale n'est trouvée, renvoyer false
        return false;
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
    estCarre(tableau7cartes) {
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
    estDoublePaire(tableau7cartes) {
        // Ordonne le tableau
        tableau7cartes.sort(function (a, b) {
          return b - a;
        });
      
        let maPaire1 = 0;
        let maPaire2 = 0;
        let verificateur = false;
        let plusHaut = 0;
      
        // Chercher mes cartes paires
        for (let i = 0; i < tableau7cartes.length - 1; i++) {
          if (tableau7cartes[i] === tableau7cartes[i + 1]) {
            if (maPaire1 === 0) {
              maPaire1 = tableau7cartes[i];
            } else {
              maPaire2 = tableau7cartes[i];
              verificateur = true;
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
          const maMain = [maPaire1, maPaire1, maPaire2, maPaire2, plusHaut];
          return maMain;
        } else {
          // Retourne false si une double paire n'est pas trouvée
          return false;
        }
      }
    
    /*
     * ...
     */
    estPaire(tableau7cartes) {
        // Ordonne le tableau
        tableau7cartes.sort(function (a, b) {
          return b - a;
        });
    
        const maMain = new Array(5);
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
    
          // Complète la grille des 5 cartes avec les 3 plus grandes cartes.
          for (let t = 0; t < 5; t++) {
            maMain[t] = tableau7cartes[compteur];
            if (tableau7cartes[compteur] === maPaire) {
              maMain[++t] = maPaire;
              compteur += 2;
            }
          }
    
          // Retourne le tableau contenant la main avec la paire
          return maMain;
        } else {
          // Retourne false si aucune paire n'est trouvée
          return false;
        }
      }
    
    
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
    secondFull(listeJoueurCombinaison) {
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
    secondDoublePaire(listeJoueurCombinaison) { 
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
