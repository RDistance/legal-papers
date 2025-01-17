const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // isDev
  //   ? win.loadURL('http://localhost:5173')
  //   : win.loadFile(path.resolve(__dirname, 'pages/index.html'))
  
  //本地
 // win.loadURL('http://localhost:5173');
  //线上
  win.loadFile(path.resolve(__dirname, 'pages/index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})