import React, { Component } from "react";
import TodoItem from "./todoItem";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
import deleteTodoItemAction from "../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../redux/actions/toggleCompleteAction";
import updateTodoItemTextAction from "../redux/actions/updateTodoItemTextAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleItemTextUpdate = this.handleItemTextUpdate.bind(this);
    }

    // Loads todo items if url accessed directly
    componentWillMount () {
        if (this.props.todoList.id === "") {
            this.props.getTodoItemsAction(this.props.urlID);
        }
    }

    handleDelete (item) {
        this.props.deleteTodoItemAction(this.props.todoList.id, item.shortID);
    }

    handleComplete (item) {
        this.props.toggleCompleteAction(this.props.todoList.id, item.shortID, item.completed);
    }

    handleItemTextUpdate (item, newText) {
        this.props.updateTodoItemTextAction(this.props.todoList.id, item.shortID, newText);
    }

    render () {
        return (
            <ul className="TodoList">
                {this.props.todoList.listItems.map((item, i) => (
                    <TodoItem
                        handleDelete={this.handleDelete}
                        handleComplete={this.handleComplete}
                        handleItemTextUpdate={this.handleItemTextUpdate}
                        key={i}
                        item={item}
                    />
                ))}
            </ul>
        );
    }
}

TodoItem.propTypes = {
    urlID: PropTypes.string
};

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
            deleteTodoItemAction: deleteTodoItemAction,
            toggleCompleteAction: toggleCompleteAction,
            updateTodoItemTextAction: updateTodoItemTextAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
