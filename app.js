import Menu from "./components/Menu";
import ParsedImageResults from "./components/ParsedImageResults";
import React, { Component } from "react"; // eslint-disable-line sort-imports
import ReactDOM from "react-dom";
import { Row } from "react-grid-system";
import { ipcRenderer } from "electron";
import Spinner from "react-spinkit";

require("./less/app.less");

class ImagesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredImages: [],
            error: null,
            images: [],
            isLoading: false,
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

        this.successListener = ipcRenderer.on("imageData", (event, images) => {
            this.setState({
                images,
                isLoading: false
            });
        });

        this.errorListener = ipcRenderer.on("error", (event, errorData) => {
            console.log(errorData);

            this.setState({
                error: "An error has occured",
                isLoading: false
            });
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
            this.setState({
                error: null,
                isLoading: true
            });
            ipcRenderer.send("parseImages", selectedDirectory, isRecursionEnabled);
        };

        this.shouldShowLoading = () => {
            if (this.state.isLoading) {
                return (
                    <div>
                        <div className="overlay"></div>
                        <Spinner overrideSpinnerClassName="loadingIcon" name="double-bounce" fadeIn="quarter" color="white"/>
                    </div>
                )
            }
        }

        this.showError = () => {
            if (this.state.error) {
                return (
                    <div id="errorContainer">
                        <div>{this.state.error}</div>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div className="content">
                <Menu
                    filter={this.filter}
                    updateResults={this.updateResults} />

                {this.showError()}

                <Row>
                    <div id="searchResults">
                        <ParsedImageResults
                            images={this.getImages()}
                            copyImage={this.copyImage} />
                    </div>
                </Row>

                {this.shouldShowLoading()}
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
