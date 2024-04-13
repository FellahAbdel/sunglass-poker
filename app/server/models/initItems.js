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
    name: "Crabe",
    price: 100,
    imgSrc: "/assets/avatar/crabe.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 20 },
  },
  {
    name: "Nothing",
    price: 0,
    imgSrc: "/assets/sunglasses/nothing.png",
    category: "sunglasses",
  },
  {
    name: "Pixels",
    price: 200,
    imgSrc: "/assets/sunglasses/pixels.png",
    category: "sunglasses",
  },
  {
    name: "3D",
    price: 200,
    imgSrc: "/assets/sunglasses/3dsunglasse.png",
    category: "sunglasses",
  },
  {
    name: "Ski Green",
    price: 50,
    imgSrc: "/assets/sunglasses/skisunglassgreen.png",
    category: "sunglasses",
  },
  {
    name: "Sous L'eau",
    price: 50,
    imgSrc: "/assets/sunglasses/sousleau.png",
    category: "sunglasses",
  },
  {
    name: "Monocle",
    price: 50,
    imgSrc: "/assets/sunglasses/monocle.png",
    category: "sunglasses",
  },
  {
    name: "Double Monocle",
    price: 50,
    imgSrc: "/assets/sunglasses/doublemonocle.png",
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
  {
    name: "red",
    price: 100,
    imgSrc: "#FF0000",
    category: "colorAvatar",
  },
  {
    name: "Sand",
    price: 10,
    imgSrc: "#F4BF6F",
    category: "colorAvatar",
  },
  {
    name: "Vert sapin kaki",
    price: 10,
    imgSrc: "#085E5B",
    category: "colorAvatar",
  },
  {
    name: "Bleu éclair",
    price: 10,
    imgSrc: "#53EABD",
    category: "colorAvatar",
  },
  {
    name: "Bleu toxique",
    price: 10,
    imgSrc: "#2353DB",
    category: "colorAvatar",
  },
  {
    name: "Couché de soleil",
    price: 10,
    imgSrc: "#F68028",
    category: "colorAvatar",
  },
  
];

//await ItemModel.deleteMany({});

async function initOrUpdateItems() {
  //await ItemModel.deleteMany({});

  for (const item of defaultItems) {
    const existingItem = await ItemModel.findOne({ name: item.name });
    if (existingItem) {
      const isDifferent = Object.keys(item).some(key => item[key] !== existingItem[key]);
      if (isDifferent) {
        console.log(`Mise à jour de l'item: ${item.name}`);
        await ItemModel.updateOne({ _id: existingItem._id }, item);
      }
    } else {
      console.log(`Ajout de l'item: ${item.name}`);
      await ItemModel.create(item);
    }
  }
  console.log("Les items ont été initialisés ou mis à jour avec succès.");
}

module.exports = initOrUpdateItems;

