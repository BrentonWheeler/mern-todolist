import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
import { getTodoListID } from "../tasks/createTodoList";

class Home extends Component {
    constructor (props) {
        super(props);
        this.loginClicked = this.loginClicked.bind(this);
        this.newTodoList = this.newTodoList.bind(this);
    }

    loginClicked () {
        //window.alert("test");
    }

    // Button onClick
    newTodoList () {
        getTodoListID()
            .then(function (fromResolve) {
                console.log(fromResolve.data.id);
            })
            .catch(function (fromReject) {
                console.log(fromReject);
            });
    }

    render () {
        return (
            <div>
                <button onClick={this.loginClicked}>Login/Register</button>
                <button onClick={this.newTodoList}>Create new TodoList</button>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         users: state.users,
//         loginState: state.loginState
//     };
// };

// const matchDispatchToProps = (dispatch) => {
//     return bindActionCreators({loginAction: loginAction}, dispatch)
// }

Home.PropTypes = {};

export default Home;
