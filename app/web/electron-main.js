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
      transparent: true
    }
  });

  win.setMenu(null);

  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    // Afficher une boîte de dialogue avec un message d'erreur et un bouton "Réessayer"
    const options = {
      type: "error",
      title: "Erreur de chargement",
      message: "Une erreur est survenue lors du chargement de la page. Voulez-vous réessayer ?",
      buttons: ["Réessayer", "Annuler"]
    };

    dialog.showMessageBox(win, options).then((response) => {
      if (response.response === 0) { // Si le bouton "Réessayer" est cliqué
        win.reload(); // Recharger l'application
      }
    });
  });

  // Charger l'URL initiale
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);
