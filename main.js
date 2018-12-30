const secret = require('./secret.json')
const { app, BrowserWindow } = require('electron')

let win

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile('index.html')

  win.webContents.openDevTools()
  const client = require('discord-rich-presence')(secret.client_id)

  client.updatePresence({
    state: '단어 외우는 중',
    details: 'https://dimiwords.tk',
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + 1337,
    largeImageKey: 'logo',
    instance: true
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
