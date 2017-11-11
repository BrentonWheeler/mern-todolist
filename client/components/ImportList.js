import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
import PropTypes from "prop-types";

class ImportList extends Component {
    constructor (props) {
        super(props);
        this.importClicked = this.importClicked.bind(this);
        this.trelloListClicked = this.trelloListClicked.bind(this);
        //this.importInputChange = this.importInputChange.bind(this);
    }

    importClicked () {
        location.href = process.env.BASE_URL + "/trello/login";
    }

    trelloListClicked (listid) {
        //console.log(listid);
        this.props.createTodoListAction().then(id => {
            this.props.history.push("todolist/" + id + "&trelloListID=" + listid);
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
        if (this.props.trelloBoards !== null) {
            selectListElement = (
                <ul className="main-navigation col s2 offset-s5 center-align browser-default">
                    <li className="center-align">
                        <a href="#">Trello Boards</a>
                        <ul>
                            {this.props.trelloBoards.map(board => {
                                return (
                                    <li>
                                        <a href="#">{board.name}</a>
                                        <ul>
                                            {board.listArray.map(list => {
                                                return (
                                                    <li>
                                                        <a
                                                            onClick={this.trelloListClicked.bind(this, list.id)}
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
    return bindActionCreators({ createTodoListAction: createTodoListAction }, dispatch);
};

const mapStateToProps = state => {
    return {
        trelloBoards: state.trelloBoards
    };
};

ImportList.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(ImportList);
