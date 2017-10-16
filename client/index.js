import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./reducers/index";
import App from "./components/App";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
            </div>
        </Provider>
    </Router>,
    document.getElementById("root")
);
