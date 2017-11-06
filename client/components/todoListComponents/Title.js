import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import updateTitleAction from "../../redux/actions/updateTitleAction";

class Title extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showTitleInput: false,
            inputTitleText: this.props.todoListTitle
        };
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
        this.handleTitleOnUpdate = this.handleTitleOnUpdate.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    // This just updates react state in the scope of the individual item
    handleTitleOnChange (e) {
        this.setState({
            inputTitleText: e.target.value
        });
    }

    handleTitleOnUpdate () {
        if (this.state.inputTitleText === "") {
            // Put a nice UX toast here
            //window.alert("Title cannot be empty");
        } else {
            this.props.updateTitleAction(this.props.todoListID, this.state.inputTitleText).then(() => {
                this.setState({
                    showTitleInput: false
                });
            });
        }
    }

    // On enter press
    checkIfEnterKey (e) {
        if (e.keyCode === 13) {
            this.handleTitleOnUpdate();
        }
    }

    // On double click the text label changes to a input to allow user editing of the value
    handleDoubleClick (e) {
        this.setState({
            showTitleInput: true
        });
    }

    render () {
        let titleElement;
        if (this.state.showTitleInput) {
            titleElement = (
                <div className="input-field inline col s6 offset-s3">
                    <input
                        className="center-align"
                        style={{ fontStyle: "Light Italic", width: "100%", height: "30px", fontsize: "30px" }}
                        type="text"
                        value={this.state.inputTitleText}
                        onBlur={this.handleTitleOnUpdate}
                        onChange={this.handleTitleOnChange}
                        onKeyDown={this.checkIfEnterKey}
                    />
                </div>
            );
        } else {
            titleElement = (
                <h1
                    className="center-align"
                    style={{ fontStyle: "Light Italic" }}
                    onDoubleClick={this.handleDoubleClick}
                >
                    {this.props.todoListTitle}
                </h1>
            );
        }

        return <div>{titleElement}</div>;
    }
}

Title.propTypes = {
    todoListID: PropTypes.string.isRequired,
    todoListTitle: PropTypes.string.isRequired
};

// Redux Connections
const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateTitleAction: updateTitleAction
        },
        dispatch
    );
};

export default connect(null, matchDispatchToProps)(Title);
