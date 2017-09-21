import React, { Component } from "react"
import ReactDOM from "react-dom"
import { ipcRenderer } from "electron"

// require('../less/main.less');

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
                Hello world from ReactJS

                <br/>

                Images: {this.state.images}
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
