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
import Login from "./components/login";
import App from "./components/app";
import { BrowserRouter, Route, Switch } from "react-router-dom";
let socket = io("http://localhost:4201");
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

//let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketIoMiddleware)));

// store.subscribe(() => {
//     console.log("new client state", store.getState());
// });
//store.dispatch({ type: "server/hello", data: "Hello!123" });

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/todolist/:id&trelloListID=:listID" component={App} />
                    <Route path="/todolist/:id" component={App} />
                    <Route
                        exact
                        path="/accessToken=:accessToken&accessTokenSecret=:accessTokenSecret"
                        component={Home}
                    />
                </Switch>
            </div>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
