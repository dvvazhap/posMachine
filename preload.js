const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  initializeApp: function (message) {
    return ipcRenderer.invoke('initializeApp', message);
  },
  readJSONConfig: function(){
    return ipcRenderer.invoke('readJSONConfig');
  },
  getPrinters: function (message) {
    console.log("Preload getPRinters:", message);
    return ipcRenderer.invoke('get-printers', message);
  },
  printBill: function (data) {
    console.log("Preload printBill", data);
    return ipcRenderer.invoke('print-bill', data);
  },
  sendNotification: function (message) {
    console.log('message :', message);
    return ipcRenderer.invoke('notify', message);
  },
  precheckJSONFile: function (data) {
    return ipcRenderer.invoke('precheckJSONFile', data);
  },

  executeSingleQuery1: function (...args) {
    console.log('Preload Execute Single query:', ...args);
    return ipcRenderer.invoke('executeSingleQuery', ...args);
  },
  executeMulQuery1: function (...args) {
    console.log('Preload Execute Multiple query:', ...args);
    return ipcRenderer.invoke('executeMulQuery', ...args);
  },
  fetchAllData1: function (...args) {
    console.log('Preload Fetch All Data', ...args);
    return ipcRenderer.invoke('fetchAllData', ...args);
  }


  // dbResponse: (callback) => ipcRenderer.on('db-resp', (_event, value) => {
  //   console.log('_event: ',_event, value);
  //   return callback(value)})

});

// ipcRenderer.on('asynchronous-message', function (evt, message) {
//   console.log(message); // Returns: {'SAVED': 'File Saved'}
// });