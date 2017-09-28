import React, { Component } from "react"
import ReactDOM from "react-dom"
import { clipboard, ipcRenderer, remote } from "electron"
import ParsedImageResults from "./components/ParsedImageResults";
import Filter from "./components/Filter"
import { Row } from "react-grid-system";

require("./less/app.less");

const dialog = remote.dialog;

class ImagesContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filteredImages: [],
            images: [],
            isRecursionEnabled: false,
            searchTermEntered: false,
            selectedDirectory: ""
        }

        this.getImages = () => {
            if (this.state.filteredImages.length) {
                return this.state.filteredImages;
            } else if (this.state.searchTermEntered) {
                return this.state.filteredImages;
            }

            return this.state.images;
        }

        this.listener = ipcRenderer.on("imageData", (event, images) => {
            this.setState({images});
        })

        this.filter = (term) => {
            let filteredImages = [];

            if (term) {
                this.setState({
                    searchTermEntered: true
                });

                filteredImages = this.state.images.filter((image) => {
                    return image.parsedText.toUpperCase().includes(term.toUpperCase());
                });

            } else {
                this.setState({
                    searchTermEntered: false
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
                <div id="menu">
                    <div id="header">
                        <div id="title">
                            <h1>Image Parser</h1>
                        </div>

                        <Filter
                            onSearchTermChange={this.filter}/>
                    </div>

                    <div id="controls">
                        <div id="directoryContainer">
                            <div>
                                Selected Directory: {this.state.selectedDirectory}
                            </div>
                            <div>
                                <button onClick={this.changeDirectory}>Change Directory...</button>
                            </div>
                        </div>
                        <div id="parsingContainer">
                            <div>
                                <input type="checkbox" onClick={this.toggleIsRecursionEnabled} value={this.state.isRecursionEnabled} />
                                Parse Subfolders
                            </div>
                            <div>
                                <button onClick={this.updateResults}>Parse</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Row>
                    <div id="searchResults">
                        <ParsedImageResults
                            images={this.getImages()}
                            copyImage={this.copyImage} />
                    </div>
                </Row>
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
