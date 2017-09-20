import React from "react"
import ReactDOM from "react-dom"

// require('../less/main.less');

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
