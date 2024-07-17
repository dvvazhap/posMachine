const electron = require("electron");
const { ipcMain, remote } = electron;
const {print} = require("./printConfig");

ipcMain.handle('print-bill', (_, value) => {
  console.log(".....inside main print bill", value);
  return print();
});

ipcMain.handle('get-printers', (_, message) => {
  // new Notification({ title: 'Notification', body: message }).show();
  let webContents = remote.getCurrentWebContents();
  let printers = webContents.getPrinters(); //list the printers
  console.log(printers);
  return 'returninng printers';
});