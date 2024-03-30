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
  win.loadURL("http://localhost:3000")
}

app.whenReady().then(createWindow);