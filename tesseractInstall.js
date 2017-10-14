// const path = require("path");
const { exec } = require("child_process");

function errorHandler(err) {
    if (err) {
        throw err;
    }
}

/*
This won't work if you do not have homebrew installed.
This won't work if your homebrew path isn't the default /usr/local/Cellar.
This won't work if you don't have at least version 3 of Tesseract.
*/


// exec("tesseract -v", (tessCheckErr, tessCheckStdout, tessCheckStderr) => {
//     if (tessCheckErr || tessCheckStderr) {
//         // console.log("Installing Tesseract via Homebrew.");
//         // exec("brew install Tesseract", (err, stdout, stderr) => {
//         //     errorHandler(err);
//         //     errorHandler(stderr);
//         //     console.log(stdout);
//         //
//     }
//
//     // TODO regex for version.
//     if (tessCheckStdout) {
//
//     } else {
//         // TODO Fix this too
//         console.log(`Tesseract version: ${tessCheckStdout}`);
//         throw new Error("Tesseract must be at least version 3 for this to work.");
//     }
// });
// });

console.log("Brew config:");
exec("brew config", (err2, stdout2, stderr2) => {
    errorHandler(err2);
    errorHandler(stderr2);
    console.log(stdout2);

    console.log("Copying Tesseract for Imparse packaging...");
    exec(`cp -r /usr/local/Cellar/tesseract ${__dirname}/tesseract`, (err3, stdout3, stderr3) => {
        errorHandler(err3);
        errorHandler(stderr3);
        console.log(stdout3);

        exec("ln ./tesseract/*/bin/tesseract tesseract", (err4, stdout4, stderr4) => {
            errorHandler(err4);
            errorHandler(stderr4);
            console.log(stdout4);
            console.log("Everything is right with the world");
        });
    });
});

