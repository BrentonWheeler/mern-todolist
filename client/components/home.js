import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoList from "../actions/createTodoAction";
import promisify from "es6-promisify";
//import todoList from "../api/todoList";

class Home extends Component {
    constructor (props) {
        super(props);
        this.loginClicked = this.loginClicked.bind(this);
        this.newTodoList = this.newTodoList.bind(this);
        console.log(this.context);
    }

    loginClicked () {}

    // Button onClick to create a unique todo page
    newTodoList () {
        //TODO figure out how to get newly refreshed this.props.todoList.id
        let newTodoPage = id => {
            this.props.history.push("/todoList/" + id);
            console.log(id);
        };
        this.props.createTodoList().then(res => console.log("4: " + res));
    }

    render () {
        return (
            <div>
                {/*<button onClick={this.loginClicked}>Login/Register</button>*/}
                <button onClick={this.newTodoList}>Create new TodoList</button>
                {/*<h1>New Todo's unique id: {this.props.todoList.id}</h1>*/}
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

Home.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(Home);
