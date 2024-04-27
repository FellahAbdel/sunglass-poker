//Class qui stocke les informations non-confidentielles de l'utilisateur
//Le back devrait envoyer tous les PublicPlayer au front et uniquement le Player du joueur connecté.

class PublicPlayer extends Player {
    constructor(player) {
        super(player.getPlayerId(), player.name);
        this.status = player.getStatus();
        this.playerMoney = player.getPlayerMoney();
        this.currentBet = player.currentBet;
      }

  getPlayerId() {
    return this.playerId;
  }

  getName() {
    return this.name;
  }

  getStatus() {
    return this.status;
  }

  getPlayerMoney() {
    return this.playerMoney;
  }

  getCurrentBet() {
    return this.currentBet;
  }
}
