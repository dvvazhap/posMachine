const electron = require("electron");
const { app, BrowserWindow, ipcMain, Notification, remote } = electron;
require("./main/print/index.js");
require("./main/initializeApp.js");
const sqlite = require("sqlite-electron");
const fs = require("fs");
const { config } = require("./main/config.js");
const path = require('path');
const { stat } = require('fs/promises');
const url = require('url');
const isDev = !app.isPackaged;

let win;
function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true,
  });
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecutionJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    }
  });
  win.loadURL(startUrl);
  win.webContents.openDevTools();
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

ipcMain.handle('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
  return 'hello';
});

ipcMain.handle('precheckJSONFile', async (_, messsage) => {
  return await stat(path.join(app.getPath("userData"),config.jsonConfigName))
    .then(() => true)
    .catch((e) => false);
});


ipcMain.handle("executeSingleQuery", async (event, query, values) => {
  console.log("in main function executeSingleQuery:", query, values);
  return await sqlite.executeQuery(query, values);

  // db.serialize(function () {
  //   db.run('CREATE TABLE if not exists lorem (info TEXT)');

  // const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  // for (let i = 0; i < 1; i++) {
  //   stmt.run(`Ipsum ${i}`);
  // }
  // stmt.finalize();

  // db.each(
  //   'SELECT rowid AS id, info FROM lorem',
  //   function (err, row) {
  //     console.log(`${row.id}: ${row.info}`);
  //   },
  // );
  // });
  // db.close();
});

ipcMain.handle("executeMulQuery", async (event, query, values) => {
  console.log("in main function executeMulQuery:", query, values);
  return await sqlite.executeMany(query, values);
});

ipcMain.handle("fetchAllData", async (event, query, values) => {
  console.log("in main function fetchAllData :", query, values);
  return await sqlite.fetchAll(query, values);
})

