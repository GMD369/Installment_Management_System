const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // future functions (backup, file dialogs etc)
  console.log("API loaded");
});