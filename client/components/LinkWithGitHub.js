import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchInput from "./SearchInput";
import createTodoListAction from "../redux/actions/createTodoAction";
import saveTrelloListInfoAction from "../redux/actions/saveTrelloListInfoAction";
//import PropTypes from "prop-types";
import cookie from "cookie";
import githubAPI from "../api/github";
import styled from "styled-components";

const searchInputStyledDiv = styled.div`
    body {
        font-family: Helvetica, sans-serif;
    }

    .react-autosuggest__container {
        position: relative;
    }

    .react-autosuggest__input {
        width: 240px;
        height: 30px;
        padding: 10px 20px;
        font-family: Helvetica, sans-serif;
        font-weight: 300;
        font-size: 16px;
        border: 1px solid #aaa;
        border-radius: 4px;
    }

    .react-autosuggest__input--focused {
        outline: none;
    }

    .react-autosuggest__input--open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .react-autosuggest__suggestions-container {
        display: none;
    }

    .react-autosuggest__suggestions-container--open {
        display: block;
        position: absolute;
        top: 51px;
        width: 280px;
        border: 1px solid #aaa;
        background-color: #fff;
        font-family: Helvetica, sans-serif;
        font-weight: 300;
        font-size: 16px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        z-index: 2;
    }

    .react-autosuggest__suggestions-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .react-autosuggest__suggestion {
        cursor: pointer;
        padding: 10px 20px;
    }

    .react-autosuggest__suggestion--highlighted {
        background-color: #ddd;
    }
`;

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
        location.href = process.env.BASE_URL + "/github/login";
    }

    linkButtonOnClick () {
        this.setSelectedIssue().then(() => {
            // Github api insert tasklist
            githubAPI
                .createNewTaskList(
                    cookie.parse(document.cookie).githubAuth,
                    this.parseToGitHubTaskList(this.props.todolist),
                    this.state.selectedIssue
                )
                .then(result => {
                    console.log(result);
                });
        });

        // Todolist api: add as todoList.githubUpdateURL (which will require a full redux flow)}
    }

    setSelectedIssue () {
        return new Promise((resolve, reject) => {
            for (let i in this.state.githubIssues) {
                if (this.state.value === this.state.githubIssues[i].title) {
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
        // Defaultly showing link to GitHub issue button
        let selectListElement = (
            <div className="col s6 offset-s3 center-align">
                <button className="waves-effect waves-light row btn col s4 offset-s4" onClick={this.authClicked}>
                    Link with a GitHub Issue
                </button>
            </div>
        );

        if (
            cookie.parse(document.cookie).hasOwnProperty("githubAuth") &&
            this.props.todoList.githubUpdateURL === null &&
            !this.state.loadingFromGitHub
        ) {
            // Showing GitHub issues
            let linkButton = <button className="waves-effect waves-light row btn col s2 disabled">Link</button>;
            for (let i in this.state.githubIssues) {
                if (this.state.value === this.state.githubIssues[i].title) {
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
        } else if (this.state.loadingFromGitHub) {
            // Showing loading spinner
            selectListElement = (
                <div className="col s2 offset-s5 center-align">
                    <div className="progress">
                        <div className="indeterminate" />
                    </div>
                </div>
            );
        }

        return <searchInputStyledDiv className="row center-align">{selectListElement}</searchInputStyledDiv>;
    }
}

// Redux Connections
const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        { createTodoListAction: createTodoListAction, saveTrelloListInfoAction: saveTrelloListInfoAction },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        trello: state.trello,
        todoList: state.todoLists
    };
};

LinkWithGitHub.propTypes = {};

export default connect(mapStateToProps, matchDispatchToProps)(LinkWithGitHub);
