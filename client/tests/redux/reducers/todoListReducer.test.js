import todoListReducer from "../../../redux/reducers/todoListReducer";
import {
    CREATE_TODO_LIST,
    CREATE_TODO_ITEM,
    GET_TODO_ITEMS,
    DELETE_TODO_ITEM,
    TOGGLE_TODO_ITEM,
    UPDATE_TODO_ITEM_TEXT,
    UPDATE_TITLE,
    GET_TRELLO_LIST_ITEMS
} from "../../../redux/actions/types";

// unexpected type
test("todoListReducer: returns default when passed unexpectedly typed action", () => {
    expect(todoListReducer(undefined, { type: "unexpected" })).toEqual({
        id: "",
        title: "",
        listItems: []
    });
});

// CREATE_TODO_LIST
test("todoListReducer: creating a new list (not importing from trello)", () => {
    expect(
        todoListReducer(
            {
                id: "",
                title: "My Todo List",
                listItems: []
            },
            { type: CREATE_TODO_LIST, id: "123", isImporting: false }
        )
    ).toEqual({
        id: "123",
        title: "My Todo List",
        listItems: [],
        isImporting: false
    });
});

// CREATE_TODO_ITEM
test("todoListReducer: creating a new item", () => {
    expect(
        todoListReducer(
            {
                id: "123",
                title: "My Todo List",
                listItems: [],
                isImporting: false
            },
            { type: CREATE_TODO_ITEM, text: "text1", id: "itemid1" }
        )
    ).toEqual({
        id: "123",
        title: "My Todo List",
        listItems: [{ text: "text1", completed: false, id: "itemid1" }],
        isImporting: false
    });
});

// GET_TODO_ITEMS
test("todoListReducer: getting todoList data from db", () => {
    expect(
        todoListReducer(
            {
                id: "",
                title: "My Todo List",
                listItems: [],
                isImporting: false
            },
            {
                type: GET_TODO_ITEMS,
                itemArray: [{ text: "text1", completed: false, id: "itemid1" }],
                title: "todoList test title",
                todoListID: "testID"
            }
        )
    ).toEqual({
        id: "testID",
        title: "todoList test title",
        listItems: [{ text: "text1", completed: false, id: "itemid1" }]
    });
});

// DELETE_TODO_ITEM
test("todoListReducer: deleting an item", () => {
    expect(
        todoListReducer(
            {
                id: "testID",
                title: "todoList test title",
                listItems: [{ text: "text1", completed: false, id: "itemid1" }],
                isImporting: false
            },
            {
                type: DELETE_TODO_ITEM,
                id: "itemid1"
            }
        )
    ).toEqual({
        id: "testID",
        title: "todoList test title",
        listItems: [],
        isImporting: false
    });
});

// TOGGLE_TODO_ITEM
test("todoListReducer: toggling a item's completion", () => {
    expect(
        todoListReducer(
            {
                id: "testID",
                title: "todoList test title",
                listItems: [{ text: "text1", completed: false, id: "itemid1" }],
                isImporting: false
            },
            {
                type: TOGGLE_TODO_ITEM,
                todoItemID: "itemid1"
            }
        )
    ).toEqual({
        id: "testID",
        title: "todoList test title",
        listItems: [{ text: "text1", completed: true, id: "itemid1" }],
        isImporting: false
    });
});

// UPDATE_TODO_ITEM_TEXT
test("todoListReducer: update todo item's text", () => {
    expect(
        todoListReducer(
            {
                id: "testID",
                title: "todoList test title",
                listItems: [{ text: "text1", completed: false, id: "itemid1" }],
                isImporting: false
            },
            {
                type: UPDATE_TODO_ITEM_TEXT,
                todoItemID: "itemid1",
                newText: "new item text"
            }
        )
    ).toEqual({
        id: "testID",
        title: "todoList test title",
        listItems: [{ text: "new item text", completed: false, id: "itemid1" }],
        isImporting: false
    });
});

// UPDATE_TITLE
test("todoListReducer: update todo list title", () => {
    expect(
        todoListReducer(
            {
                id: "testID",
                title: "todoList test title",
                listItems: [{ text: "text1", completed: false, id: "itemid1" }],
                isImporting: false
            },
            {
                type: UPDATE_TITLE,
                newTitle: "new todo list title"
            }
        )
    ).toEqual({
        id: "testID",
        title: "new todo list title",
        listItems: [{ text: "text1", completed: false, id: "itemid1" }],
        isImporting: false
    });
});

// GET_TRELLO_LIST_ITEMS
test("todoListReducer: add imported trello title and items", () => {
    expect(
        todoListReducer(
            {
                id: "testID",
                title: "",
                listItems: [],
                isImporting: true
            },
            {
                type: GET_TRELLO_LIST_ITEMS,
                title: "title imported from trello",
                itemArray: [{ text: "imported item", completed: false, id: "imported-id" }]
            }
        )
    ).toEqual({
        id: "testID",
        title: "title imported from trello",
        listItems: [{ text: "imported item", completed: false, id: "imported-id" }],
        isImporting: true
    });
});
