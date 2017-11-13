// User types
export const USER_LOGIN = "user_login";

// Todo types
export const CREATE_TODO_LIST = "create_todo_list";
export const CREATE_TODO_ITEM = "create_todo_item";
export const GET_TODO_ITEMS = "get_todo_items";
export const DELETE_TODO_ITEM = "delete_todo_item";
export const TOGGLE_TODO_ITEM = "toggle_todo_item";
export const UPDATE_TODO_ITEM_TEXT = "update_todo_item_text";
export const UPDATE_TITLE = "update_title";
export const GET_TRELLO_LISTS = "get_trello_lists";
export const GET_TRELLO_LIST_ITEMS = "get_trello_list_items";
export const SAVE_TRELLO_LIST_INFO = "save_trello_list_info";

// Only these need to be sent to server and emitted to other clients
export const SERVER_CREATE_TODO_ITEM = "server/create_todo_item";
export const SERVER_DELETE_TODO_ITEM = "server/delete_todo_item";
export const SERVER_TOGGLE_TODO_ITEM = "server/toggle_todo_item";
export const SERVER_UPDATE_TODO_ITEM_TEXT = "server/update_todo_item_text";
export const SERVER_UPDATE_TITLE = "server/update_title";
