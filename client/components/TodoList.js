import React, { Component } from "react";
import TodoItem from "./todoListComponents/TodoItem";
import AddItemInput from "./todoListComponents/AddItemInput";
import Title from "./todoListComponents/Title";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../redux/actions/getTodoItemsAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
    }

    // Loads todo items if url accessed directly
    componentWillMount () {
        if (this.props.todoList.id === "") {
            this.props.getTodoItemsAction(this.props.urlID);
        }
    }

    render () {
        return (
            <div>
                <Title todoListID={this.props.todoList.id} todoListTitle={this.props.todoList.title} />
                <AddItemInput todoListID={this.props.todoList.id} />
                <br />
                <ul className="TodoList">
                    {this.props.todoList.listItems.map((item, i) => (
                        <TodoItem todoListID={this.props.todoList.id} key={i} item={item} />
                    ))}
                </ul>
                <br />
                <p>
                    * Double click on a <b>TodoItem's text</b> or the <b>TodoList's title</b> to edit them.
                </p>
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
        todoList: state.todoLists
    };
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTodoItemsAction: getTodoItemsAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
