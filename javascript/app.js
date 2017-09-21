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
                {this.state.images.map((image, index) => {
                    return <p key={index}>
                        <img src={image.fullPath}></img>
                        <br/>
                        {image.parsedText}
                    </p>
                })}
            </div>
        );
    }
}

ReactDOM.render(<ImagesContainer/>, document.getElementById("content"));
