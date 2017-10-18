import { combineReducers } from "redux";
import LoginStateReducer from "./loginState";
import TodoListReducer from "./todoList";

export default combineReducers({
    loginState: LoginStateReducer,
    todoList: TodoListReducer
});
