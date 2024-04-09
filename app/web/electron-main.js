// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { create } = require("domain");
// const PORT = 8088;

function createWindow() {
  const win = new BrowserWindow({
    width:1920,
    height:1080,
    webPreferences:{
      nodeIntegration: true
    }
  })
  win.setMenu(null);

  // Gérer les événements d'erreur de chargement de la page
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    // Afficher un message d'erreur à l'utilisateur
    dialog.showErrorBox("Erreur de chargement de la page", `Code d'erreur: ${errorCode}\nDescription de l'erreur: ${errorDescription}`);
  });

  win.loadURL("http://localhost:3001")
  //win.loadURL("https://httpstat.us/404");
  //win.loadURL("http://example.com/non-existent");


}

app.whenReady().then(createWindow);