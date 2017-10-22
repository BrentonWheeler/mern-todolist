import React, { Component } from "react";
import TodoList from "./todoList";
//import Login from "./login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import createTodoItemAction from "../actions/createTodoItemAction";

class App extends Component {
    constructor (props) {
        super(props);
        // Temporarily hardcoded base state to check things are working
        this.state = {
            items: [],
            addItemText: ""
        };
        this.addItem = this.addItem;
        this.onInputChange = this.onInputChange;
    }

    // Button click handler, adds a new hardcoded item to the this.state.items array
    addItem () {
        this.props.createTodoItemAction(this.state.addItemText, this.props.match.params.id);
    }

    // Input onChange handler
    onInputChange (e) {
        this.setState({
            addItemText: e.target.value
        });
    }

    render () {
        return (
            <div className="App">
                <h1>Todolist Unique ID: {this.props.match.params.id}</h1>
                My Todo List
                <br />
                <input onChange={this.onInputChange.bind(this)} value={this.state.addItemText} type="text" />
                <button type="button" onClick={this.addItem.bind(this)}>
                    Add Item
                </button>
                <br />
                <TodoList />
                {/* {<Login />} */}
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

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ createTodoItemAction: createTodoItemAction }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
