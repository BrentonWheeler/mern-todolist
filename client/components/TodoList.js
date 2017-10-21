import React, { Component } from "react";
import TodoItem from "./todoItem";
//import PropTypes from "prop-types";
import { connect } from "react-redux";

class TodoList extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <ul className="TodoList">
                {/* Dynamically loads each Todo list item "TodoItem" from the given (this.props.items)
            items array, passed from the App component's state */}
                {/* this.props.items.map((item, i) => <TodoItem key={i} text={item.text} />) */}
                {console.log(this.props.todoList.listItems)}
                {this.props.todoList.listItems.map((item, i) => <TodoItem key={i} text={item.text} />)}
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
        todoList: state.todoList
    };
};

export default connect(mapStateToProps, null)(TodoList);
