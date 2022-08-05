const path = require('path')
var spawn = require("child_process").spawn;
const { app, BrowserWindow } = require('electron')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    title: "OrbitNX",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    }
  })
  win.loadFile(path.join(__dirname, 'main.html'))
};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
spawn('pip',["install", "-r", "requirements.txt"]);