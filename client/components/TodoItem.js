import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCompleteClick = this.handleCompleteClick.bind(this);
    }

    handleCompleteClick () {
        this.props.handleComplete(this.props.item);
    }

    handleDeleteClick () {
        this.props.handleDelete(this.props.item);
    }

    render () {
        return (
            <li className="TodoItem">
                <input type="checkbox" onChange={this.handleCompleteClick} checked={this.props.item.completed} />
                {this.props.item.text}
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
    handleComplete: PropTypes.func.isRequired
    // TODO: figure out if "key" should be included in propTypes
};

export default TodoItem;
