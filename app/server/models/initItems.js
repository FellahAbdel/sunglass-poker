// initItems.js
const ItemModel = require("./Item"); // Assurez-vous que le chemin d'accès est correct
const defaultItems = [
  {
    names: {
      en: "Sun",
      fr: "Soleil",
      zh: "太阳",
      es: "Sol",
      de: "Sonne"
    },
    price: 0,
    imgSrc: "assets/avatar/sun.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 40 },
  },
  {
    names: {
      en: "Crab",
      fr: "Crabe",
      zh: "蟹",
      es: "Cangrejo",
      de: "Krabbe"
    },
    price: 500,
    imgSrc: "assets/avatar/crabe.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 20 },
  },
  {
    names: {
      en: "Dolphin",
      fr: "Dauphin",
      zh: "海豚",
      es: "Delfín",
      de: "Delfin"
    },
    price: 500,
    imgSrc: "assets/avatar/dauphin.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 43 },
  },
  {
    names: {
      en: "Weird Fish",
      fr: "Drole de Poisson",
      zh: "奇怪的鱼",
      es: "Pez extraño",
      de: "Seltsamer Fisch"
    },
    price: 500,
    imgSrc: "assets/avatar/WeirdFish.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 20 },
  },
  {
    names: {
      en: "Jellyfish",
      fr: "Méduse",
      zh: "水母",
      es: "Medusa",
      de: "Qualle"
    },
    price: 600,
    imgSrc: "assets/avatar/jellyfish.png",
    category: "baseAvatar",
    eyePosition: { x: 50, y: 43 },
  },
  {
    names: {
      en: "Shark",
      fr: "Requin",
      zh: "鲨鱼",
      es: "Tiburón",
      de: "Hai"
    },
    price: 1000,
    imgSrc: "assets/avatar/shark.png",
    category: "baseAvatar",
    eyePosition: { x: 60, y: 34 },
  },
  {
    names: {
      en: "Nothing",
      fr: "Rien",
      zh: "无",
      es: "Nada",
      de: "Nichts"
    },
    price: 0,
    imgSrc: "assets/sunglasses/nothing.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Pixels",
      fr: "Pixels",
      zh: "像素",
      es: "Píxeles",
      de: "Pixel"
    },
    price: 400,
    imgSrc: "assets/sunglasses/pixels.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "3D",
      fr: "3D",
      zh: "三维",
      es: "3D",
      de: "3D"
    },
    price: 300,
    imgSrc: "assets/sunglasses/3dsunglasse.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Ski Green",
      fr: "Ski Vert",
      zh: "绿色滑雪",
      es: "Esquí Verde",
      de: "Grüner Ski"
    },
    price: 200,
    imgSrc: "assets/sunglasses/skisunglassgreen.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Underwater",
      fr: "Sous L'eau",
      zh: "水下",
      es: "Bajo el agua",
      de: "Unterwasser"
    },
    price: 200,
    imgSrc: "assets/sunglasses/sousleau.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Monocle",
      fr: "Monocle",
      zh: "单片眼镜",
      es: "Monóculo",
      de: "Monokel"
    },
    price: 300,
    imgSrc: "assets/sunglasses/monocle.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Double Monocle",
      fr: "Double Monocle",
      zh: "双片单镜",
      es: "Doble Monóculo",
      de: "Doppelmonokel"
    },
    price: 800,
    imgSrc: "assets/sunglasses/doublemonocle.png",
    category: "sunglasses",
  },
  {
    names: {
      en: "Black",
      fr: "Noir",
      zh: "黑色",
      es: "Negro",
      de: "Schwarz"
    },
    price: 1000,
    imgSrc: "#000000",
    category: "colorAvatar",
  },
  {
    names: {
      en: "White",
      fr: "Blanc",
      zh: "白色",
      es: "Blanco",
      de: "Weiß"
    },
    price: 0,
    imgSrc: "#FFFFFF",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Red",
      fr: "Rouge",
      zh: "红色",
      es: "Rojo",
      de: "Rot"
    },
    price: 100,
    imgSrc: "#FF0000",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Sand",
      fr: "Sable",
      zh: "沙色",
      es: "Arena",
      de: "Sand"
    },
    price: 100,
    imgSrc: "#F4BF6F",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Pine Green Khaki",
      fr: "Vert sapin kaki",
      zh: "松树绿卡其",
      es: "Caqui verde pino",
      de: "Kieferngrün Khaki"
    },
    price: 100,
    imgSrc: "#085E5B",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Lightning Blue",
      fr: "Bleu éclair",
      zh: "闪电蓝",
      es: "Azul relámpago",
      de: "Blitzblau"
    },
    price: 100,
    imgSrc: "#53EABD",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Toxic Blue",
      fr: "Bleu toxique",
      zh: "有毒蓝",
      es: "Azul tóxico",
      de: "Giftiges Blau"
    },
    price: 200,
    imgSrc: "#2353DB",
    category: "colorAvatar",
  },
  {
    names: {
      en: "Sunset",
      fr: "Couché de soleil",
      zh: "日落",
      es: "Puesta de sol",
      de: "Sonnenuntergang"
    },
    price: 200,
    imgSrc: "#F68028",
    category: "colorAvatar",
  }
];

//await ItemModel.deleteMany({});

async function initOrUpdateItems() {
  //await ItemModel.deleteMany({});
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
