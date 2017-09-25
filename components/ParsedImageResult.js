import React, { Component } from "react"
import ReactDOM from "react-dom"

const ParsedImageResult = ({image, copyImage}) => {
    return (
        <div>
            <button onClick={e => copyImage(image.fullPath)}>
            <img src={image.fullPath} height="50%"></img>
        </button>
        <br/>
        {image.parsedText}
    </div>
    )
}

export default ParsedImageResult;
