// initItems.js
const ItemModel = require("./Item"); // Assurez-vous que le chemin d'accès est correct

const defaultItems = [
  {
    names: {
      en: "Sun",
      fr: "Soleil"
    },
    price: 0,
    imgSrc: "/assets/avatar/sun.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 40 },
  },
  {
    names: {
      en: "Crab",
      fr: "Crabe"
    },
    price: 100,
    imgSrc: "/assets/avatar/crabe.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 20 },
  },
  {
    names: {
      en: "Dolphin",
      fr: "Dauphin"
    },
    price: 100,
    imgSrc: "/assets/avatar/dauphin.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 43 },
  },
  {
    names: {
      en: "Weird Fish",
      fr: "Drole de Poisson"
    },
    price: 100,
    imgSrc: "/assets/avatar/WeirdFish.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 20 },
  },
  {
    names: {
      en: "Jellyfish",
      fr: "Méduse"
    },
    price: 100,
    imgSrc: "/assets/avatar/jellyfish.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 43 },
  },
    {
    names: {
      en: "Shark",
      fr: "Requin"
    },
    price: 100,
    imgSrc: "/assets/avatar/shark.png",
    category: "baseAvatar",
    eyePosition: { x: 60, y: 34 },
  },
  {
    names: {
      en: "Nothing",
      fr: "Rien"
    },
    price: 0,
    imgSrc: "/assets/sunglasses/nothing.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Pixels",
      fr: "Pixels"
    },
    price: 200,
    imgSrc: "/assets/sunglasses/pixels.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "3D",
      fr: "3D"
    },
    price: 200,
    imgSrc: "/assets/sunglasses/3dsunglasse.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Ski Green",
      fr: "Ski Vert"
    },
    price: 50,
    imgSrc: "/assets/sunglasses/skisunglassgreen.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Underwater",
      fr: "Sous L'eau"
    },
    price: 50,
    imgSrc: "/assets/sunglasses/sousleau.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Monocle",
      fr: "Monocle"
    },
    price: 50,
    imgSrc: "/assets/sunglasses/monocle.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Double Monocle",
      fr: "Double Monocle"
    },
    price: 50,
    imgSrc: "/assets/sunglasses/doublemonocle.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Black",
      fr: "Noir"
    },
    price: 100,
    imgSrc: "#000000",
    category: "colorAvatar",
  },
  {
    names: {
      en: "White",
      fr: "Blanc"
    },
    price: 100,
    imgSrc: "#FFFFFF",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Red",
      fr: "Rouge"
    },
    price: 100,
    imgSrc: "#FF0000",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Sand",
      fr: "Sable"
    },
    price: 10,
    imgSrc: "#F4BF6F",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Pine Green Khaki",
      fr: "Vert sapin kaki"
    },
    price: 10,
    imgSrc: "#085E5B",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Lightning Blue",
      fr: "Bleu éclair"
    },
    price: 10,
    imgSrc: "#53EABD",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Toxic Blue",
      fr: "Bleu toxique"
    },
    price: 10,
    imgSrc: "#2353DB",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Sunset",
      fr: "Couché de soleil"
    },
    price: 10,
    imgSrc: "#F68028",
    category: "colorAvatar",
  }
];

//await ItemModel.deleteMany({});

async function initOrUpdateItems() {
  await ItemModel.deleteMany({});
  for (const item of defaultItems) {
    const existingItem = await ItemModel.findOne({ "names.en": item.names.en }); // Trouver par nom en anglais
    if (existingItem) {
      const isDifferent = Object.keys(item).some(
        (key) => JSON.stringify(item[key]) !== JSON.stringify(existingItem[key])
      );
      if (isDifferent) {
        console.log(`Updating item: ${item.names.en}`);
        await ItemModel.updateOne({ _id: existingItem._id }, item);
      }
    } else {
      console.log(`Adding new item: ${item.names.en}`);
      await ItemModel.create(item);
    }
  }
  console.log("Items have been initialized or updated successfully.");
}

module.exports = initOrUpdateItems;
