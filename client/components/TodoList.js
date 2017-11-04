import React, { Component } from "react";
import TodoItem from "./todoListComponents/TodoItem";
import AddItemInput from "./todoListComponents/AddItemInput";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
import deleteTodoItemAction from "../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../redux/actions/toggleCompleteAction";
import updateTodoItemTextAction from "../redux/actions/updateTodoItemTextAction";
import updateTitleAction from "../redux/actions/updateTitleAction";

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showTitleInput: false,
            inputTitleText: this.props.todoList.title
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleItemTextUpdate = this.handleItemTextUpdate.bind(this);
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
        this.enterCheck = this.enterCheck.bind(this);
        this.handleTitleOnUpdate = this.handleTitleOnUpdate.bind(this);
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

    // On double click the text label changes to a input to allow user editing of the value
    handleDoubleClick (e) {
        this.setState({
            showTitleInput: true
        });
    }

    // This just updates react state in the scope of the individual item
    handleTitleOnChange (e) {
        this.setState({
            inputTitleText: e.target.value
        });
    }

    handleTitleOnUpdate () {
        if (this.state.inputTitleText === "") {
            // Put a nice UX toast here
            //window.alert("Title cannot be empty");
        } else {
            this.props.updateTitleAction(this.props.todoList.id, this.state.inputTitleText);
            this.setState({
                showTitleInput: false
            });
        }
    }

    // On enter press
    enterCheck (e) {
        if (e.keyCode === 13) {
            this.handleTitleOnUpdate();
        }
    }

    render () {
        let titleElement;
        if (this.state.showTitleInput) {
            titleElement = (
                <input
                    type="text"
                    value={this.state.inputTitleText}
                    onBlur={this.handleTitleOnUpdate}
                    onChange={this.handleTitleOnChange}
                    onKeyDown={this.enterCheck}
                />
            );
        } else {
            titleElement = <label onDoubleClick={this.handleDoubleClick}>{this.props.todoList.title}</label>;
        }

        return (
            <div>
                <h1>{titleElement}</h1>
                <AddItemInput />

                <br />
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
            getTodoItemsAction: getTodoItemsAction,
            deleteTodoItemAction: deleteTodoItemAction,
            toggleCompleteAction: toggleCompleteAction,
            updateTodoItemTextAction: updateTodoItemTextAction,
            updateTitleAction: updateTitleAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);
