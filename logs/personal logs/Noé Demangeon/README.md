# Noé Demangeon

2024/01/30 : 3h			Réunion du mardi en groupe: Choix du jeu, nom, logo et thème, nom de l’entreprise et ébauche d’idée du business model

2024/02/03 : 30min		Réunion Discord en groupe:  cahier des charges 

2024/02/06 :  3h30min		Réunion du mardi en groupe:  cahier des charges , création des groupes + début idée design 

2024/02/08 :  1h30min		Réunion Discord en groupe Front: Organisation des versions, idée/organisation.

2024/02/11 : 30min		Relecture/Corrections cahier des charges

2024/02/13: 3h		  Réunion du mardi en groupe: Création du design de la page au brouillon+ idée pour la nouvelle regle du poker.

2024/02/13: 1h		  Découverte Blender + design bouée

2024/02/13: 30min		  Recherche assets cartes

2024/02/18: 1H30        Découverte Blender + design parasols

15H

--------- Début projet ---------

2024/02/20 : 3h00          Réunion création pages, distribution taches.

2024/02/22 : 1h30          Début page login

2024/02/22 : 2h         Avancée page login + page register

2024/02/23 : 3h         Réorganisation pages login et signup

2024/02/25 : 2h         Réorganisation pages, découverte MUI, création pages réinitialisation mdp

2024/02/26 : 3h30h         Réorganisation, découpage en objets

2024/02/27 : 4H             Réunion, finition pages, fusion pages login et accueil, discussion semaine suivantes

2024/02/27 : 30min          Modification css, ajout component text.

19H

--------- Pages connexion ---------

2024/03/03 : 1H             Apprentissage mongodb.

2024/03/04 : 2H             Installation MongoDB, MongoSH, découverte, création table User, fichier Index de base.

2024/03/05 : 2H             Début fonctionnement formulaires, fonctionne pour SignUp, ajout fenetre confirmation quand le formulaire est bien envoyé (server/models : npm install cors)

2024/03/06 : 1H             Fonctionnement formulaire login (Reste à faire le feedback lors d'une mauvaise combinaison), modiff fenêtre Success qui prend désormais en argument le message à afficher.

2024/03/07 : 1H             Fonctionnement fomulaire réinitialisation mot de passe/Envoi mail. Reste a faire l'envoi de l'email.

2024/03/08 : 1H             Ajout condionnel connecté/nonconnecté sur le bouton start et sur le bouton connexion. Légère réorganisation de la gestion des fenêtres de connexion.

2024/03/08 : 3H             Table stat, localstorage, AuthProvider pour connexion/récupération des infos de l'utilisateur sur la bdd. Menu déroulant du profil.

2024/03/08 : 1H30           Ajout image de profil, modification css header.

2024/03/08 : 2H00           Ajout fenetre changement avatar. Ajout fonctions dans AuthProvider

2024/03/09 : 1H30           Ajout vérification information fformulaire signup + feedback

2024/03/09 : 2H00           Ajout feedback avec la bdd

18H

--------- BDD ---------


2024/09/12 : 5h00           Réunion groupe, merge de toutes les branch de front-end, fonctionnement bdd.

2024/03/14 : 1h00           Réunion avec Mostafa, mise en commun code, fonctionnement window

2024/03/16 : 2h00           Création 2 pages, Acceuil et GameTable, création fichier WindowContext qui gère quelle fenêtre est affichée. Probleme header ne s'affiche pas dans gametable

2024/03/16 : 2h00           Réorganisation, Windowcontext.

2024/03/16 : 1h30           Réunion Mostafa, Simplification code, Reste a faire content window et variable pour gérer page accueil/gametable

2024/03/17 : 1h00           Recherche et début du desktop avec electron.

2024/03/18 : 2h00           Ajout isGameTableVisible pour voir si on affiche accueil ou gametable, ajout successwindow. Problème avec isLogged.

2024/03/19 : 3H30           Réunion, correction bug, version desktop, simplification code.

2024/03/21 : 2h00           Modification fonctionnement bdd, reducer, dispatch (package : npm install jsonwebtoken)

2024/03/23 : 2h00           Récupération info bdd pour page profil et stats. Css à faire.

2024/03/23 : 1h00           Modification fonctionnement user et stats, fichier qui les gère à part. Window se ferme quand on clique en dehors.

2024/03/24 : 1h00           Modification css, création component backArrow

2024/03/25 : 1h00           Réunion Mostafa, correction bugs, simplification code

2024/03/26 : 3h00           Réunion mardi, reducer, correction des warnings

2024/03/28 : 2h00           Début page liste tables.

2024/03/28 : 0h30           Réorganisation

2024/03/29 : 1h00           Début window création table

34H

--------- Principe des Windows ---------


2024/04/02 : 5h30           Réunion redux, traductions

2024/04/02 : 3h30           Fin traductions + Début page shop, page confirmation achat

9H
--------- Traductions ---------


2024/04/03 : 4h00           Amélioration sécurité bdd user, ajout cryptage mdp, nouvelle table avatars, le shop utilise cette nouvelle table, début items possédé, ne fonctionne pas encore dans le shop. Reste a faire l'achat d'items (déja fait du coté back) et wallpapers et cardskins. Difficultés pour afficher les images depuis un lien de la bdd.

2024/04/04 : 1h00           Nouvelle branche bddmodule pour travailler sur un changement de la bdd pour qu'elle corresponde à un module (la bdd se ferme au bout de 30 sec si on ne lance pas mongod, à voir avec Victor)

2024/04/05 : 1h00           Modification bdd pour envoyer le lien de l'image plutot que son id, affichage avatar et pseudo en haut à gauche

2024/04/07 : 2h00           Avancement shop, objets possédés visibles, achat possible, changement d'avatar possible. Réorganisation token backend

2024/04/09 : 2h00           Réunion, amélioration css, corrections bugs.

2024/04/11 : 4h00           Amélioration shop, avatar customable, modification bdd pour pourvoir faire cela, création nouvelle component pour afficher l'avatar, il faut encore faire les images et les sunglasses.

2024/04/12 : 1h00           Recherche API Google compte

2024/04/13 : 2h00           Génération Avatar et lunettes.

2024/04/14 : 2h00           Téléchargement models, générations avatar

20H

--------- Amélioration bdd + shop ---------

2024/04/15 : 3h00           Window alert quand logout et leavetable, translations amélioré, reducer windowcontext.

2024/04/16 : 2h30           Réunion debug, début DAO, discution IHM.

2024/04/16 : 1h30           DAO table user (branche Features/bddmodule2)

2024/04/17 : 1h00           Amélioration IHM.

2024/04/20 : 2h00           Amélioration ServerPanel, Serveurs divisés en différentes table, barre de recherche fonctionnelle. Ajout vérification et feedback création game. modif windowcontext.

2024/04/21 : 1h00           Changement logique window, "accueil" n'existe plus dans windowType

2024/04/23 : 3h30           Réunion, correction bug, revue code, traductions supplémentaires

2024/04/24 : 0h30           Correction bugs serverpannel

14H

--------- Amélioration window et traductions ---------

2024/04/25 : 2h30           Affichage avatar autour table, Affichage carte joueur + boutons en bas à droite

2024/04/26 : 5h00           Lecture et compréhension code connection back/front. Implémentation changement status partie, Bouton start game pour le master

2024/04/27 : 6h00           GameTableProvider Focus et IsMaster fonctionnel. Privatisation données. Affichage cartes. Début showCards.

2024/04/28 : 2h00           ShowCards et HideCards fonctionnel.

2024/05/07 : 4h00           Réunion, correction bugs, base partie.

2024/05/07 : 1h00           Gagner une game te donne bien l'argent, simplification code, evaluation des mains des joueurs actifs uniquement.

2024/05/09 : 1h00           Changement master apres chaque game (startingPlayerIndex), 1 seul joueur restant provoque fin de game.

2024/05/10 : 3h00           Travail spectateurs fonctionnels. Observer, rejoindre table pendant waiting. Rejoindre table possible pendant game mais en mode spectateur.

2024/05/11 : 2h00           Back + front achat coins fonctionnel

26H

--------- Backend, logique partie, spectateurs, showcards ---------


2024/05/12 : 2h00           Corrections bug logique fin de game. Cartes montrés en fin de game

2024/05/12 : 1h30           Correction bugs, vérification mots de passe pour les game. ServerName ingame

2024/05/13 : 1h00           Correction bugs ranking + suppression code / formatage

2024/05/14 : 4h00           Réunion, traductions, début all-in, communication

2024/05/15 : 0h30           Correction bug ranking

2024/05/16 : 3h00           Test jeu pour débug, correction bug, code pour gérer les joueurs avec 0 SC, fin traductions, message erreur creategame

2024/05/17 : 3h00           Correction bugs game, restart automatique, changement masters. Changement boutons pages Serverpannel. Fonction changement mot de passe + checkEmail fonctionnelles

2024/05/17 : 4h00           Session tests avec Maël et Victor, debuggage.

2024/05/18 : 4h00           Traductions, quitter loading page amélioré. Début rédaction rapport.

2024/05/19 : 4h00           Ecriture rapport, Nettoyage code

2024/05/19 : 5h00           Debogage, correction window, communication.

2024/05/20 : 6h00           Debogage, fin correction window, traduction tutoriel, taille formulaires

2024/05/21 : 8h00           Envoi mail change password, derniers ajustements, merges, commentaires.

48H

--------- Debogage, denier ajustements ---------


Voici un résumé des heures faites :

15H : Début projet, choix projet, visuels de base, blender.

19H : Découverte React, pages de connexions.

18H : Base de donnée et formulaire fonctionnels.

34H : Windows

9H : Traductions

20H : Amélioration bdd + shop

14H : Amélioration window + traductions

26H : Backend, logique game

48H : Debogage, derniers ajustements

TEMPS TOTAL: 196h30min