import React, { Component } from "react";
import TodoList from "./todoList";
//import Login from "./login";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

class App extends Component {
    constructor (props) {
        super(props);
        this.copyToClipboardClicked = this.copyToClipboardClicked.bind(this);
    }

    copyToClipboardClicked () {
        console.log("copied to clipboard");
    }

    render () {
        return (
            <div className="App row">
                <span className="col s6 offset-s3 center-align">
                    GitHub: <a href="https://github.com/BrentonWheeler/mern-todolist">
                        BrentonWheeler/mern-todolist
                    </a>{" "}
                </span>
                <TodoList urlID={this.props.match.params.id} />
                <span className="" style={{ position: "absolute", top: "0px", left: "0px" }}>
                    * Click{" "}
                    <CopyToClipboard text={window.location.href}>
                        <a onClick={this.copyToClipboardClicked}>here</a>
                    </CopyToClipboard>{" "}
                    to copy url to clipboard
                </span>
            </div>
        );
    }
}

// Redux Connections
const mapStateToProps = state => {
    return {
        todoList: state.todoLists
    };
};

export default connect(mapStateToProps, null)(App);
