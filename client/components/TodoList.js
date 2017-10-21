import React, { Component } from "react";
import TodoItem from "./todoItem";
//import PropTypes from "prop-types";
import { connect } from "react-redux";

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
                {/* this.props.items.map((item, i) => <TodoItem key={i} text={item.text} />) */}
                {console.log(this.props.todoList)}
                {this.props.todoList.listItems.map((item, i) => <TodoItem key={i} text={item.text} />)}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        todoList: state.todoList
    };
};

// TODO: add todoList.listItems
// TodoList.PropTypes = {
//     items: PropTypes.array.isRequired
// };

export default connect(mapStateToProps, null)(TodoList);
