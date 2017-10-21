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
            value: ""
        };
        this.addItem = this.addItem;
        this.onInputChange = this.onInputChange;
    }

    // Button click handler, adds a new hardcoded item to the this.state.items array
    addItem () {
        console.log("1: " + this.state.value);
        this.props.createTodoItemAction(this.state.value);
        // let tempItems = this.state.items.slice();
        // tempItems.push({
        //     text: this.state.value,
        //     completed: false
        // });
        // this.setState({ items: tempItems });
    }

    // Input onChange handler
    onInputChange (e) {
        this.setState({
            value: e.target.value
        });
    }

    render () {
        return (
            <div className="App">
                <h1>Todolist Unique ID: {this.props.todoList.id}</h1>
                My Todo List
                <br />
                <input onChange={this.onInputChange.bind(this)} value={this.state.value} type="text" />
                <button type="button" onClick={this.addItem.bind(this)}>
                    Add Item
                </button>
                <br />
                <TodoList items={this.state.items} />
                {/* {<Login />} */}
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
    return bindActionCreators({ createTodoItemAction: createTodoItemAction }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
