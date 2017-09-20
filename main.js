"use strict";

/* eslint-disable one-var */
/* eslint-disable require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable init-declarations */

const Bluebird = require("bluebird");
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const tesseract = require("node-tesseract");
const url = require("url");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

Bluebird.promisifyAll(fs);
Bluebird.promisifyAll(tesseract);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const imagePath = "../../Pictures/Memes";

function prepImagePromises(imgPath, files) {
    let filePromises = [];

    for (let file of files) {
        if (file.includes(".jpg") || file.includes(".png")) {
            const filePath = path.join(imgPath, file);

            filePromises.push(tesseract.processAsync(filePath));
        }
    }

    return filePromises;
}

function parseDirectory(imgPath) {
    return fs.readdirAsync(imgPath).then((files) => {
        let filePromises = prepImagePromises(imgPath, files);

        return Bluebird.all(filePromises);
    });
}

parseDirectory(imagePath).then((images) => {
    console.log(images);
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // const displayWindow = new BrowserWindow({
    //     show: false
    // });
    //
    // displayWindow.once("ready-to-show", () => {
    //     displayWindow.show();
    //
    //     displayWindow.loadURL(url.format({
    //         pathname: path.join(__dirname, "index.html"),
    //         protocol: "file:",
    //         slashes: true
    //     }));
    // });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    // Open DevTools.
    // mainWindow.webContents.openDevTools()

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
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
