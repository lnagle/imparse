import React, { Component } from "react"
import ReactDOM from "react-dom"
import ParsedImageResult from "./ParsedImageResult"
import { Col } from "react-grid-system";

const ParsedImageResults = ({images, copyImage}) => {
    const parsedImageResults = images.map((image, index) => {
        return (
            <Col xs={12} sm={12} md={12} lg={6} xl={4}>
                <ParsedImageResult
                    copyImage={copyImage}
                    image={image}
                    key={index}
                />
            </Col>
        )
    });

    return (
        <div>
            {parsedImageResults}
        </div>
    )
}

export default ParsedImageResults;
