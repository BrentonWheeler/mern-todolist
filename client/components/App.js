import React, { Component } from "react";
import TodoList from "./TodoList";
import LinkWithGitHub from "./LinkWithGitHub";
//import Login from "./login";
import { connect } from "react-redux";
//import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.min.css";

class App extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="App row">
                <span className="col s6 offset-s3 center-align">
                    GitHub: <a href="https://github.com/BrentonWheeler/mern-todolist">BrentonWheeler/mern-todolist</a>{" "}
                </span>
                <LinkWithGitHub />
                <TodoList urlID={this.props.match.params.id} urlListID={this.props.match.params.listID} />
                <ToastContainer
                    position="top-left"
                    type="success"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
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
