import React, { Component } from "react";
import TodoList from "./todoList";
//import Login from "./login";
import { connect } from "react-redux";

class App extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="App row">
                {/*<h1>Todolist Unique ID: {this.props.match.params.id}</h1>*/}
                <TodoList urlID={this.props.match.params.id} />
                {/* {<Login />} */}
                <p>
                    * Double click on a <b>TodoItem's text</b> or the <b>TodoList's title</b> to edit them.
                </p>
            </div>
        );
    }
}

// Redux Connections
const mapStateToProps = state => {
    return {
        todoList: state.todoLists
    };
};

export default connect(mapStateToProps, null)(App);
