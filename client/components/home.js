import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
require("../styles/sass/materialize.scss");

class Home extends Component {
    constructor (props) {
        super(props);
        this.loginClicked = this.loginClicked.bind(this);
        this.newTodoList = this.newTodoList.bind(this);
    }

    loginClicked () {
        //this.props.history.push("/login");
    }

    // Button onClick to create a unique TodoList page
    newTodoList () {
        this.props.createTodoListAction().then(id => {
            this.props.history.push("todolist/" + id);
        });
    }

    render () {
        return (
            <div className="valign-wrapper">
                {/* {<button onClick={this.loginClicked}>Login/Register</button>} */}
                <button className="waves-effect waves-light row btn  pulse" onClick={this.newTodoList}>
                    Create new TodoList
                </button>
            </div>
        );
    }
}

// Redux Connections
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ createTodoListAction: createTodoListAction }, dispatch);
};

const mapStateToProps = state => {
    return {
        urlId: state.todoLists.id
    };
};

Home.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(mapStateToProps, matchDispatchToProps)(Home);
