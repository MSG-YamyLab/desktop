    const { app, BrowserWindow, dialog, ipcMain, session } = require("electron");
    const path = require('path');
    const url = require('url');
    const { autoUpdater } = require("electron-updater");
    const fs = require('fs');
    const data = fs.readFileSync(__dirname + '/../package.json', 'utf8');
    const dataObj = JSON.parse(data);

    let updateInterval = null;
    let updateCheck = false;
    let updateFound = false;
    let updateNotAvailable = false;
    let willQuitApp = false;
    let win;

    function createWindow() {
        const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true,
        });
        win = new BrowserWindow({
            width: 1200,
            height: 1200,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, "preload.js"), // Підключаємо preload

            },
            autoHideMenuBar:true,
            icon: path.join(__dirname, 'image.png')  // Вкажи шлях до своєї іконки тут

        });

        if (process.env.REACT_APP_ENV_UPDATE_CHANNEL_STRING === 'dev') {
            win.loadURL(startUrl);
        } else {
            win.loadURL('file:///' + __dirname + "/index.html");
        }

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });

        window.on('close', (e) => {
            if (willQuitApp) {
                /* the user tried to quit the app */
                window = null;
            } else {
                /* the user only tried to close the window */
                e.preventDefault();
                window.hide();
            }
        });
    }

    app.whenReady().then(() => {
        createWindow();

        if (dataObj.version.includes("-alpha")) {
            autoUpdater.channel = "alpha";
        } else if (dataObj.version.includes("-beta")) {
            autoUpdater.channel = "beta";
        } else {
            autoUpdater.channel = "latest";
        }

        updateInterval = setInterval(() => autoUpdater.checkForUpdates(), 10000);
    });

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

    app.on('before-quit', () => willQuitApp = true);

    autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
        const dialogOpts = {
            type: 'info',
            buttons: ['Ok'],
            title: `${autoUpdater.channel} Update Available`,
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: `A new ${autoUpdater.channel} version download started.`
        };

        if (!updateCheck) {
            updateInterval = null;
            dialog.showMessageBox(dialogOpts);
            updateCheck = true;
        }
    });

    autoUpdater.on("update-downloaded", (_event) => {
        if (!updateFound) {
            updateInterval = null;
            updateFound = true;

            setTimeout(() => {
                autoUpdater.quitAndInstall();
            }, 3500);
        }
    });

    autoUpdater.on("update-not-available", (_event) => {
        const dialogOpts = {
            type: 'info',
            buttons: ['Ok'],
            title: `Update Not available for ${autoUpdater.channel}`,
            message: "A message!",
            detail: `Update Not available for ${autoUpdater.channel}`
        };

        if (!updateNotAvailable) {
            updateNotAvailable = true;
            dialog.showMessageBox(dialogOpts);
        }
    });


    ipcMain.on("set-tokens", (_event, access, refresh) => {
        session.defaultSession.cookies.set({
            url: "https://yourapp.com",
            name: "access_token",
            value: access,
            httpOnly: true,
        });
    
        session.defaultSession.cookies.set({
            url: "https://yourapp.com",
            name: "refresh_token",
            value: refresh,
            httpOnly: true,
        });
    });
    
    ipcMain.handle("get-tokens", async () => {
        const cookies = await session.defaultSession.cookies.get({ url: "https://yourapp.com" });
        return {
            access_token: cookies.find((c) => c.name === "access_token")?.value,
            refresh_token: cookies.find((c) => c.name === "refresh_token")?.value,
        };
    });
    
    ipcMain.on("clear-tokens", async () => {
        await session.defaultSession.cookies.remove("https://yourapp.com", "access_token");
        await session.defaultSession.cookies.remove("https://yourapp.com", "refresh_token");
    });