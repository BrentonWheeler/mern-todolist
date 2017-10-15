import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers/index";
import App from "./components/App";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
