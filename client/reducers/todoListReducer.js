import { CREATE_TODO_LIST, CREATE_TODO_ITEM } from "../actions/types";

const initialState = {
    id: "",
    listItems: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO_LIST:
            return Object.assign({}, state, {
                id: action.id
            });
            break;
        case CREATE_TODO_ITEM:
            return Object.assign({}, state, {
                listItems: addTodoItemToArray(state.listItems, action)
            });
            break;
        default:
            return state;
    }
}

function addTodoItemToArray (array, action) {
    let newArray = array.slice();
    newArray.push({ text: action.text, completed: false });
    return newArray;
}
