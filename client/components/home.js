import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
import getTrelloListsAction from "../redux/actions/getTrelloListsAction";
import ImportList from "./ImportList";
require("../styles/sass/materialize.scss");

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showTrelloLists: false
        };
        this.loginClicked = this.loginClicked.bind(this);
        this.newTodoList = this.newTodoList.bind(this);
    }

    // Check if trello auth has been passed in url
    componentWillMount () {
        if (this.props.match.params.accessToken !== undefined) {
            //this.setState({ showTrelloLists: true });
            this.props.getTrelloListsAction(
                this.props.match.params.accessToken,
                this.props.match.params.accessTokenSecret
            );
        }
    }

    loginClicked () {
        //this.props.history.push("/login");
    }

    // Button onClick to create a unique TodoList page
    newTodoList () {
        this.props.createTodoListAction(false).then(id => {
            this.props.history.push("todolist/" + id);
        });
    }

    render () {
        return (
            <div>
                <div
                    className="valign-wrapper"
                    style={{
                        marginTop: "5%"
                    }}
                >
                    {/* {<button onClick={this.loginClicked}>Login/Register</button>} */}
                    <button className="waves-effect waves-light row btn pulse" onClick={this.newTodoList}>
                        Create new TodoList
                    </button>
                </div>
                <ImportList history={this.props.history} />
            </div>
        );
    }
}

// Redux Connections
const matchDispatchToProps = dispatch => {
    return bindActionCreators(
        { createTodoListAction: createTodoListAction, getTrelloListsAction: getTrelloListsAction },
        dispatch
    );
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
