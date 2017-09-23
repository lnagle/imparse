import React, { Component } from "react"
import ReactDOM from "react-dom"
import ParsedImageResult from "./ParsedImageResult"

const ParsedImageResults = ({images}) => {
    const parsedImageResults = images.map((image, index) => {
        return (
            <ParsedImageResult
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
