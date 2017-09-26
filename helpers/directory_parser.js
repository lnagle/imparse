module.exports = (_, Bluebird, fs, path, tesseract) => {
    /**
     * @param {string} fileName
     * @return {bool}
     */
    function isImage(fileName) {
        return fileName.includes(".jpg") || fileName.includes(".png") || fileName.includes(".jpeg");
    }

    /**
     * @param {string} absolutePath
     * @return {bool}
     */
    function directoryCheck(absolutePath) {
        return fs.lstatAsync(absolutePath).then((dirInfo) => {
            return dirInfo.isDirectory();
        });
    }

    /**
     * @param {string} absolutePath
     * @return {Object}
     */
    function parseImage(absolutePath) {
        // Tesseract is unable to handle blank spaces in file paths.
        // This solves that issue.
        const spaceSafePath = `'${absolutePath}'`;

        return tesseract.processAsync(spaceSafePath).then((parsedText) => {
            return {
                absolutePath,
                parsedText
            };
        });
    }

    /**
     * @param {string} dirPath
     * @return {array} List of absolute paths
     */
    function readdirAbsoluteAsync(dirPath) {
        return fs.readdirAsync(dirPath).map(file => {
            return path.join(dirPath, file);
        });
    }

    /**
     * Returns true for images or for directories if the isRecursiveSearch flag
     * is set.
     *
     * @param {string} filePath An absolute path to a file
     * @param {bool} isRecursiveSearch
     * @return {bool}
     */
    function filter(filePath, isRecursiveSearch) {
        if (isImage(filePath)) {
            return true;
        } else if (isRecursiveSearch) {
            return directoryCheck(filePath).then(isDir => {
                return isDir;
            });
        }

        return false;
    }

    /**
     * @param {string} dirPath
     * @param {bool} isRecursiveSearch
     * @return {Promise<array>}
     */
    function parse(dirPath, isRecursiveSearch) {
        return readdirAbsoluteAsync(dirPath).filter(filePath => {
            return filter(filePath, isRecursiveSearch);
        }).map(filteredPath => {
            if (isImage(filteredPath)) {
                return parseImage(filteredPath);
            }

            return parse(filteredPath, isRecursiveSearch);
        }).then(images => {
            return _.flatten(images);
        });
    }

    return {
        parse
    };
};
