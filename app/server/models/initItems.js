// initItems.js
const ItemModel = require("./Item"); // Assurez-vous que le chemin d'accès est correct

const defaultItems = [
  {
    name: "Avatar1",
    price: 100,
    imgSrc: "/assets/avatar/1.png",
    category: "baseAvatar",
    eyePosition: { x: 10, y: 10 },
  },
  {
    name: "Avatar2",
    price: 100,
    imgSrc: "/assets/avatar/2.png",
    category: "baseAvatar",
    eyePosition: { x: 90, y: 90 },
  },
  {
    name: "Avatar3",
    price: 100,
    imgSrc: "/assets/avatar/3.png",
    category: "baseAvatar",
    eyePosition: { x: 10, y: 40 },
  },
  {
    name: "Avatar7",
    price: 100,
    imgSrc: "/assets/avatar/4.png",
    category: "baseAvatar",
    eyePosition: { x: 40, y: 40 },
  },
  {
    name: "Avatar8",
    price: 100,
    imgSrc: "/assets/avatar/4.png",
    category: "baseAvatar",
    eyePosition: { x: 90, y: 10 },
  },
  {
    name: "Avatar9",
    price: 100,
    imgSrc: "/assets/avatar/4.png",
    category: "baseAvatar",
    eyePosition: { x: 30, y: 10 },
  },
  {
    name: "Avatar5",
    price: 100,
    imgSrc: "/assets/avatar/5.png",
    category: "sunglasses",
  },
  {
    name: "black",
    price: 100,
    imgSrc: "#000000",
    category: "colorAvatar",
  },

  {
    name: "white",
    price: 100,
    imgSrc: "#FFFFFF",
    category: "colorAvatar",
  },
];

async function initItems() {
  try {
    await ItemModel.deleteMany({});
    // console.log(
    //   "Toutes les informations de la table Items ont été supprimées."
    // );
    for (const item of defaultItems) {
      // Vérifier si l'élément existe déjà dans la base de données
      const existingItem = await ItemModel.findOne({ name: item.name });
      if (!existingItem) {
        // Si l'élément n'existe pas, l'insérer dans la base de données
        await ItemModel.create(item);
        console.log("Un élément à été ajouté a la bdd");
      }
    }
    console.log("La table ditems a été initialisé avec succès");
  } catch (error) {
    console.error("Erreur lors de linitialisation des items:", error);
  }
}

module.exports = initItems;
