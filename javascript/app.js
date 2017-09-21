import React from "react"
import ReactDOM from "react-dom"
import {ipcRenderer} from "electron"

// require('../less/main.less');
//
ipcRenderer.on("imageData", (event, arg) => {
    console.log(event);
    console.log(arg);
})

var HelloBox = React.createClass({
  render: function() {
    return (
      <div className="content">
          Hello world from ReactJS
      </div>
    );
  }
});

ReactDOM.render(<HelloBox/>, document.getElementById("content"));
