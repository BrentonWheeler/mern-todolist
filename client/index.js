import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducers/rootReducer";
import Home from "./components/Home";
import Login from "./components/Login";
import App from "./components/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";

let socket = io(process.env.BASE_URL);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketIoMiddleware)));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/todolist/:id&trelloListID=:listID" component={App} />
                    <Route path="/todolist/:id" component={App} />
                </Switch>
            </div>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
