import React, { Component } from "react";
import TodoItem from "./todoItem";
//import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../actions/getTodoItemsAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        if (this.props.todoList.id === "") {
            this.props.getTodoItemsAction(this.props.urlID);
        }
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

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ getTodoItemsAction: getTodoItemsAction }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
