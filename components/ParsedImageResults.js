import { Col } from "react-grid-system";
import ParsedImageResult from "./ParsedImageResult";
import React from "react";

const ParsedImageResults = ({ images }) => {
    const parsedImageResults = images.map((image, index) => {
        return (
            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                <ParsedImageResult
                    image={image}
                />
            </Col>
        );
    });

    return (
        <div>
            {parsedImageResults}
        </div>
    );
};

export default ParsedImageResults;
