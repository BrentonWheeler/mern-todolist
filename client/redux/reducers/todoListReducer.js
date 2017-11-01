import {
    CREATE_TODO_LIST,
    CREATE_TODO_ITEM,
    GET_TODO_ITEMS,
    DELETE_TODO_ITEM,
    TOGGLE_TODO_ITEM
} from "../actions/types";

const initialState = {
    id: "",
    listItems: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO_LIST:
            return Object.assign({}, state, {
                id: action.id,
                listItems: []
            });
            break;
        case CREATE_TODO_ITEM:
            return Object.assign({}, state, {
                listItems: addTodoItemToArray(state.listItems, action)
            });
            break;
        case GET_TODO_ITEMS:
            return Object.assign(
                {},
                {
                    id: action.todoListID
                },
                {
                    listItems: action.itemArray
                }
            );
            break;
        case DELETE_TODO_ITEM:
            return Object.assign({}, state, {
                listItems: removeTodoItemFromArray(state.listItems, action)
            });
            break;
        case TOGGLE_TODO_ITEM:
            return Object.assign({}, state, {
                listItems: toggleCompleteInArray(state.listItems, action)
            });
            break;
        default:
            return state;
    }
}

/* Helper functions */

function addTodoItemToArray (array, action) {
    let newArray = array.slice();
    newArray.push({ text: action.text, completed: false, shortID: action.shortID });
    return newArray;
}

function removeTodoItemFromArray (array, action) {
    return array.filter(function (arrayItem) {
        return arrayItem.shortID !== action.shortID;
    });
}

function toggleCompleteInArray (array, action) {
    let newArray = array.slice();
    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].shortID === action.todoItemID) {
            newArray[i].completed = !action.currentState;
            break;
        }
    }
    return newArray;
}
