import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            items: this.props.items
        };
    }

    render () {
        return (
            <ul className="TodoList">
                {/* Dynamically loads each Todo list item "TodoItem" from the given (this.props.items)
            items array, passed from the App component's state */}
                {this.props.items.map((item, i) => <TodoItem key={i} text={item.text} />)}
            </ul>
        );
    }
}

TodoList.PropTypes = {
    items: PropTypes.array.isRequired
};

export default TodoList;
