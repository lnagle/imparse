Imparse
=======

A handy desktop app for parsing images and filtering by their text. Simply
select a directory, click 'Parse' and filter the results.

Built with [Electron](https://electron.atom.io/), [NodeJS](https://nodejs.org), [ReactJS](https://facebook.github.io/react/), and [Tesseract](https://github.com/tesseract-ocr/tesseract)



Developer Instructions
----------------------

### Prerequisites:

Follow the Tesseract [installation instructions](https://github.com/tesseract-ocr/tesseract#installing-tesseract).

### Clone and Install

In your terminal:
```
git clone github.com/lnagle93/imparse
cd imparse
npm install
```

### Run

Start the React front end:
```
npm run watch
```

In a separate terminal, start Electron:
```
npm start
```


Supported Image Formats
-----------------------

* .bmp
* .jfif
* .jpeg
* .jpg
* .png
* .pnm
* .tif
* .tiff


Building an Executable
----------------------

Coming soon


Future Enhancements
-------------------

* Image preprocessing to improve text parsing.
* Ability to select multiple directories at once.
* Stream images to front end as each is processed.
* Push parsed results in a local data store. Pull images based on their text from
  that data store.
* An app icon to replace the default Electron icon.
