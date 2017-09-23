module.exports = (Bluebird, fs, path, tesseract) => {
    function filterForImages(files) {
        return files.filter((fileName) => {
            return fileName.includes(".jpg") || fileName.includes(".png");
        });
    }

    function parseImages(dirPath, files) {
        files = filterForImages(files);

        return files.map((fileName) => {
            const fullPath = path.join(dirPath, fileName);

            return tesseract.processAsync(fullPath).then((parsedText) => {
                return {
                    fullPath,
                    parsedText
                };
            });
        });
    }

    function parseDirectory(dirPath) {
        return fs.readdirAsync(dirPath).then((files) => {
            return Bluebird.all(parseImages(dirPath, files));
        });
    }

    return {
        parse: parseDirectory
    };
};
