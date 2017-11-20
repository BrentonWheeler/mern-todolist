import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import createTodoItemAction from "../../redux/actions/createTodoItemAction";
import { toast } from "react-toastify";

class AddItemInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addItemText: "",
            toastID: null
        };
        this.addItemInputChange = this.addItemInputChange.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.addItem = this.addItem.bind(this);
        this.notify = this.notify.bind(this);
    }

    notify () {
        if (!toast.isActive(this.state.toastID)) {
            this.setState({
                toastID: toast.error("Item input cannot be empty")
            });
        }
    }

    // Input onChange handler
    addItemInputChange (e) {
        this.setState({
            addItemText: e.target.value
        });
    }

    // On enter press
    checkIfEnterKey (e) {
        if (e.keyCode === 13) {
            this.addItem();
        }
    }

    addItem () {
        if (this.state.addItemText === "") {
            this.notify();
        } else {
            this.props.createTodoItemAction(this.state.addItemText, this.props.todoListID);
            this.setState({
                addItemText: ""
            });
        }
    }

    render () {
        return (
            <div className="row">
                <input
                    className="col s3 offset-s3"
                    onChange={this.addItemInputChange}
                    onKeyDown={this.checkIfEnterKey}
                    value={this.state.addItemText}
                    type="text"
                    placeholder="Add a todo"
                />
                <button className="waves-effect waves-light row btn col s3" onClick={this.addItem}>
                    Add Item
                </button>
            </div>
        );
    }
}

AddItemInput.propTypes = {
    todoListID: PropTypes.string.isRequired
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            createTodoItemAction: createTodoItemAction
        },
        dispatch
    );
};

export default connect(null, matchDispatchToProps)(AddItemInput);
