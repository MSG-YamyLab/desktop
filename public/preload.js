const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setTokens: (access, refresh) => ipcRenderer.send("set-tokens", access, refresh),
  getTokens: () => ipcRenderer.invoke("get-tokens"),
  clearTokens: () => ipcRenderer.send("clear-tokens"),
});
