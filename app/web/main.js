const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const expressApp = express();
const PORT = 3000; // Choisissez un port pour votre serveur Express

// Servez votre application React
expressApp.use(express.static(path.join(__dirname, 'build'))); // Assurez-vous que le chemin correspond à celui de votre build React
expressApp.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});

// Créez une fenêtre de navigateur au démarrage de l'application Electron
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Chargez l'URL de votre application Express
    mainWindow.loadURL(`http://localhost:${PORT}`);

    // Ouvrir les outils de développement (DevTools).
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
