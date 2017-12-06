import React, { Component } from "react";
import TodoItem from "./todoListComponents/TodoItem";
import AddItemInput from "./todoListComponents/AddItemInput";
import Title from "./todoListComponents/Title";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TodoList extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="col s8 offset-s2">
                <Title todoListID={this.props.todoList.id} todoListTitle={this.props.todoList.title} />
                <AddItemInput todoListID={this.props.todoList.id} />
                <br />
                <ul className="TodoList collection col s8 offset-s2">
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

export default connect(mapStateToProps, null)(TodoList);
