import React, { Component } from "react"
import ReactDOM from "react-dom"
import { ipcRenderer } from "electron"
import ParsedImageResults from "./components/ParsedImageResults";
import Search from "./components/Search"

class ImagesContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: []
        }

        this.listener = ipcRenderer.on("imageData", (event, arg) => {
            this.setState({
                images: arg
            });
        })
    }

    render() {
        return (
            <div className="content">
                <Search />
                <ParsedImageResults images={this.state.images} />
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
