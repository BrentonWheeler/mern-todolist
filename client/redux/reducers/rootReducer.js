import { combineReducers } from "redux";
import LoginStateReducer from "./loginStateReducer";
import TodoListReducer from "./todoListReducer";
import TrelloReducer from "./trelloReducer";

export default combineReducers({
    loginState: LoginStateReducer,
    todoLists: TodoListReducer,
    trello: TrelloReducer,
    reducer: function reducer (state = {}, action) {
        switch (action.type) {
            case "message":
                return Object.assign({}, { message: action.data });
            default:
                return state;
        }
    }
});
