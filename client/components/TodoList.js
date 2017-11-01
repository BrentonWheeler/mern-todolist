import React, { Component } from "react";
import TodoItem from "./todoItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
import deleteTodoItemAction from "../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../redux/actions/toggleCompleteAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
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
        console.log("1: item = VVV");
        console.log(item);
        this.props.toggleCompleteAction(this.props.todoList.id, item.shortID, item.completed);
    }

    render () {
        return (
            <ul className="TodoList">
                {this.props.todoList.listItems.map((item, i) => (
                    <TodoItem
                        handleDelete={this.handleDelete}
                        handleComplete={this.handleComplete}
                        key={i}
                        item={item}
                    />
                ))}
            </ul>
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
            deleteTodoItemAction: deleteTodoItemAction,
            toggleCompleteAction: toggleCompleteAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
