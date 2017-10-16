import { combineReducers } from "redux";
import LoginStateReducer from "./loginState";

const allReducers = combineReducers({
    loginState: LoginStateReducer
});

export default allReducers;
