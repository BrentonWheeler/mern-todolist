import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import deleteTodoItemAction from "../actions/deleteTodoItemAction";

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: this.props.text,
            completed: this.props.completed
        };
        //this.handleDelete = this.props.handleDelete().bind(this);
    }

    render () {
        return (
            <li className="TodoItem">
                {this.state.text} <button onClick={this.props.handleDelete.bind(this)}>x</button>
            </li>
        );
    }
}

TodoItem.PropTypes = {
    text: PropTypes.string.isRequired
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ deleteTodoItemAction: deleteTodoItemAction }, dispatch);
};

export default connect(null, matchDispatchToProps)(TodoItem);
