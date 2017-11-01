import React, { Component } from "react";

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
                <input type="checkbox" onChange={this.handleCompleteClick} defaultChecked={this.props.item.completed} />
                {this.props.item.text}
                <button onClick={this.handleDeleteClick}>x</button>
            </li>
        );
    }
}

export default TodoItem;
