import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoList from "../actions/createTodoAction";
//import todoList from "../api/todoList";

class Home extends Component {
    constructor (props) {
        super(props);
        this.loginClicked = this.loginClicked.bind(this);
        this.newTodoList = this.newTodoList.bind(this);
    }

    loginClicked () {
        //window.alert("test");
    }

    // Button onClick to create a unique todo page
    newTodoList () {
        this.props.createTodoList();
    }

    render () {
        return (
            <div>
                <button onClick={this.loginClicked}>Login/Register</button>
                <button onClick={this.newTodoList}>Create new TodoList</button>
                <h1>New Todo's unique id: {this.props.todoList.id}</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todoList: state.todoList
    };
};

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ createTodoList: createTodoList }, dispatch);
};

Home.PropTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(Home);
