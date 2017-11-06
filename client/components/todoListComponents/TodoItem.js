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
        this.handleItemTextDoubleClick = this.handleItemTextDoubleClick.bind(this);
        this.handleItemTextOnChange = this.handleItemTextOnChange.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleItemToggleComplete = this.handleItemToggleComplete.bind(this);
        this.handleItemTextUpdate = this.handleItemTextUpdate.bind(this);
    }

    handleItemToggleComplete (e) {
        this.props
            .toggleCompleteAction(this.props.todoListID, this.props.item.id, this.props.item.completed)
            .then(() => {
                // TODO: figure out if this next line is bad practice
                this.forceUpdate();
            });
    }

    handleItemDelete () {
        this.props.deleteTodoItemAction(this.props.todoListID, this.props.item.id);
    }

    // On double click the text label changes to a input to allow user editing of the value
    handleItemTextDoubleClick (e) {
        this.setState({
            showInput: true
        });
    }

    handleItemTextOnChange (e) {
        this.setState({
            inputText: e.target.value
        });
    }

    // This updates the redux store
    handleItemTextUpdate () {
        this.props
            .updateTodoItemTextAction(this.props.todoListID, this.props.item.id, this.state.inputText)
            .then(() => {
                this.setState({
                    showInput: false
                });
            });
    }

    // On enter press
    checkIfEnterKey (e) {
        if (e.keyCode === 13) {
            this.handleItemTextUpdate();
        }
    }

    render () {
        let itemTextElement;
        if (this.state.showInput) {
            itemTextElement = (
                <div className="input-field inline">
                    <input
                        type="text"
                        value={this.state.inputText}
                        onBlur={this.handleItemTextUpdate}
                        onChange={this.handleItemTextOnChange}
                        onKeyDown={this.checkIfEnterKey}
                    />
                </div>
            );
        } else {
            itemTextElement = <span onDoubleClick={this.handleItemTextDoubleClick}>{this.props.item.text}</span>;
        }

        return (
            <li className="TodoItem collection-item valign-wrapper">
                <input
                    id={this.props.i}
                    type="checkbox"
                    onChange={this.handleItemToggleComplete}
                    checked={this.props.item.completed}
                />
                <label htmlFor={this.props.i} />
                {itemTextElement}
                <button
                    className="btn-floating btn-small waves-effect waves-light red"
                    style={{ marginLeft: "15px" }}
                    onClick={this.handleItemDelete}
                >
                    x
                </button>
            </li>
        );
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
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
