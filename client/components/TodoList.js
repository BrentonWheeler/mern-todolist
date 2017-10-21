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
        todoList: state.todoLists
    };
};

export default connect(mapStateToProps, null)(TodoList);
