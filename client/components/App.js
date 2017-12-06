import React, { Component } from "react";
import TodoList from "./TodoList";
import LinkWithGitHub from "./LinkWithGitHub";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
import getTrelloListItemsAction from "../redux/actions/getTrelloListItemsAction";
import cookie from "cookie";
import githubAPI from "../api/github";

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            toastID: null,
            githubLinkLoading: false,
            githubIssues: null,
            isGitHubLinkOwner: false
        };
        this.notify = this.notify.bind(this);
        this.loadTodoItemsFromURL = this.loadTodoItemsFromURL.bind(this);
        this.linkWithGithubChecks = this.linkWithGithubChecks.bind(this);
    }

    componentWillMount () {
        this.loadTodoItemsFromURL().then(() => this.linkWithGithubChecks());
    }

    // Loads todo items if url accessed directly
    loadTodoItemsFromURL () {
        return new Promise((resolve, reject) => {
            if (this.props.todoList.id === "") {
                this.props.getTodoItemsAction(this.props.match.params.id).then(() => {
                    resolve();
                });
            } else if (this.props.todoList.isImporting) {
                this.props.getTrelloListItemsAction(this.props.trello, this.props.todoList.id).then(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    // Initial LinkWithGitHub checks for correct setup actions
    linkWithGithubChecks () {
        // Check if github auth has been passed in cookie AND TodoList is NOT already linked
        if (
            cookie.parse(document.cookie).hasOwnProperty("githubAuth") &&
            this.props.todoList.githubUpdateURL === null
        ) {
            this.setState({ githubLinkLoading: true });
            githubAPI.getIssues(cookie.parse(document.cookie).githubAuth).then(result => {
                this.setState({ githubIssues: result.data });
                this.setState({ githubLinkLoading: false });
            });
            // Check if github auth has been passed in cookie AND TodoList is already linked
        } else if (
            cookie.parse(document.cookie).hasOwnProperty("githubAuth") &&
            this.props.todoList.githubUpdateURL !== null
        ) {
            this.setState({ githubLinkLoading: true });
            githubAPI.getCurrentUser(cookie.parse(document.cookie).githubAuth).then(login => {
                // Check if current user is owner of the link
                if (this.props.todoList.githubLinkOwner === login.data) {
                    this.setState({ isGitHubLinkOwner: true });
                } else {
                    this.setState({ isGitHubLinkOwner: false });
                }
                this.setState({ githubLinkLoading: false });
            });
        }
    }

    notify (string, type) {
        if (!toast.isActive(this.state.toastID)) {
            this.setState({
                toastID: toast(string, { type: type })
            });
        }
    }

    render () {
        return (
            <div className="App row">
                <span className="col s6 offset-s3 center-align">
                    GitHub: <a href="https://github.com/BrentonWheeler/mern-todolist">BrentonWheeler/mern-todolist</a>{" "}
                </span>
                <LinkWithGitHub
                    loading={this.state.githubLinkLoading}
                    githubIssues={this.state.githubIssues}
                    notify={this.notify.bind(this)}
                    isLinkOwner={this.state.isGitHubLinkOwner}
                />
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

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTodoItemsAction: getTodoItemsAction,
            getTrelloListItemsAction: getTrelloListItemsAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
