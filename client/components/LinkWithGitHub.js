import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchInput from "./SearchInput";
import updateGitHubLinks from "../redux/actions/updateGitHubLinks";
//import PropTypes from "prop-types";
import cookie from "cookie";
import githubAPI from "../api/github";
import { toast } from "react-toastify";

class LinkWithGitHub extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loadingFromGitHub: false,
            githubIssues: null,
            value: "",
            selectedIssue: null
        };
        this.authClicked = this.authClicked.bind(this);
        this.linkButtonOnClick = this.linkButtonOnClick.bind(this);
        this.githubInputOnChange = this.githubInputOnChange.bind(this);
        this.setSelectedIssue = this.setSelectedIssue.bind(this);
        this.updateButtonOnClick = this.updateButtonOnClick.bind(this);
    }

    //Check if github auth has been passed in cookie and TodoList is not already linked
    componentWillMount () {
        if (
            cookie.parse(document.cookie).hasOwnProperty("githubAuth") &&
            this.props.todoList.githubUpdateURL === null
        ) {
            this.setState({ loadingFromGitHub: true });
            githubAPI.getIssues(cookie.parse(document.cookie).githubAuth).then(result => {
                this.setState({ githubIssues: result.data });
                this.setState({ loadingFromGitHub: false });
            });
        }
    }

    authClicked () {
        document.cookie = "tempTodoListID=" + this.props.todoList.id;
        location.href = process.env.BASE_URL + "/github/login";
    }

    linkButtonOnClick () {
        this.setState({ loadingFromGitHub: true });
        this.setSelectedIssue().then(() => {
            // GitHub api insert tasklist
            githubAPI
                .createNewTaskList(
                    cookie.parse(document.cookie).githubAuth,
                    this.parseToGitHubTaskList(this.props.todolist),
                    this.state.selectedIssue
                )
                .then(result => {
                    console.log(result);
                    this.props
                        .updateGitHubLinks(
                            this.props.todoList.id,
                            result.data.url,
                            result.data.html_url,
                            result.data.user.login
                        )
                        .then(() => {
                            this.setState({ loadingFromGitHub: false });
                            this.props.notify(
                                "Linked with Issue: " + this.state.selectedIssue.title,
                                toast.TYPE.SUCCESS
                            );
                        });
                });
        });
    }

    updateButtonOnClick () {
        //DOING
        this.setState({ loadingFromGitHub: true });
        this.setSelectedIssue().then(() => {
            // GitHub api update tasklist
            githubAPI
                .updateTaskList(
                    cookie.parse(document.cookie).githubAuth,
                    this.parseToGitHubTaskList(this.props.todolist),
                    this.props.todoList.githubUpdateURL
                )
                .then(result => {
                    this.props
                        .updateGitHubLinks(this.props.todoList.id, result.data.url, result.data.html_url)
                        .then(() => {
                            this.setState({ loadingFromGitHub: false });
                            this.props.notify("Linked TaskList updated", toast.TYPE.SUCCESS);
                        });
                });
        });
    }

    setSelectedIssue () {
        return new Promise((resolve, reject) => {
            for (let i in this.state.githubIssues) {
                let issueIdentificationString =
                    this.state.githubIssues[i].title +
                    "/" +
                    this.state.githubIssues[i].repoName +
                    "/" +
                    this.state.githubIssues[i].repoOwner;
                if (this.state.value === issueIdentificationString) {
                    this.setState(
                        {
                            selectedIssue: this.state.githubIssues[i]
                        },
                        () => {
                            resolve();
                        }
                    );
                }
            }
        });
    }

    // Parse TodoList object to a string that the GitHub API expects
    parseToGitHubTaskList (todolist) {
        let taskListString = "### " + this.props.todoList.title;
        this.props.todoList.listItems.map(item => {
            taskListString += "\n- [" + (item.completed ? "x" : " ") + "] " + item.text;
        });
        taskListString += "\n\nCreated with [Quick Todo-List](https://brentonwheeler.com)";
        //taskListString += "\\n\\nCreated with [Quick Todo-List](" + process.env.BASE_URL + ")";
        return taskListString;
    }

    githubInputOnChange (event, { newValue }) {
        this.setState({
            value: newValue
        });
    }

    render () {
        // Unauthed with GitHub: show "link to GitHub issue" button
        let selectListElement = (
            <div className="col s6 offset-s3 center-align">
                <button className="waves-effect waves-light row btn col s4 offset-s4" onClick={this.authClicked}>
                    Link with a GitHub Issue
                </button>
            </div>
        );

        if (cookie.parse(document.cookie).hasOwnProperty("githubAuth") && this.state.loadingFromGitHub) {
            // Authed with GitHub AND loading: show loading spinner
            selectListElement = (
                <div className="col s2 offset-s5 center-align">
                    <div className="progress">
                        <div className="indeterminate" />
                    </div>
                </div>
            );
        } else if (
            cookie.parse(document.cookie).hasOwnProperty("githubAuth") &&
            this.props.todoList.githubUpdateURL === null
        ) {
            // Authed with GitHub AND not yet linked to an issue: show GitHub issue search box
            let linkButton = <button className="waves-effect waves-light row btn col s2 disabled">Link</button>;
            for (let i in this.state.githubIssues) {
                let issueIdentificationString =
                    this.state.githubIssues[i].title +
                    "/" +
                    this.state.githubIssues[i].repoName +
                    "/" +
                    this.state.githubIssues[i].repoOwner;
                if (this.state.value === issueIdentificationString) {
                    linkButton = (
                        <button className="waves-effect waves-light row btn col s2" onClick={this.linkButtonOnClick}>
                            Link
                        </button>
                    );
                    break;
                }
            }

            selectListElement = (
                <div className="row">
                    <div className="col s2 offset-s4 center-align">
                        <SearchInput
                            onChange={this.githubInputOnChange.bind(this)}
                            githubIssues={this.state.githubIssues}
                            value={this.state.value}
                        />
                    </div>
                    {linkButton}
                </div>
            );
        } else if (
            cookie.parse(document.cookie).hasOwnProperty("githubAuth") &&
            this.props.todoList.githubUpdateURL !== null
        ) {
            // Authed with GitHub AND TodoList is linked with a Issue: show GitHub options
            let updateButton = (
                <button className="waves-effect waves-light row btn col s2" onClick={this.updateButtonOnClick}>
                    Update GitHub TaskList
                </button>
            );

            selectListElement = (
                <div>
                    <div className="col s12 offset-s4">
                        {updateButton}
                        <span className="col s3 center-align">
                            <a href={this.props.todoList.githubAccessURL}>Linked Issue</a>
                        </span>
                    </div>
                </div>
            );
        }

        return selectListElement;
    }
}

// Redux Connections
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ updateGitHubLinks: updateGitHubLinks }, dispatch);
};

const mapStateToProps = state => {
    return {
        todoList: state.todoLists
    };
};

LinkWithGitHub.propTypes = {};

export default connect(mapStateToProps, matchDispatchToProps)(LinkWithGitHub);
