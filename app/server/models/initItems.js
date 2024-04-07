// initItems.js
const ItemModel = require('./Item'); // Assurez-vous que le chemin d'accès est correct

const defaultItems = [
    { name: 'Avatar1', price: 100, imgSrc: '/assets/avatar/1.png' },
    { name: 'Avatar2', price: 100, imgSrc: '/assets/avatar/2.png' },
    { name: 'Avatar3', price: 100, imgSrc: '/assets/avatar/3.png' },
    { name: 'Avatar4', price: 100, imgSrc: '/assets/avatar/4.png' },
    { name: 'Avatar5', price: 100, imgSrc: '/assets/avatar/5.png' },
];

async function initItems() {
    try {
        for (const item of defaultItems) {
            // Vérifier si l'élément existe déjà dans la base de données
            const existingItem = await ItemModel.findOne({ name: item.name });
            if (!existingItem) {
                // Si l'élément n'existe pas, l'insérer dans la base de données
                await ItemModel.create(item);
                console.log("Un élément à été ajouté a la bdd")
            }
        }
        console.log('La table ditems a été initialisé avec succès');
    } catch (error) {
        console.error('Erreur lors de linitialisation des items:', error);
    }
}

module.exports = initItems;
