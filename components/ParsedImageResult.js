import React, { Component } from "react"
import ReactDOM from "react-dom"

const ParsedImageResult = ({image, copyImage}) => {
    return (
        <div>
            <button onClick={e => copyImage(image.absolutePath)}>
            <img src={image.absolutePath} height="50%"></img>
        </button>
    </div>
    )
}

export default ParsedImageResult;
