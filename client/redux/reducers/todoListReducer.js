import {
    CREATE_TODO_LIST,
    CREATE_TODO_ITEM,
    GET_TODO_ITEMS,
    DELETE_TODO_ITEM,
    TOGGLE_TODO_ITEM,
    UPDATE_TODO_ITEM_TEXT,
    UPDATE_TITLE,
    GET_TRELLO_LIST_ITEMS
} from "../actions/types";

const initialState = {
    // TODO: redo this initial state
    id: "",
    title: "",
    listItems: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO_LIST:
            return Object.assign({}, state, {
                id: action.id,
                title: "My Todo List",
                isImporting: action.isImporting,
                listItems: []
            });
            break;
        case CREATE_TODO_ITEM:
            console.log("aye");
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
                },
                {
                    title: action.title
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
        case UPDATE_TODO_ITEM_TEXT:
            return Object.assign({}, state, {
                listItems: updateItemTextInArray(state.listItems, action)
            });
            break;
        case UPDATE_TITLE:
            return Object.assign({}, state, {
                title: action.newTitle
            });
            break;
        case GET_TRELLO_LIST_ITEMS:
            return Object.assign({}, state, {
                title: action.title,
                listItems: action.itemArray
            });
            break;
        default:
            return state;
    }
}

/* Helper functions */

function addTodoItemToArray (array, action) {
    let newArray = array.slice();
    newArray.push({ text: action.text, completed: false, id: action.id });
    return newArray;
}

function removeTodoItemFromArray (array, action) {
    return array.filter(function (arrayItem) {
        return arrayItem.id !== action.id;
    });
}

function toggleCompleteInArray (array, action) {
    let newArray = array.slice();
    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === action.todoItemID) {
            newArray[i].completed = !action.currentState;
            break;
        }
    }
    return newArray;
}

function updateItemTextInArray (array, action) {
    let newArray = array.slice();
    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === action.todoItemID) {
            newArray[i].text = action.newText;
            break;
        }
    }
    return newArray;
}
