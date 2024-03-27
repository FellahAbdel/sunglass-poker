🚀 Execution en multi-environnement
📝 Vous pouvez maintenant choisir l'environnement de travail au démarrage des serveurs + 🚀 démarrage de la BDD commune.
====

Afin de pouvoir tester localement sur les machines unistra ou sur un pc personnel, mais aussi universifier les utilisateurs.

---

Désormais lorsque vous travaillerez sur votre pc localement en utilisant la base de donnée externe vous utiliserez :
`npm start` pour le web ET le backend.

Pour démarrer un test en utilisant les machines virtuelles unistra vous utiliserez :
`npm run start:vm` pour le frontend ET le backend.

Pour travailler entièrement localement sur VOS machines (pas les vm) en utilisant donc une base de donnée mongodb de votre pc:
`npm run start:local` sur le **backend**. _existe pour le front-end mais n'a aucun impact_.

** ⚠ Vous devez avoir mongodb sur 127.0.0.1:27017 les paramètres par défaut de mongodb. **

## REDUX Dev Tools

- Installe l'extension sur google chrome
- `npm install --save @redux-devtools/extension`
