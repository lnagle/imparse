import React, { Component } from "react"
import ReactDOM from "react-dom"

const ParsedImageResult = ({image, copyImage}) => {
    return (
        <div className="parsedImage">
            <button onClick={e => copyImage(image.absolutePath)}>
                <img src={image.absolutePath}></img>
            </button>
        </div>
    )
}

export default ParsedImageResult;
