import React, { Component } from "react"
import ReactDOM from "react-dom"
import { clipboard, ipcRenderer } from "electron"
import ParsedImageResults from "./components/ParsedImageResults";
import Search from "./components/Search"

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
    }

    render() {
        return (
            <div className="content">
                <Search
                    onSearchTermChange={this.filter}/>
                <ParsedImageResults
                    images={this.state.filteredImages}
                    copyImage={this.copyImage} />
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
