// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { create } = require("domain");

// const PORT = 8088;

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      enableRemoteModule: false,
      webSecurity: true,
    }
  });

  win.setMenu(null);

  // Fonction pour afficher une image de remplacement en cas d'échec de chargement
  function showImageOnError() {
    win.loadFile("error.html"); // Charger le fichier HTML de l'image de remplacement
  }

  // Événement de chargement échoué
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    // Affiche une image de remplacement en cas d'échec de chargement
    showImageOnError();

    // Afficher une boîte de dialogue avec un message d'erreur et un bouton "Réessayer"
    const options = {
      type: "error",
      title: "Erreur de chargement",
      message: "Une erreur est survenue lors du chargement de la page. Voulez-vous réessayer ?",
      buttons: ["Réessayer", "Annuler"]
    };

  });

  // Charger l'URL initiale
  win.loadURL("http://localhost:3000");
  //win.loadURL("http://localhost:9999");

  //win.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);

}

app.whenReady().then(createWindow);
