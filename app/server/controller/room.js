module.exports = ({id, rules, players = []}) => {
    return {
        // -- variables d'une partie
        id: id,                // l'id de la partie
        /** Les règles spécifiques à la partie
         * 
         * maxPlayerCount       -- nombre de joueur par partie au maximum
         * mainLoop             -- la boucle principale de jeu à passer en argument.
         */
        rules: {...rules},          

        players: [...players],      // Les joueurs

        /** Les mains des joueurs
         * 
         *  ne correspond pas à ce qu'il faut envoyer aux joueur,
         *  c'est la fonction fourni dans les règles qui s'en occupe
         *  
         */ 
        handPlayers: [],        
        deck: [],               // Paquets de cartes -- > Sans les cartes déjà distribuer aux joueurs
        playing: -1,            // Joueur qui doit jouer

        /** Liste des coups effectuer
         * 
         * {id: PlayerID,type: Action, data: Object}
         * 
         * id !playerID -> Server did the action (kick, autoplay for timer expired etc..)
         * 
         * data is an object with the information to reconstruct the move
         * ex:
         * data => {bet: amount}
         */
        logMoves: [],


        /**
         * closed      => aucun joueurs
         * preLobby    => attend des joueurs
         * start       => timer de début de tour
         * playerTurn  => tour d'un joueur
         * end         => timer de fin de tour
         * finished    => timer de fin de partie
         * destroyed   => Partie n'existe plus pour les joueurs
        */
       status: "closed",       // Status de la partie
       

        // -- Timers

        // -- Fonctions d'une partie
        
        // Players control

        addPlayer: function(id) {
            if(this.isPlaying(id) == false) {
                if(this.players.length >= this.rules.maxPlayerCount){
                    return {status:0, mes:"Room is full"};
                }
                this.players.push(id);
                return {status: 1,mes: "Player added"};
            }
            return {status: 0, mes:"Player already in game"};
        },

        kickPlayer:function (id)  {
            if(!this.isPlaying(id))
                return {status:0, mes:"Not a player in the game"};
            this.players.splice(this.players.indexOf(id));
            return {status: 1, mes: "Kicked player"};
        },
    
        doAction: function(id, data) {
            type = data.type;
            // Si pas une action serveur.
            if(id != -1){
                if(this.hisTurn(id)){
                    return this.rules.play(id,data);
                }else{
                    return {status: 0, mes:"Not his turn."};
                }
            }
        },

        // Checks
        isPlaying: function(id) {
            if(this.players == undefined) return false;
            return this.players.includes(id);
        },
        hisTurn : function(id) {
            return (this.status == "playerTurn" && this.playing == id);
        }

    }
}

