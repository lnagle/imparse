/* eslint-disable one-var */
/* eslint-disable require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable init-declarations */

const Bluebird = require("bluebird");
const { app, BrowserWindow, ipcMain } = require("electron");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const tesseract = require("node-tesseract");
const url = require("url");

const directoryParser = require("./helpers/directory_parser")(_, Bluebird, fs, path, tesseract);

Bluebird.promisifyAll(fs);
Bluebird.promisifyAll(tesseract);

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 850
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    function refreshImages(imgPath, isRecursiveSearch) {
        directoryParser.parse(imgPath, isRecursiveSearch).then(images => {
            mainWindow.webContents.send("imageData", images);
        }).catch(error => {
            mainWindow.webContents.send("error", { message: error.message });
        });
    }

    // Open DevTools.
    // mainWindow.webContents.openDevTools();

    ipcMain.on("parseImages", (event, dirPath, isRecursiveSearch) => {
        refreshImages(dirPath[0], isRecursiveSearch);
    });

    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
