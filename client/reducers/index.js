import { combineReducers } from "redux";
import LoginStateReducer from "./loginState";
import TodoListReducer from "./todoList";

const allReducers = combineReducers({
    loginState: LoginStateReducer,
    todoList: TodoListReducer
});

export default allReducers;
