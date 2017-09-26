/* eslint-disable require-jsdoc */

module.exports = (Bluebird, fs, path, tesseract) => {
    var parseDirectory;

    function isImage(fileName) {
        return fileName.includes(".jpg") || fileName.includes(".png") || fileName.includes(".jpeg");
    }

    function directoryCheck(fullPath) {
        return fs.lstatAsync(fullPath).then((dirInfo) => {
            return dirInfo.isDirectory();
        });
    }

    function parseImage(fullPath) {
        console.log(fullPath);

        return tesseract.processAsync(`'${fullPath}'`).then((parsedText) => {
            return {
                fullPath,
                parsedText
            };
        });
    }

    function readdirAbsoluteAsync(dirPath) {
        return fs.readdirAsync(dirPath).map(file => {
            return path.join(dirPath, file);
        });
    }

    function filter(filePath, isRecursiveSearch) {
        return directoryCheck(filePath).then((isDir) => {
            if (isDir && isRecursiveSearch) {
                return parseDirectory(filePath, isRecursiveSearch);
            }

            return isImage(filePath);
        });
    }

    parseDirectory = (dirPath, isRecursiveSearch) => {
        return readdirAbsoluteAsync(dirPath).filter((filePath) => {
            return filter(filePath, isRecursiveSearch);
        }).map((filteredPath) => {
            return parseImage(filteredPath);
        });
    };

    return {
        parse: parseDirectory
    };
};
