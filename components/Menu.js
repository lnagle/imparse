import Filter from "./Filter";
import { remote } from "electron";
import React, { Component } from "react"; // eslint-disable-line sort-imports

const dialog = remote.dialog;

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRecursionEnabled: false,
            selectedDirectory: []
        };

        this.changeDirectory = () => {
            dialog.showOpenDialog({
                properties: [
                    "openDirectory"
                ]
            }, (selectedDirectory) => {
                if (selectedDirectory) {
                    this.setState({ selectedDirectory });
                }
            });
        };

        this.toggleIsRecursionEnabled = () => {
            this.setState({
                isRecursionEnabled: !this.state.isRecursionEnabled
            });
        };
    }

    render() {
        return (
            <div id="menu">
                <a className="tooltip">?
                    <div>
                        Select a directory and click 'Scan Images' to begin <br /><br />
                        Use the search bar to find images based on their text <br /><br />
                        Click an image to copy it to your clipboard
                    </div>
                </a>

                <div id="controls">
                    <div id="directoryContainer">
                        <div>
                            Selected Directory: {this.state.selectedDirectory}
                        </div>
                        <div>
                            <button onClick={this.changeDirectory}>Select A Directory...</button>
                        </div>
                    </div>
                    <div id="parsingContainer">
                        <div>
                            <input type="checkbox" onClick={this.toggleIsRecursionEnabled} value={this.state.isRecursionEnabled} />
                            Scan Subfolders
                        </div>
                        <div>
                            <button onClick={() => this.props.updateResults(this.state.selectedDirectory, this.state.isRecursionEnabled)}>
                                Scan Images
                            </button>
                        </div>
                    </div>
                </div>

                <Filter
                    onSearchTermChange={this.props.filter}/>
            </div>
        );
    }
}

export default Menu;
