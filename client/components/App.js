import React, { Component } from "react";
import TodoList from "./TodoList";
//import Login from "./login";
import { connect } from "react-redux";
//import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.min.css";
import cookie from "cookie";

class App extends Component {
    constructor (props) {
        super(props);
        this.linkWithGithubIssue = this.linkWithGithubIssue.bind(this);
    }

    linkWithGithubIssue () {
        let cookieJSON = cookie.parse(document.cookie);
        if (!cookieJSON.hasOwnProperty("githubAuth")) {
            location.href = process.env.BASE_URL + "/github/login";
        } else {
            // Show a menu of relevant repos and their issues here
        }
    }

    render () {
        return (
            <div className="App row">
                <span className="col s6 offset-s3 center-align">
                    GitHub: <a href="https://github.com/BrentonWheeler/mern-todolist">BrentonWheeler/mern-todolist</a>{" "}
                </span>
                <TodoList urlID={this.props.match.params.id} urlListID={this.props.match.params.listID} />
                <button
                    className="waves-effect waves-light row btn col s4 offset-s4"
                    onClick={this.linkWithGithubIssue}
                >
                    Add as a tasklist to a GitHub Issue
                </button>
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
