/*jshint esversion: 8*/
const { app, BrowserWindow, ipcMain, globalShortcut, Menu } = require('electron');

// Windows
let win = null;
let manwin = null;
let manbotwin = null;
let manMods = null;
let onlineWindow = null;
let banWin = null;

process.env.NODE_ENV = "production";

// Menu Template
const mainMenuTemplate = [{
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: "CommandOrControl+Q",
        click(){
          app.quit();
        }
      }
    ]
  }
];

// Developer Tools if in developement...
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [{
      label: "Toggle DevTools",
      accelerator: "CommandOrControl+I",
      click(item, focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },{
      role: 'reload'
    }]
  });
}

// Mac menu style...
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({label: "Server Manager"});
}

// Create window function
function createWindow(width, height, html, wintype) {
  let tempwindow;
  tempwindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  tempwindow.loadFile(`./html/${html}/${html}.html`);

  if (wintype === "onlineWindow") {
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
  }

  return tempwindow;
}

// Events
app.on('ready', () => {
  onlineWindow = createWindow(450, 300, "loadingWindow", "onlineWindow");
  onlineWindow.on('closed', () => {
    onlineWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (onlineWindow === null && win === null) {
    onlineWindow = createWindow(450, 300, "loadingWindow", "onlineWindow");
    onlineWindow.on('closed', () => {
      onlineWindow = null;
    });
  }
});

// ipcMain
ipcMain.on('onlineWin:load-successfull', (e, load) => {
  if (load === true) {
    onlineWindow.close();
    win = createWindow(800, 600, "index", "main");
    win.on('closed', () => {
      win = null;

      if(process.platform !== 'darwin') {
        app.quit();
      }
    });
  }
});

ipcMain.on('onlineWin:load-failed', (e, load) => {
  if (load === true) {
    app.quit();
  }
});

// reload page ipc
ipcMain.on('reloadpage', (e, window) => {
  if (window === "win" && win !== null) {
    win.reload();
  } else if (window === "onlineWin" && onlineWindow !== null) {
    onlineWindow.reload();
  } else if (window === "manwin" && manwin !== null) {
    manwin.reload();
  } else if (window === "manbotwin" && manbotwin !== null) {
    manbotwin.reload();
  } else if (window === "manMods" && manMods !== null) {
    manMods.reload();
  } else if (window === "manBots" && manBots !== null) {
    manBots.reload();
  }
});

// open window ipc
ipcMain.on('openWin', (e, wintype) => {
  if (wintype === "manTotalUsers" && manwin === null) {
    manwin = createWindow(600, 400, "manTot", "manage");
    manwin.on('closed', () => {
      manwin = null;
    });
  } else if (wintype === "manTotalBots" && manbotwin === null) {
    manbotwin = createWindow(600, 400, "manTotBot", "manage");
    manbotwin.on('closed', () => {
      manbotwin = null;
    });
  } else if (wintype === "manBans" && banWin === null) {
    banWin = createWindow(600, 400, "banned", "manage");
    banWin.on('closed', () => {
      banWin = null;
    });
  } else if(wintype === "manMods" && manMods === null) {
    manMods = createWindow(600, 400, "manMods", "manage");
    manMods.on('closed', () => {
      manMods = null;
    });
  }
});
