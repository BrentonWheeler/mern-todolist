import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import createTodoItemAction from "../../redux/actions/createTodoItemAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class AddItemInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addItemText: ""
        };
        this.addItemInputChange = this.addItemInputChange.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.addItem = this.addItem.bind(this);
        this.notify = this.notify.bind(this);
    }

    notify () {
        toast.error("Item input cannot be empty");
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
            // Put a nice UX toast here
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
                <ToastContainer
                    position="top-left"
                    type="error"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
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
