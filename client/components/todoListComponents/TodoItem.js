import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import deleteTodoItemAction from "../../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../../redux/actions/toggleCompleteAction";
import updateTodoItemTextAction from "../../redux/actions/updateTodoItemTextAction";

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showInput: false,
            inputText: this.props.item.text
        };
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTextOnChange = this.handleTextOnChange.bind(this);
        this.enterCheck = this.enterCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleItemTextUpdate = this.handleItemTextUpdate.bind(this);
    }

    handleComplete () {
        this.props.toggleCompleteAction(this.props.todoListID, this.props.item.shortID, this.props.item.completed);
    }

    handleDelete () {
        this.props.deleteTodoItemAction(this.props.todoListID, this.props.item.shortID);
    }

    // On double click the text label changes to a input to allow user editing of the value
    handleDoubleClick (e) {
        this.setState({
            showInput: true
        });
    }

    handleTextOnChange (e) {
        this.setState({
            inputText: e.target.value
        });
    }

    // This updates the redux store
    handleItemTextUpdate () {
        this.props.updateTodoItemTextAction(this.props.todoListID, this.props.item.shortID, this.state.inputText);
        this.setState({
            showInput: false
        });
    }

    // On enter press
    enterCheck (e) {
        if (e.keyCode === 13) {
            this.handleItemTextUpdate();
        }
    }

    render () {
        let itemTextElement;
        if (this.state.showInput) {
            itemTextElement = (
                <input
                    type="text"
                    value={this.state.inputText}
                    onBlur={this.handleItemTextUpdate}
                    onChange={this.handleTextOnChange}
                    onKeyDown={this.enterCheck}
                />
            );
        } else {
            itemTextElement = <label onDoubleClick={this.handleDoubleClick}>{this.props.item.text}</label>;
        }

        return (
            <li className="TodoItem">
                <input type="checkbox" onChange={this.handleComplete} checked={this.props.item.completed} />
                {itemTextElement}
                <button onClick={this.handleDelete}>x</button>
            </li>
        );
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        shortID: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    todoListID: PropTypes.string.isRequired
    // TODO: figure out if "key" should be included in propTypes
};

// Redux Connections
const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            deleteTodoItemAction: deleteTodoItemAction,
            toggleCompleteAction: toggleCompleteAction,
            updateTodoItemTextAction: updateTodoItemTextAction
        },
        dispatch
    );
};

export default connect(null, matchDispatchToProps)(TodoItem);
