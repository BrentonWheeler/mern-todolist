import React, { Component } from "react";
//import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loginAction } from "../actions/loginAction";
import { register, login } from "../tasks/user";

const LoggedInOutput = props => {
    if (props.loggedIn) {
        return <h1>User is logged in</h1>;
    } else {
        return <h1>User is not logged in</h1>;
    }
};

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
    }

    usernameChange (e) {
        this.setState({ username: e.target.value });
    }
    passwordChange (e) {
        this.setState({ password: e.target.value });
    }
    loginClicked () {
        login(this.state.username, this.state.password);
        // Bad credential check
        // if(this.state.username===this.props.users.username && this.state.password===this.props.users.password){
        //   this.props.loginAction(this.props.users.username)
        // }
    }
    registerClicked () {
        register(this.state.username, this.state.password);
        // Bad credential check
        // if(this.state.username===this.props.users.username && this.state.password===this.props.users.password){
        //   this.props.loginAction(this.props.users.username)
        // }
    }

    render () {
        return (
            <div>
                <label>
                    Username:
                    <input type="text" onChange={this.usernameChange} value={this.state.username} />
                </label>
                <label>
                    Password:
                    <input type="password" onChange={this.passwordChange} value={this.state.password} />
                </label>
                <button onClick={this.loginClicked}>Login</button>
                <button onClick={this.registerClicked}>Register</button>
                <hr />
                <LoggedInOutput loggedIn={this.props.loginState.loggedIn} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        loginState: state.loginState
    };
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ loginAction: loginAction }, dispatch);
};

Login.PropTypes = {};

export default connect(mapStateToProps, matchDispatchToProps)(Login);
