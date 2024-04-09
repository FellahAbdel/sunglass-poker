// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
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
      webSecurity: true
    }
  });

  win.setMenu(null);

  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    if (errorCode === -3) { // Vérifier si c'est une erreur JavaScript
      // Afficher une boîte de dialogue personnalisée avec un bouton de réessai
      const options = {
        type: "error",
        title: "Erreur JavaScript",
        message: "Une erreur JavaScript est survenue. Voulez-vous réessayer ?",
        buttons: ["Réessayer", "Annuler"]
      };

      dialog.showMessageBox(win, options).then((response) => {
        if (response.response === 0) { // Si le bouton "Réessayer" est cliqué
          win.reload(); // Recharger la page
        }
      });
    } else {
      // Gérer les autres types d'erreurs de chargement de page si nécessaire
    }
  });

  // Charger l'URL initiale
  win.loadURL("http://localhost:3000");
}


app.whenReady().then(createWindow);