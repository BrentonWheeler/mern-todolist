import React, { Component } from "react";
//import TodoList from "./TodoList";
import Home from "./Home";
//import { bindActionCreators } from "redux";
//import { connect } from "react-redux";

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
        let tempItems = this.state.items.slice();
        tempItems.push({
            text: this.state.value,
            completed: false
        });
        this.setState({ items: tempItems });
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
                {/*<input onChange={this.onInputChange.bind(this)} value={this.state.value} type="text"></input>
      <button type="button" onClick={this.addItem.bind(this)}>Add Item</button>
      <br />
      <br />
      My Todo List
      <TodoList items = {this.state.items}/>
      <Login />*/}
                <Home />
            </div>
        );
    }
}

export default App;
