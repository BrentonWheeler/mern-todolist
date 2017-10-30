import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import deleteTodoItemAction from "../redux/actions/deleteTodoItemAction";
import toggleCompleteAction from "../redux/actions/toggleCompleteAction";

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: this.props.text,
            completed: this.props.completed
        };
    }

    render () {
        return (
            <li className="TodoItem">
                <input
                    type="checkbox"
                    onChange={this.props.handleComplete.bind(this)}
                    defaultChecked={this.state.completed}
                />
                {this.state.text}
                <button onClick={this.props.handleDelete.bind(this)}>x</button>
            </li>
        );
    }
}

TodoItem.PropTypes = {
    text: PropTypes.string.isRequired
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        { deleteTodoItemAction: deleteTodoItemAction, toggleCompleteAction: toggleCompleteAction },
        dispatch
    );
};

export default connect(null, matchDispatchToProps)(TodoItem);
