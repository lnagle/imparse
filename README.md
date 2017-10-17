Imparse
=======

A handy desktop app for scanning images and searching by their text. Simply
select a directory, click 'Scan Images' and search through the results.

Built with [Electron](https://electron.atom.io/), [NodeJS](https://nodejs.org), [ReactJS](https://facebook.github.io/react/), and [Tesseract](https://github.com/tesseract-ocr/tesseract)



Developer Instructions
----------------------

### Prerequisites:

Follow the Tesseract [installation instructions](https://github.com/tesseract-ocr/tesseract#installing-tesseract).

### Clone and Install

In your terminal:
```
git clone https://github.com/lnagle93/imparse.git
cd imparse
npm install
npm run webpack
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


A Note On Tesseract
-------------------

As one might imagine, training a computer to recognize a specific set of symbols (letters, numbers, etc) that can come in a variety of forms (fonts), sizes, colors, and on a variety of backgrounds is not a simple task. Given that, it should be no surprise that Tesseract, the [optical character recognition engine](https://en.wikipedia.org/wiki/Optical_character_recognition) that Imparse utilizes, is not perfect.

A few things to consider about Tesseract when scanning images using Imparse:

* Tesseract performs best on images that have black text on a
  white background.
* The inverse, white text on a black background, often produces underwhelming
  results.
* The size of text typically doesn't affect the quality of results. For example, Tesseract has little problem accurately
  scanning a page of a book, assuming that the image meets the criteria of the
  first bullet point.


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

* [Image preprocessing](https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality) and [training](https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00) to improve text parsing.
* Ability to select multiple directories at once.
* Stream images to front end as each is processed.
* Push parsed results into a local data store. Pull images based on their text from
  that data store.
* An app icon to replace the default Electron icon.
