import React from "react";
import { clipboard } from "electron";

function copyImage(absolutePath) {
    clipboard.writeImage(absolutePath);
}

const ParsedImageResult = ({ image }) => {
    return (
        <div className="parsedImage">
            <button onClick={copyImage(image.absolutePath)}>
                <img src={image.absolutePath}></img>
            </button>
        </div>
    );
};

export default ParsedImageResult;
