class partie {

    #players = []; // liste de joueurs
    #cardsGame = []; // liste de l'ensemble des cartes
    #hiddenCards = []; // tableau de 5 cartes 
    #betHistory = []; // [{ idJoueur, sommeMisee }, ...]
    #bets = 0;
    #sideBets = 0;
    #currentPlayer = 0;
    #revolution = 0;

    constructor () {
        return 
    }


    /*
     * IN : [elt1, ...] liste a melanger
     * OUT : [elti, ...] liste melangee
     * FUNCTION : melange une liste
     */
    shuffle (list) {
        let newList = [];
        let index;

        while (list.length !== 0) {
            index = Math.floor(Math.random() * (list.length-1));
            newList.push(list.splice(index, 1)[0]);
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
        for (let i = 0; i < this.#players.length; i++) {
            const player = this.#players[i];
            if (player.getPlayerCards().length < 2) { // Vérifier si le joueur a moins de 2 cartes
                player.setCards(this.#cardsGame.shift(), this.#cardsGame.shift()); // Distribuer les deux cartes au joueur
            }
        }
        // Ajouter les 5 premières cartes de jeuDeCarte à cartesMasque
        this.#hiddenCards = this.#cardsGame.slice(0, 5);
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
    listeJoueursActifs () {
        let res = [];
        for (let i=0; i < this.#players; i++) {
            if (this.#players[i].getPlayerState() === "active") {
                res.push(this.#players[i]);
            }
        }

        return res;
    }

    /*
     * IN : JOUEUR
     * OUT : { [c1, ..., c7], idJoueur } tableau des 7 cartes associe a l'id du joueur
     * FUNCTION : compose et renvoi le tableau de 7 cartes pour les combinaisons
     */
    fait7cartes (player) {
        return {cards : this.#hiddenCards + player.getPlayerCards(), id : player.getPlayerId()};
    }


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
        for (let color of royalSymbols) {
          const royalFlush = [];
          for (let number of royalValues) {
            // Vérifier si la carte royale actuelle est présente dans les 7 cartes
            // Trouve le première carte vérifiant la condition
            const royalCard = cards.find(
              (card) => card.color === color && card.number === number
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
    estQuinteFlush (tableau7cartes) {

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
        // console.log(cartesMemeCouleur);
    
        // Étape 3: Vérifier si ces cartes forment une suite
        let quinteFlush = this.estSuite(cartesMemeCouleur);
        if (quinteFlush !== false) {
            return quinteFlush; // Renvoie les cartes de la quinte flush si elles forment une suite
        } else {
            return false; // Pas de quinte flush
        }
    }

    /*
     * IN : tableau de 7 cartes
     * OUT : [], tableau des cartes qui composent la main. Au plus 5 | False si rien trouve
     * FUNCTION : determine si les 7 possedent un carre et renvoi la combianaison si elle est trouve.
     */
    estCarre(tableau7cartes) {
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
                if (tab[j].number !== carte.number && (plusHauteRestante === null || tab[j].number > plusHauteRestante.number)) {
                  plusHauteRestante = tab[j];
                }
              }
      
              // Ajouter la meilleure carte restante
              if (plusHauteRestante) {
                maMain.push({ number: plusHauteRestante.number, color: plusHauteRestante.color });
              }
      
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
        let tab = [...tableau7cartes];
        const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        // Étape 1: Trier les cartes pour avoir les combinaisons les plus importantes
        tab.sort((a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));

        // Étape 2: Extraire les 3 cartes de même numéro (brelan)
        let brelan = [];
        for (let i = 0; i < tab.length - 2; i++) {
            const cartesMemeNumero = tab.filter(carte => carte.number === tab[i].number);
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
        const resteCartes = tab.filter(carte => !brelan.includes(carte));
        for (let i = 0; i < resteCartes.length; i++) {
            const cartesMemeNumero = resteCartes.filter(carte => carte.number === resteCartes[i].number);
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
                case "D" :
                    colors[0].push(tab[i]);
                    break;
                case "H" :
                    colors[1].push(tab[i]);
                    break;
                case "C" :
                    colors[2].push(tab[i]);
                    break;
                case "S" :
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
    estSuite (sevenCardsTab, refact=false) {

        const refactor = function (cardList, undo=false) {

            for (let i = 0; i < cardList.length; i++) {
                if (!undo) {
                    if (cardList[i].number === 14) {
                        cardList[i].number = 1;
                    }
                } else {
                    if (cardList[i].number === 1) {
                        cardList[i].number = 14;
                    }
                }
            }
            return cardList;
        }

        let tab = [...sevenCardsTab];
        let hand = [];

        if (refact) {
            tab = refactor(tab);
        }
        tab = this.trier(tab, (x) => x.number);

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

        if (refact) {
            return hand.length === 5 ? refactor(hand, true) : false;
        }
        return hand.length === 5 ? hand : this.estSuite(sevenCardsTab, true);
    }

    /*
     * ...
     */
    estBrelan (tableau7cartes) {
        let tab = [...tableau7cartes];
        const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];

        // Étape 1: Trier le tableau de 7 cartes d'ordre décroissant et Extraire les 3 cartes de même numéro
        let brelan = [];
        tab.sort((a,b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));
        for(let i = 0 ; i < tab.length - 2 ; i++){
            const cartesMemeNumero = tab.filter(carte => carte.number === tab[i].number);
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
        const resteCartes = tab.filter(carte => !brelan.includes(carte));

        // Combinaison des 3 cartes de même numéro et des 2 cartes les plus hautes parmi les restantes
        return [...brelan, ...resteCartes.slice(0, 2)];
    }

    /*
     * ...
     */
    estDoublePaire(tableau7cartes) {

        let tab = [...tableau7cartes];
        // Ordonne le tableau
        tab.sort(function (a, b) {
          return b.number - a.number;
        });

        console.log(tab);
        
        let p1c1 = null;
        let p1c2 = null;
        let p2c1 = null;
        let p2c2 = null;
        let ch = null;
        let verificateur = false;
      
        // Chercher mes cartes paires
        for (let i = 0; i < tab.length - 1; i++) {
          if (tab[i].number === tab[i + 1].number) {
            if (p1c1 === null) {
              p1c1 = tab[i];
              p1c2 = tab[i+1];

            } else {
              p2c1 = tab[i];
              p2c2 = tab[i+1];
              verificateur = true;
              break;
            }
          }
        }
      
        // Chercher la carte haute
        if (verificateur) {
          for (let j = 0; j < tab.length; j++) {
            if (tab[j].number !== p1c1.number && tab[j].number !== p2c1.number) {
              ch = tab[j];
              break;
            }
          }
      
          // Construire la main finale: les deux paires + la meilleure carte restante
          const maMain = [p1c1, p1c2, p2c1, p2c2, ch];
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
        let tab = [...tableau7cartes];
        // Ordonne le tableau
        tab.sort(function (a, b) {
          return b.number - a.number;
        });
        console.log(tab);
    
        const maMain = new Array(5);
        let p1c1 = null;
        let p1c2 = null;
        let verificateur = false;
    
        // Cherche la carte paire
        for (let i = 0; i < tab.length - 1; i++) {
          if (tab[i].number === tab[i + 1].number) {
            p1c1 = tab[i];
            p1c2 = tab[i+1]
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
            if (tab[compteur].number === p1c1.number) {
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
    
    
    /* 
     * IN : tableau de 2 cartes
     * OUT : la carte la plus elevée dans la main du joueur/ne retourne pas de booléens
     * FUNCTION : determine la carte la plus élevée.
     */
    estCarteHaute (tableau2cartes) {

        let tab = [...tableau2cartes];
        const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        // Etape 1 : Trier le tableau de 7 carte par ordre décroissant
        const carteTriees = tab.sort((a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));

        // Etape 2 : renvoyer la carte la plus haute càd la première carte dans le tableau
        return carteTriees.splice(0, 5);
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
                id : playerHand.id
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
    secondFull(tableauxAvecId) {

        let meilleurId = tableauxAvecId[0].id;
        let meilleurTableau = tableauxAvecId[0].hand;
      
        for (let i = 1; i < tableauxAvecId.length; i++) {
            const tableauCourant = tableauxAvecId[i].hand;
      
            for (let j = 0; j < 5; j++) {
                if (tableauCourant[j].number > meilleurTableau[j].number) {
                    meilleurId = tableauxAvecId[i].id;
                    meilleurTableau = tableauCourant;
                    break;
                } else if (tableauCourant[j].number < meilleurTableau[j].number) {
                    break;
                }
            }
        }
      
        return [meilleurId];
    }
  
    /*
     * ...
     */
    secondSuite (listeJoueurCombinaison) {
        const valeurs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];
        const mainsTriees = [];
        let joueursAvecCartePlusHaute = [];

        // Étape 1: Trier les mains des joueurs et stocker les mains triées dans un tableau
        for (const joueur of listeJoueurCombinaison) {
            const mainTrie = joueur.hand.slice().sort((a, b) => valeurs.indexOf(b.number) - valeurs.indexOf(a.number));
            mainsTriees.push(mainTrie);
        }

        // Étape 2: Parcourir chaque main pour vérifier si la carte la plus haute est un As
        for (let main of mainsTriees) {
            let asCommeUn = false;
            if (main[0].number === 1) {
                asCommeUn = true;
            }

            // Étape 3: Si un As est détecté comme la carte la plus haute, procéder à l'ajustement
            if (asCommeUn) {
                // Vérifier si la deuxième carte est un 5
                if (main[1].number === 5) {
                    // Déplacer l'As à la fin du tableau et mettre le 5 à sa place au début
                    const as = main.shift(); // Retirer l'As du début du tableau
                    main.push(as); // Mettre l'As à la fin du tableau
                }
            }
        }
        
        // Étape 4: Trouver la carte la plus haute parmi toutes les mains triées
        let cartePlusHaute = null;

        for (const main of mainsTriees) {
            if (!cartePlusHaute || valeurs.indexOf(main[0].number) > valeurs.indexOf(cartePlusHaute.number)) {
                cartePlusHaute = main[0];
            }
        }

        // Étape 5: Trouver les joueurs avec la carte la plus haute et les stocker dans le tableau joueursAvecCartePlusHaute
        for (let i = 0; i < mainsTriees.length; i++) {
            const main = mainsTriees[i];
            if (main[0].number === cartePlusHaute.number) {
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
    secondDoublePaire(tableauxAvecId) { 

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



let p = new partie;
// console.log(p.estQuinteFlushRoyale([
//     {number : 14, color : "C"},
//     {number : 13, color : "C"},
//     {number : 12, color : "C"},
//     {number : 11, color : "C"},
//     {number : 10, color : "C"},
//     {number : 9, color : "C"},
//     {number : 8, color : "C"}
// ]));

// console.log(p.estQuinteFlush(p.shuffle([
//     { number: 10, color: 'D' },
//     { number: 9, color: 'S' },
//     { number: 5, color: 'D' },
//     { number: 4, color: 'D' },
//     { number: 2, color: 'D' },
//     { number: 3, color: 'D' },
//     { number: 14, color: 'D' }
// ])));


// console.log(p.estCarre(p.shuffle([
//     {number : 10, color : "H"},
//     {number : 10, color : "S"},
//     {number : 10, color : "D"},
//     {number : 9, color : "C"},
//     {number : 10, color : "C"},
//     {number : 9, color : "C"},
//     {number : 8, color : "C"}
// ])));

// console.log(p.estFull([
//     {number : 10, color : "H"},
//     {number : 10, color : "S"},
//     {number : 10, color : "D"},
//     {number : 11, color : "C"},
//     {number : 11, color : "D"},
//     {number : 9, color : "C"},
//     {number : 8, color : "C"}
// ]));

// console.log(p.estCouleur([
//     {number : 14, color : "H"},
//     {number : 2, color : "H"},
//     {number : 5, color : "H"},
//     {number : 12, color : "H"},
//     {number : 11, color : "H"},
//     {number : 9, color : "H"},
//     {number : 8, color : "C"}
// ]));

// console.log(p.estSuite([
//     {number : 14, color : "H"},
//     {number : 2, color : "H"},
//     {number : 5, color : "H"},
//     {number : 12, color : "H"},
//     {number : 6, color : "H"},
//     {number : 4, color : "H"},
//     {number : 3, color : "C"}
// ]));

// console.log(p.estBrelan(p.shuffle([
//     { number: 10, color: 'C' },
//     { number: 10, color: 'S' },
//     { number: 10, color: 'H' },
//     { number: 11, color: 'D' },
//     { number: 11, color: 'H' },
//     { number: 5, color: 'D' },
//     { number: 4, color: 'D' }
// ])));

// console.log(p.estDoublePaire(p.shuffle([
//     { number: 10, color: 'C' },
//     { number: 10, color: 'S' },
//     { number: 14, color: 'H' },
//     { number: 11, color: 'D' },
//     { number: 11, color: 'H' },
//     { number: 4, color: 'D' },
//     { number: 4, color: 'D' }
// ])));

// console.log(p.estPaire(p.shuffle([
//     { number: 10, color: 'C' },
//     { number: 10, color: 'S' },
//     { number: 14, color: 'H' },
//     { number: 11, color: 'D' },
//     { number: 11, color: 'H' },
//     { number: 5, color: 'D' },
//     { number: 4, color: 'D' }
// ])));

// console.log(p.estCarteHaute(p.shuffle([
//     { number: 10, color: 'D' },
//     { number: 9, color: 'S' },
//     { number: 5, color: 'D' },
//     { number: 4, color: 'D' },
//     { number: 2, color: 'D' },
//     { number: 3, color: 'D' },
//     { number: 14, color: 'D' }
// ])));


// test second 

console.log(p.secondFull([
    {
        hand : [
            {number : 9, color : "H"},
            {number : 9, color : "S"},
            {number : 9, color : "D"},
            {number : 14, color : "C"},
            {number : 14, color : "C"}
        ], 
        id : '1'
    },
    {
        hand : [
            {number : 9, color : "H"},
            {number : 9, color : "S"},
            {number : 9, color : "D"},
            {number : 14, color : "C"},
            {number : 14, color : "C"}
        ], 
        id : '2'
    },
    {
        hand : [
            {number : 8, color : "H"},
            {number : 8, color : "S"},
            {number : 8, color : "D"},
            {number : 9, color : "C"},
            {number : 9, color : "C"}
        ], 
        id : '3'
    }
]))
