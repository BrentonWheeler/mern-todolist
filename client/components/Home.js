import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createTodoListAction from "../redux/actions/createTodoAction";
import getTrelloListsAction from "../redux/actions/getTrelloListsAction";
import ImportList from "./ImportList";
import cookie from "cookie";
//import "./../styles/sass/materialize.scss";

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loadingFromTrello: false
        };
        this.loginClicked = this.loginClicked.bind(this);
        this.newTodoList = this.newTodoList.bind(this);
    }

    //Check if trello auth has been passed in cookie
    componentWillMount () {
        if (localStorage.getItem("tempTodoListID") !== null) {
            this.props.history.push("todolist/" + localStorage.getItem("tempTodoListID"));
            localStorage.removeItem("tempTodoListID");
        }
        if (cookie.parse(document.cookie).hasOwnProperty("trelloAuth")) {
            this.setState({ loadingFromTrello: true });
            this.props.getTrelloListsAction(cookie.parse(document.cookie).trelloAuth);
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
                    <button className="waves-effect waves-light row btn" onClick={this.newTodoList}>
                        Create new TodoList
                    </button>
                </div>
                <ImportList history={this.props.history} loading={this.state.loadingFromTrello} />
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
