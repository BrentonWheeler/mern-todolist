import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showInput: false,
            inputText: this.props.item.text
        };
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCompleteClick = this.handleCompleteClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTextOnChange = this.handleTextOnChange.bind(this);
        this.handleTextOnUpdate = this.handleTextOnUpdate.bind(this);
        this.enterCheck = this.enterCheck.bind(this);
    }

    handleCompleteClick () {
        this.props.handleComplete(this.props.item);
    }

    handleDeleteClick () {
        this.props.handleDelete(this.props.item);
    }

    // On double click the text label changes to a input to allow user editing of the value
    handleDoubleClick (e) {
        this.setState({
            showInput: true
        });
    }

    // This just updates react state in the scope of the individual item
    handleTextOnChange (e) {
        this.setState({
            inputText: e.target.value
        });
    }

    // This updates the redux store for the text of this item
    handleTextOnUpdate () {
        this.props.handleItemTextUpdate(this.props.item, this.state.inputText);
        this.setState({
            showInput: false
        });
    }

    // On enter press
    enterCheck (e) {
        if (e.keyCode === 13) {
            this.handleTextOnUpdate();
        }
    }

    render () {
        let itemTextElement;
        if (this.state.showInput) {
            itemTextElement = (
                <input
                    type="text"
                    value={this.state.inputText}
                    onBlur={this.handleTextOnUpdate}
                    onChange={this.handleTextOnChange}
                    onKeyDown={this.enterCheck}
                />
            );
        } else {
            itemTextElement = <label onDoubleClick={this.handleDoubleClick}>{this.props.item.text}</label>;
        }

        return (
            <li className="TodoItem">
                <input type="checkbox" onChange={this.handleCompleteClick} checked={this.props.item.completed} />
                {itemTextElement}
                <button onClick={this.handleDeleteClick}>x</button>
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
    handleDelete: PropTypes.func.isRequired,
    handleComplete: PropTypes.func.isRequired,
    handleItemTextUpdate: PropTypes.func.isRequired
    // TODO: figure out if "key" should be included in propTypes
};

export default TodoItem;
