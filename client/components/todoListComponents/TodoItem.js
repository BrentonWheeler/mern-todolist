import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import deleteTodoItemAction from "../../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../../redux/actions/toggleCompleteAction";
import updateTodoItemTextAction from "../../redux/actions/updateTodoItemTextAction";
import { toast } from "react-toastify";

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showInput: false,
            inputItemText: this.props.item.text,
            toastID: null
        };
        this.handleItemTextClick = this.handleItemTextClick.bind(this);
        this.handleItemTextOnChange = this.handleItemTextOnChange.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleItemToggleComplete = this.handleItemToggleComplete.bind(this);
        this.handleItemTextUpdate = this.handleItemTextUpdate.bind(this);
        this.notify = this.notify.bind(this);
    }

    notify () {
        if (!toast.isActive(this.state.toastID)) {
            this.setState({
                toastID: toast.error("Item text input cannot be empty")
            });
        }
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
    async handleItemTextClick (e) {
        this.setState(
            {
                showInput: true
            },
            () => {
                // The following callback sets the input as focus and puts the users cursor at the end of the string
                document.getElementById("editItemInput").focus();
                this.setState(
                    {
                        inputItemText: ""
                    },
                    () => {
                        this.setState({
                            inputItemText: this.props.item.text
                        });
                    }
                );
            }
        );
    }

    // Updates local component state to allow editing of item text
    handleItemTextOnChange (e) {
        this.setState({
            inputItemText: e.target.value
        });
    }

    // This creates a redux action that is sent to server
    handleItemTextUpdate () {
        if (this.state.inputItemText === "") {
            this.notify();
        } else {
            this.props
                .updateTodoItemTextAction(this.props.todoListID, this.props.item.id, this.state.inputItemText)
                .then(() => {
                    this.setState({
                        showInput: false
                    });
                });
        }
    }

    // On enter press
    checkIfEnterKey (e) {
        if (e.keyCode === 13) {
            this.handleItemTextUpdate();
        }
    }

    render () {
        // Asigning the item text to either a label or input to allow editing
        let itemTextElement;
        if (this.state.showInput) {
            itemTextElement = (
                <div className="input-field inline">
                    <input
                        id="editItemInput"
                        type="text"
                        value={this.state.inputItemText}
                        onBlur={this.handleItemTextUpdate}
                        onChange={this.handleItemTextOnChange}
                        onKeyDown={this.checkIfEnterKey}
                    />
                </div>
            );
        } else {
            itemTextElement = (
                // Passing the item text from redux store instead of from redux store then down from todoList, as that wasnt rerendering correctly
                <span onClick={this.handleItemTextClick}>{this.props.todoList.listItems[this.props.i].text}</span>
            );
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
const mapStateToProps = state => {
    return {
        todoList: state.todoLists
    };
};

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

export default connect(mapStateToProps, matchDispatchToProps)(TodoItem);
