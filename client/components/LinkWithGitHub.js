import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
import saveTrelloListInfoAction from "../redux/actions/saveTrelloListInfoAction";
import PropTypes from "prop-types";
import styled from "styled-components";
import cookie from "cookie";
import githubAPI from "../api/github";

const DropDownMenuStyledDiv = styled.div`
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        background: #2bbbae;
    }

    ul li {
        display: block;
        position: relative;
        float: left;
        background: #2bbbae;
    }

    /* This hides the dropdowns */

    li ul {
        display: none;
    }

    ul li a {
        display: block;
        padding: 1em;
        text-decoration: none;
        white-space: nowrap;
        color: #fff;
    }

    ul li a:hover {
        background: #2c3e50;
    }

    /* Display the dropdown */

    li:hover > ul {
        display: block;
        position: absolute;
    }

    li:hover li {
        float: none;
    }

    li:hover a {
        background: #2bbbae;
    }

    li:hover li a:hover {
        background: #2c3e50;
    }

    .main-navigation li ul li {
        border-top: 0;
    }

    /* Displays second level dropdowns to the right of the first level dropdown */

    ul ul ul {
        left: 100%;
        top: 0;
    }

    /* Simple clearfix */

    ul:before,
    ul:after {
        content: " ";
        /* 1 */
        display: table;
        /* 2 */
    }

    ul:after {
        clear: both;
    }
`;

class LinkWithGitHub extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loadingFromGitHub: false
        };
        this.authClicked = this.authClicked.bind(this);
        this.trelloListClicked = this.trelloListClicked.bind(this);
    }

    //Check if github auth has been passed in cookie and TodoList is not already linked
    componentWillMount () {
        let cookieJSON = cookie.parse(document.cookie);
        if (cookieJSON.hasOwnProperty("githubAuth") && this.props.todoList.githubUpdateURL === null) {
            this.setState({ loadingFromGitHub: true });
            githubAPI.getIssues(cookieJSON.githubAuth).then(result => {
                console.log(result);
            });
        }
    }

    authClicked () {
        location.href = process.env.BASE_URL + "/github/login";
    }

    trelloListClicked (listID, listName, boardID, boardName) {
        this.props.createTodoListAction(true).then(id => {
            this.props.saveTrelloListInfoAction(listID, listName, boardID, boardName);
            this.props.history.push("todolist/" + id);
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

        let cookieJSON = cookie.parse(document.cookie);
        if (cookieJSON.hasOwnProperty("githubAuth") && this.props.todoList.githubUpdateURL === null) {
            // Showing GitHub issues
            selectListElement = (
                <div className="row col s1 offset-s5 center-align">
                    <ul className="main-navigation col center-align" style={{ marginLeft: "50%" }}>
                        <li className="center-align">
                            <a className="center-align" href="#">
                                Link with a GitHub issue
                            </a>
                            <ul>
                                {this.props.trello.boards.map(board => {
                                    return (
                                        <li>
                                            <a href="#">{board.name}</a>
                                            <ul>
                                                {board.listArray.map(list => {
                                                    return (
                                                        <li>
                                                            <a
                                                                onClick={this.trelloListClicked.bind(
                                                                    this,
                                                                    list.id,
                                                                    list.name,
                                                                    board.id,
                                                                    board.name
                                                                )}
                                                                href="#"
                                                            >
                                                                {list.name}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        } else if (this.props.loading) {
            // Showing loading spinner
            selectListElement = (
                <div className="col s2 offset-s5 center-align">
                    <div className="progress">
                        <div className="indeterminate" />
                    </div>
                </div>
            );
        }

        return <DropDownMenuStyledDiv className="row center-align">{selectListElement}</DropDownMenuStyledDiv>;
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
