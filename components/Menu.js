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
                <div id="header">
                    <div id="title">
                        <h1>Image Parser</h1>
                    </div>

                    <Filter
                        onSearchTermChange={this.props.filter}/>
                </div>

                <div id="controls">
                    <div id="directoryContainer">
                        <div>
                            Selected Directory: {this.state.selectedDirectory}
                        </div>
                        <div>
                            <button onClick={this.changeDirectory}>Change Directory...</button>
                        </div>
                    </div>
                    <div id="parsingContainer">
                        <div>
                            <input type="checkbox" onClick={this.toggleIsRecursionEnabled} value={this.state.isRecursionEnabled} />
                            Parse Subfolders
                        </div>
                        <div>
                            <button onClick={this.props.updateResults(this.state.selectedDirectory, this.state.isRecursionEnabled)}>
                                Parse
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
