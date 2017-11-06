import React, { Component } from "react";
import TodoList from "./todoList";
//import Login from "./login";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Materialize from "../styles/js/bin/materialize.js";

class App extends Component {
    constructor (props) {
        super(props);
        this.copyToClipboardClicked = this.copyToClipboardClicked.bind(this);
    }

    copyToClipboardClicked () {
        Materialize.toast("Url copied to clipboard", 3000, "rounded col s1");
    }

    render () {
        return (
            <div className="App row">
                <span className="col s6 offset-s3 center-align">
                    GitHub: <a href="https://github.com/BrentonWheeler/mern-todolist">
                        BrentonWheeler/mern-todolist
                    </a>{" "}
                </span>
                {/*<h1>Todolist Unique ID: {this.props.match.params.id}</h1>*/}
                <TodoList urlID={this.props.match.params.id} />
                {/* {<Login />} */}
                <span className="" style={{ position: "absolute", top: "0px", left: "0px" }}>
                    * Double click on a <b>TodoItem's text</b> or the <b>TodoList's title</b> to edit them. <br />
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
