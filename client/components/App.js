import React, { Component } from "react";
import TodoList from "./todoList";
//import Login from "./login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import createTodoItemAction from "../redux/actions/createTodoItemAction";

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            addItemText: ""
        };
        this.addItem = this.addItem.bind(this);
        this.onInputChange = this.onInputChange;
        this.keyPress = this.keyPress.bind(this);
    }

    // Button click handler, adds a new hardcoded item to the this.state.items array
    addItem () {
        if (this.state.addItemText === "") {
            // Put a nice UX toast here
            //window.alert("Missing todo item text");
        } else {
            this.props.createTodoItemAction(this.state.addItemText, this.props.match.params.id);
            this.setState({
                addItemText: ""
            });
        }
    }

    // Input onChange handler
    onInputChange (e) {
        this.setState({
            addItemText: e.target.value
        });
    }

    // On enter press
    keyPress (e) {
        if (e.keyCode === 13) {
            this.addItem();
        }
    }

    render () {
        return (
            <div className="App">
                <h1>Todolist Unique ID: {this.props.match.params.id}</h1>
                My Todo List
                <br />
                <input
                    onChange={this.onInputChange.bind(this)}
                    onKeyDown={this.keyPress}
                    value={this.state.addItemText}
                    type="text"
                />
                <button type="button" onClick={this.addItem}>
                    Add Item
                </button>
                <br />
                <TodoList urlID={this.props.match.params.id} />
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
