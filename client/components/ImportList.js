import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
import saveTrelloListInfoAction from "../redux/actions/saveTrelloListInfoAction";
import PropTypes from "prop-types";

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
                <ul className="main-navigation col s2 offset-s5 center-align browser-default">
                    <li className="center-align">
                        <a href="#">Trello Boards</a>
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
            );
        }

        return <div className="row">{selectListElement}</div>;
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
