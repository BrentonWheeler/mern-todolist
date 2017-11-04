import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoItemAction from "../../redux/actions/createTodoItemAction";

class AddItemInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addItemText: ""
        };
        this.addItemInputChange = this.addItemInputChange.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.addItem = this.addItem.bind(this);
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

    // Button click handler, adds a new hardcoded item to the this.state.items array
    addItem () {
        if (this.state.addItemText === "") {
            // Put a nice UX toast here
            //window.alert("Missing todo item text");
        } else {
            this.props.createTodoItemAction(this.state.addItemText, this.props.urlID);
            this.setState({
                addItemText: ""
            });
        }
    }

    render () {
        return (
            <div>
                <input
                    onChange={this.addItemInputChange}
                    onKeyDown={this.checkIfEnterKey}
                    value={this.state.addItemText}
                    type="text"
                />
                <button type="button" onClick={this.addItem}>
                    Add Item
                </button>
            </div>
        );
    }
}

AddItemInput.propTypes = {};

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            createTodoItemAction: createTodoItemAction
        },
        dispatch
    );
};

export default connect(null, matchDispatchToProps)(AddItemInput);
