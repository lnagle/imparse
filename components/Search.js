import React, {Component} from "react";
import ReactDOM from "react-dom";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        }
    }

    render() {
        return (
            <form>
                <input
                    onChange={event => this.onInputChange(event.target.value)}
                    type="text"
                    value={this.state.term} />
            </form>
        )
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default Search;
