import React, { Component } from "react"
import ReactDOM from "react-dom"
import ParsedImageResult from "./ParsedImageResult"

const ParsedImageResults = ({images, copyImage}) => {
    const parsedImageResults = images.map((image, index) => {
        return (
            <ParsedImageResult
                copyImage={copyImage}
                image={image}
                key={index}
            />
        )
    });

    return (
        <div>
            {parsedImageResults}
        </div>
    )
}

export default ParsedImageResults;
