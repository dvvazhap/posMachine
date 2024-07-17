const electron = require("electron");
const { app, BrowserWindow, ipcMain, Notification, remote } = electron;
const { config } = require("./config.js");
const sqlite = require("sqlite-electron");
const path = require('path');
const fs = require("fs");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
async function createDBInstance(){
  await sqlite.setdbPath(path.join("file:"+app.getPath("userData"),config.sqliteDBName) + "?mode:rw", isuri = true);
};
createDBInstance();

ipcMain.handle('initializeApp', async (_, data) => {
  console.log("in main initializing app", data);
  // app.getPath("userData")
  // console.log("....DB path :",path.join("file:"+__dirname,"..",config.sqliteDBName));
  console.log("....DB path :",path.join("file:"+app.getPath("userData"),config.sqliteDBName));
  let tableCreated = await sqlite.executeScript(
    "CREATE TABLE IF NOT EXISTS table2 (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,NAME TEXT NOT NULL,AGE INT NOT NULL,ADDRESS CHAR(50) NOT NULL,SALARY REAL NOT NULL);"
  );

  let obj = data;
  let jsonConfigCreated = await fs.exists(path.join(app.getPath("userData"),config.jsonConfigName), async function (exists) {
    console.log("...............", exists);
    if (!exists) {
      console.log("create json");
      let json = JSON.stringify(obj);
      console.log("json :", json, path.join(app.getPath("userData"),config.jsonConfigName));
      await fs.writeFile(path.join(app.getPath("userData"),config.jsonConfigName), json, 'utf8', function (resp) {
        console.log("create json callback :", resp);
      });
    } else {
      console.log("update json");
      jsonReader(path.join(app.getPath("userData"),config.jsonConfigName), (err, customer) => {
        if (err) {
          console.log("Error reading file:", err);
          return;
        }
        console.log("inside update :",obj);
        let json = JSON.stringify(obj);


        fs.writeFile(path.join(app.getPath("userData"),config.jsonConfigName), json, err => {
          if (err) console.log("Error writing file:", err);
        });
      });
    }
  });

  console.log({ tableCreated });

  return (JSON.stringify({ jsonCreated: jsonConfigCreated }));
});

ipcMain.handle('readJSONConfig', async (_, messsage) => {
  try {
    let data = await fs.readFileSync(path.join(app.getPath("userData"),config.jsonConfigName), 'utf8');
    return JSON.stringify({ status: "success", data: data });
  } catch (err) {
    console.log(err);
    return JSON.stringify({ status: "error", msg: JSON.stringify(err) });
  }
});