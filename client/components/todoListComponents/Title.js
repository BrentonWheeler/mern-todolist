import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import updateTitleAction from "../../redux/actions/updateTitleAction";
import { toast } from "react-toastify";

class Title extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showTitleInput: false,
            inputTitleText: this.props.todoListTitle,
            toastID: null
        };
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
        this.handleTitleOnUpdate = this.handleTitleOnUpdate.bind(this);
        this.checkIfEnterKey = this.checkIfEnterKey.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.notify = this.notify.bind(this);
    }

    notify () {
        if (!toast.isActive(this.state.toastID)) {
            this.setState({
                toastID: toast.error("Title input cannot be empty")
            });
        }
    }

    // This just updates react state in the scope of the individual item
    handleTitleOnChange (e) {
        this.setState({
            inputTitleText: e.target.value
        });
    }

    handleTitleOnUpdate () {
        if (this.state.inputTitleText === "") {
            this.notify();
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
    handleTitleClick (e) {
        this.setState(
            {
                showTitleInput: true
            },
            () => {
                // The following callback sets the input as focus and puts the users cursor at the end of the string
                document.getElementById("titleInput").focus();
                this.setState(
                    {
                        inputTitleText: ""
                    },
                    () => {
                        this.setState({
                            inputTitleText: this.props.todoListTitle
                        });
                    }
                );
            }
        );
    }

    render () {
        // Asigning the title text to either a h1 or input to allow editing
        let titleElement;
        if (this.state.showTitleInput) {
            titleElement = (
                <div className="input-field inline col s6 offset-s3">
                    <input
                        id="titleInput"
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
                <h1 className="center-align" style={{ fontStyle: "Light Italic" }} onClick={this.handleTitleClick}>
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
