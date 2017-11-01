import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import deleteTodoItemAction from "../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../redux/actions/toggleCompleteAction";

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

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        { deleteTodoItemAction: deleteTodoItemAction, toggleCompleteAction: toggleCompleteAction },
        dispatch
    );
};

export default connect(null, matchDispatchToProps)(TodoItem);
