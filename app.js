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
                            images={this.state.filteredImages.length ? this.state.filteredImages : this.state.images}
                            copyImage={this.copyImage} />
                    </div>
                </Row>
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
