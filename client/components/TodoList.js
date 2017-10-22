import React, { Component } from "react";
import TodoItem from "./todoItem";
//import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../actions/getTodoItemsAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.handleDelete = this.handleDelete;
    }

    componentWillMount () {
        if (this.props.todoList.id === "") {
            this.props.getTodoItemsAction(this.props.urlID);
        }
    }

    handleDelete (test) {
        this.props.deleteTodoItemAction(this.props.listID, this.props.shortID);
    }

    render () {
        return (
            <ul className="TodoList">
                {this.props.todoList.listItems.map((item, i) => (
                    <TodoItem
                        listID={this.props.todoList.id}
                        handleDelete={this.handleDelete}
                        key={i}
                        pos={i}
                        text={item.text}
                        shortID={item.shortID}
                        completed={item.completed}
                    />
                ))}
            </ul>
        );
    }
}

// TODO: add todoList.listItems
// TodoList.PropTypes = {
//     items: PropTypes.array.isRequired
// };

// Redux Connections
const mapStateToProps = state => {
    return {
        todoList: state.todoLists
    };
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ getTodoItemsAction: getTodoItemsAction }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
