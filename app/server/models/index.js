// index.js

const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');

const app = express();
const port = process.env.PORT || 3001;

// Middleware pour le parsing des requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/Poker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

// Exemple d'ajout d'un utilisateur et de récupération de tous les utilisateurs
const nouveauUtilisateur = new UserModel({
  pseudo: 'john_doe',
  email: 'john.doe@example.com',
  password: 'motDePasseSecret',
  coins: 100,
});

nouveauUtilisateur.save()
  .then(result => {
    console.log('Utilisateur enregistré avec succès :', result);

    // Récupérer tous les utilisateurs
    return UserModel.find({});
  })
  .then(users => {
    console.log('Utilisateurs existants :', users);
  })
  .catch(error => {
    console.error('Erreur :', error);
  });

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
