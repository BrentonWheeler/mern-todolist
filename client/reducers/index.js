import { combineReducers } from "redux";
import UserReducer from "./users";
import LoginStateReducer from "./loginState";

const allReducers = combineReducers({
    users: UserReducer,
    loginState: LoginStateReducer
});

export default allReducers;
