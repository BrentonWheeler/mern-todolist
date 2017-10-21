import { combineReducers } from "redux";
import LoginStateReducer from "./loginStateReducer";
import TodoListReducer from "./todoListReducer";

export default combineReducers({
    loginState: LoginStateReducer,
    todoList: TodoListReducer
});
