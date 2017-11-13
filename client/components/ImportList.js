import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
import saveTrelloListInfoAction from "../redux/actions/saveTrelloListInfoAction";
import PropTypes from "prop-types";
import styled from "styled-components";

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

class ImportList extends Component {
    constructor (props) {
        super(props);
        this.importClicked = this.importClicked.bind(this);
        this.trelloListClicked = this.trelloListClicked.bind(this);
    }

    importClicked () {
        location.href = process.env.BASE_URL + "/trello/login";
    }

    trelloListClicked (listID, listName, boardID, boardName) {
        //console.log(listid);
        this.props.createTodoListAction(true).then(id => {
            this.props.saveTrelloListInfoAction(listID, listName, boardID, boardName);
            this.props.history.push("todolist/" + id);
        });
    }

    render () {
        let selectListElement = (
            <div className="col s6 offset-s3 center-align">
                <div className="input-field inline">
                    <button onClick={this.importClicked} className="waves-effect waves-light btn ">
                        {" "}
                        import from Trello{" "}
                    </button>
                </div>
            </div>
        );
        if (this.props.trello !== null) {
            selectListElement = (
                <div className="row col s1 offset-s5 center-align">
                    <ul className="main-navigation col center-align" style={{ marginLeft: "50%" }}>
                        <li className="center-align">
                            <a className="center-align" href="#">
                                Trello Boards
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
        trello: state.trello
    };
};

ImportList.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(ImportList);
