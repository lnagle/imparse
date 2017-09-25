import React, { Component } from "react"
import ReactDOM from "react-dom"
import { clipboard, ipcRenderer, remote } from "electron"
import ParsedImageResults from "./components/ParsedImageResults";
import Search from "./components/Search"

const dialog = remote.dialog;

class ImagesContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filteredImages: [],
            images: []
        }

        this.listener = ipcRenderer.on("imageData", (event, images) => {
            this.setState({images});
        })

        this.filter = (term) => {
            let filteredImages = [];

            if (term) {
                filteredImages = this.state.images.filter((image) => {
                    return image.parsedText.toUpperCase().includes(term.toUpperCase());
                });

            }

            this.setState({filteredImages});
        };

        this.copyImage = (fullPath) => {
            clipboard.writeImage(fullPath);
        }

        this.test = () => {
            dialog.showOpenDialog({
                properties: [
                    "openDirectory"
                ]
            }, (dirPath) => {
                if (dirPath) {
                    ipcRenderer.send("newDirectoryChosen", dirPath);
                }
            });
        }
    }

    render() {
        return (
            <div className="content">
                <button onClick={this.test}>Click Me</button>
                <Search
                    onSearchTermChange={this.filter}/>
                <ParsedImageResults
                    images={this.state.images}
                    copyImage={this.copyImage} />
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
