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
                <span className="col s6 offset-s3 center-align">
                    GitHub: <a href="https://github.com/BrentonWheeler/mern-todolist">
                        BrentonWheeler/mern-todolist
                    </a>{" "}
                </span>
                {/*<h1>Todolist Unique ID: {this.props.match.params.id}</h1>*/}
                <TodoList urlID={this.props.match.params.id} />
                {/* {<Login />} */}
                <span className="col s6 offset-s3 center-align" style={{ bottom: "0px" }}>
                    * Double click on a <b>TodoItem's text</b> or the <b>TodoList's title</b> to edit them.
                </span>
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
