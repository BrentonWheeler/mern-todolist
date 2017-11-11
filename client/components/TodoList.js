import React, { Component } from "react";
import TodoItem from "./todoListComponents/TodoItem";
import AddItemInput from "./todoListComponents/AddItemInput";
import Title from "./todoListComponents/Title";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
import getTrelloListItemsAction from "../redux/actions/getTrelloListItemsAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
    }

    // Loads todo items if url accessed directly
    componentWillMount () {
        if (this.props.todoList.id === "") {
            this.props.getTodoItemsAction(this.props.urlID);
        } else if (this.props.todoList.isImporting) {
            this.props.getTrelloListItemsAction(this.props.trello, this.props.todoList.id);
        }
    }

    render () {
        return (
            <div
                style={{
                    marginTop: "2.5%"
                }}
                className="col s6 offset-s3"
            >
                <Title todoListID={this.props.todoList.id} todoListTitle={this.props.todoList.title} />
                <AddItemInput todoListID={this.props.todoList.id} />
                <br />
                <ul className="TodoList collection col s6 offset-s3">
                    {this.props.todoList.listItems.map((item, i) => (
                        <TodoItem todoListID={this.props.todoList.id} key={i} i={i} item={item} />
                    ))}
                </ul>
                <br />
            </div>
        );
    }
}

TodoItem.propTypes = {
    urlID: PropTypes.string
};

// Redux Connections
const mapStateToProps = state => {
    return {
        todoList: state.todoLists,
        trello: state.trello
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

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
