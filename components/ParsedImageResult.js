import React, { Component } from "react"
import ReactDOM from "react-dom"

const ParsedImageResult = ({image}) => {
    return (
        <div>
        <img src={image.fullPath} height="50%"></img>
        <br/>
        {image.parsedText}
    </div>
    )
}

export default ParsedImageResult;
