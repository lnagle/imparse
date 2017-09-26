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
            images: [],
            isRecursionEnabled: false,
            selectedDirectory: ""
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

        this.copyImage = (absolutePath) => {
            clipboard.writeImage(absolutePath);
        }

        this.changeDirectory = () => {
            dialog.showOpenDialog({
                properties: [
                    "openDirectory"
                ]
            }, (selectedDirectory) => {
                if (selectedDirectory) {
                    this.setState({selectedDirectory})
                }
            });
        }

        this.updateResults = () => {
            ipcRenderer.send("newDirectoryChosen", this.state.selectedDirectory, this.state.isRecursionEnabled, "123");
        }

        this.toggleIsRecursionEnabled = () => {
            this.setState({
                isRecursionEnabled: !this.state.isRecursionEnabled
            });
        }
    }

    render() {
        return (
            <div className="content">
                <div id="search">
                    <div>
                        <button onClick={this.changeDirectory}>Change Directory</button>
                    </div>
                    <div>
                        Directory Selected: {this.state.selectedDirectory}
                    </div>
                    <div>
                        Search Rescursively: <input type="checkbox" onClick={this.toggleIsRecursionEnabled} value={this.state.isRecursionEnabled} />
                    </div>
                    <div>
                        <button onClick={this.updateResults}>Go!</button>
                    </div>

                    Filter Results: <Search
                        onSearchTermChange={this.filter}/>
                </div>

                <div id="searchResults">
                    <ParsedImageResults
                        images={this.state.filteredImages.length ? this.state.filteredImages : this.state.images}
                        copyImage={this.copyImage} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
