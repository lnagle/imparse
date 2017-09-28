import Menu from "./components/Menu";
import ParsedImageResults from "./components/ParsedImageResults";
import React, { Component } from "react"; // eslint-disable-line sort-imports
import ReactDOM from "react-dom";
import { Row } from "react-grid-system";
import { ipcRenderer } from "electron";

require("./less/app.less");

class ImagesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredImages: [],
            images: [],
            searchTermEntered: false
        };

        this.getImages = () => {
            if (this.state.filteredImages.length) {
                return this.state.filteredImages;
            } else if (this.state.searchTermEntered) {
                return this.state.filteredImages;
            }

            return this.state.images;
        };

        this.listener = ipcRenderer.on("imageData", (event, images) => {
            this.setState({ images });
        });

        this.filter = (term) => {
            let filteredImages;

            filteredImages = [];

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

            this.setState({ filteredImages });
        };

        this.updateResults = (selectedDirectory, isRecursionEnabled) => {
            ipcRenderer.send("parseImages", selectedDirectory, isRecursionEnabled);
        };
    }

    render() {
        return (
            <div className="content">
                <Menu
                    filter={this.filter}
                    updateResults={this.updateResults} />
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
