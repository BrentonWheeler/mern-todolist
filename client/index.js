import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import Home from "./components/home";
import Login from "./components/login";
import App from "./components/app";
import { BrowserRouter, Route } from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/todoList/:id" component={App} />
                <Route exact path="/login" component={Login} />
            </div>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
